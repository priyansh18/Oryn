import { response } from "express";
import Stripe from "stripe";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

export const stripeWebhooks = async (req, res) => {
  // Initialize Stripe with secret key
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  // Get Stripe signature from headers for webhook verification
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    // Verify webhook signature to ensure the request came from Stripe
    // This prevents malicious actors from sending fake webhook events
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    console.error("Webhook signature verification failed:", error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    // Process different types of Stripe webhook events
    switch (event.type) {
      case "payment_intent.succeeded": {
        // Payment was successfully completed
        const paymentIntent = event.data.object;

        // Find the checkout session associated with this payment
        const sessionList = await stripe.checkout.sessions.list({
          payment_intent: paymentIntent.id,
        });

        const session = sessionList.data[0];
        const { transactionId, appId } = session.metadata;

        // Verify this webhook is for our app (security check)
        if (appId === "oryn") {
          // Find the unpaid transaction in our database
          const transaction = await Transaction.findOne({ _id: transactionId, isPaid: false });

          if (transaction) {
            // Add credits to user's account
            await User.updateOne(
              { _id: transaction.userId },
              { $inc: { credits: transaction.credits } },
            );

            // Mark transaction as paid to prevent duplicate processing
            transaction.isPaid = true;
            await transaction.save();

            console.log(`Credits added: ${transaction.credits} for user ${transaction.userId}`);
          } else {
            console.warn(`Transaction ${transactionId} not found or already processed`);
          }
        } else {
          // Ignore webhooks not meant for our app
          console.log("Ignored webhook: Invalid app ID");
          return res.json({ received: true, message: "Ignored event: Invalid app" });
        }
        break;
      }

      default:
        // Log unhandled event types for debugging
        console.log("Unhandled webhook event type:", event.type);
        break;
    }

    // Acknowledge receipt of webhook to Stripe
    res.json({ received: true });
  } catch (error) {
    // Log error and return 500 to trigger Stripe retry
    console.error("Webhook processing error:", error);
    res.status(500).send("Internal Server Error");
  }
};

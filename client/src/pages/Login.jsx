import { useState } from "react";

const Login = () => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 dark:text-gray-300 rounded-lg shadow-xl border border-gray-200 dark:border-purple-700 bg-white dark:bg-gray-800"
    >
      <p className="text-2xl font-medium m-auto text-gray-800 dark:text-white">
        <span className="text-purple-700 dark:text-purple-400">User</span>{" "}
        {state === "login" ? "Login" : "Sign Up"}
      </p>
      {state === "register" && (
        <div className="w-full">
          <p>Name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="type here"
            className="border border-gray-200 dark:border-purple-600 rounded w-full p-2 mt-1 outline-purple-700 dark:outline-purple-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            type="text"
            required
          />
        </div>
      )}
      <div className="w-full ">
        <p>Email</p>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="type here"
          className="border border-gray-200 dark:border-purple-600 rounded w-full p-2 mt-1 outline-purple-700 dark:outline-purple-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          type="email"
          required
        />
      </div>
      <div className="w-full ">
        <p>Password</p>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="type here"
          className="border border-gray-200 dark:border-purple-600 rounded w-full p-2 mt-1 outline-purple-700 dark:outline-purple-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          type="password"
          required
        />
      </div>
      {state === "register" ? (
        <p>
          Already have account?{" "}
          <span
            onClick={() => setState("login")}
            className="text-purple-700 dark:text-purple-400 cursor-pointer hover:underline"
          >
            click here
          </span>
        </p>
      ) : (
        <p>
          Create an account?{" "}
          <span
            onClick={() => setState("register")}
            className="text-purple-700 dark:text-purple-400 cursor-pointer hover:underline"
          >
            click here
          </span>
        </p>
      )}
      <button
        type="submit"
        className="bg-purple-700 dark:bg-purple-600 hover:bg-purple-800 dark:hover:bg-purple-700 transition-all text-white w-full py-2 rounded-md cursor-pointer"
      >
        {state === "register" ? "Create Account" : "Login"}
      </button>
    </form>
  );
};

export default Login;

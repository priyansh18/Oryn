import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import Message from "./Message";
import toast from "react-hot-toast";

const ChatBox = () => {
  const containerRef = useRef(null);
  const { selectedChat, theme,user,axios,token,setUser } = useAppContext();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("text");
  const [isPublished, setIsPublished] = useState(false);

  const onSubmit = async (e) => {
    try{
      e.preventDefault();
      if(!user) return toast.error("Please login to use this feature");
      setLoading(true);
      const promptCopy  = prompt;
      setPrompt("");
        setMessages(prev=>[...prev,{role:'user',content:prompt,timestamp:Date.now(),isImage:false}]);

      const {data} = await axios.post(`/api/message/${mode}`,{chatId:selectedChat._id,prompt,isPublished},{headers:{Authorization:token}});
      if(data.success){
        setMessages(prev=>[...prev,data.reply]);
        if(mode=="image"){
          setUser(prev=>({...prev,credits:prev.credits-2}));
        }else{
          setUser(prev=>({...prev,credits:prev.credits-1}));
        }
      }else{
        toast.error(data.message);
        setPrompt(promptCopy);
      }

    }catch(error){
      toast.error(error.message);
    }finally{
      setPrompt('');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages);
    }
  }, [selectedChat]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behaviour: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40">
      {/* Chat Messages */}
      <div ref={containerRef} className="flex-1 mb-5 overflow-y-scroll">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center gap-6 text-primary animate-fade-in">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-white font-bold text-2xl">O</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Oryn
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">AI Assistant</p>
              </div>
            </div>
            <p className="text-4xl sm:text-6xl text-center text-gray-400 dark:text-white font-light">
              Ask me anything.
            </p>
            <div className="flex gap-2 mt-4">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}

        {/* Three Dots Loading */}
        {loading && (
          <div className="flex items-center gap-2 p-4 bg-white/50 dark:bg-[#57317C]/20 border border-gray-200 dark:border-[#80609F]/30 rounded-xl max-w-2xl">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce"></div>
              <div
                className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 rounded-full bg-pink-500 animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
              Oryn is thinking...
            </span>
          </div>
        )}
      </div>

      {mode === "image" && (
        <label className="inline-flex items-center gap-2 mb-3 text-sm mx-auto">
          <p className="text-xs">Publish Generated Images to Community</p>
          <input
            type="checkbox"
            className="cursor-pointer"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </label>
      )}

      {/* Prompt Input Box */}
      <form
        onSubmit={onSubmit}
        className="group bg-white/80 dark:bg-[#583C79]/30 border border-gray-200 dark:border-[#80609F]/30 rounded-2xl w-full max-w-2xl p-4 mx-auto flex gap-4 items-center shadow-lg hover:shadow-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-purple-500/50"
        action=""
      >
        <select
          onChange={(e) => setMode(e.target.value)}
          value={mode}
          className="text-sm px-3 py-2 outline-none bg-transparent border border-gray-200 dark:border-[#80609F]/30 rounded-lg cursor-pointer hover:border-purple-500 transition-colors duration-300"
        >
          <option className="dark:bg-purple-900" value="text">
            💬 Text
          </option>
          <option className="dark:bg-purple-900" value="image">
            🖼️ Image
          </option>
        </select>
        <input
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          type="text"
          placeholder="Ask Oryn anything..."
          className="flex-1 w-full text-sm outline-none bg-transparent placeholder:text-gray-400 dark:placeholder:text-gray-500"
          required
        />
        <button
          disabled={loading}
          className="group/btn p-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <img
            src={loading ? assets.stop_icon : assets.send_icon}
            className="w-6 h-6 cursor-pointer group-hover/btn:scale-110 transition-transform duration-300"
            alt={loading ? "Stop" : "Send"}
          />
        </button>
      </form>
    </div>
  );
};

export default ChatBox;

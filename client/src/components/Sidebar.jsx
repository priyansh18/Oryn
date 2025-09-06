import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import moment from "moment";
import toast from "react-hot-toast";

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {
  const { chats, setSelectedChat, theme, setTheme, user, navigate, createNewChat ,axios,setChats,fetchUserChats,setToken,token} = useAppContext();
  const [search, setSearch] = useState("");

  const logout = async () => {
    localStorage.removeItem("token");
    setToken(null);
    toast.success("Logged out successfully");
  }

  const deleteChat = async (e,chatId) => {
    try{
      e.stopPropagation();
      const confirm = window.confirm("Are you sure you want to delete this chat?");
      if(!confirm) return;
      const {data} = await axios.post("/api/chat/delete",{chatId},{headers:{Authorization:token}});
      if(data.success){
        setChats(prev=>prev.filter(chat=>chat._id !== chatId));
        await fetchUserChats();
        toast.success(data.message);
      }
    }catch(error){
      toast.error(error.message);
    }
  }

  return (
    <div
      className={`flex flex-col h-screen min-w-72 p-5 dark:bg-gradient-to-b from-[#242124]/30 to-[#000000]/30 border-r border-[#80609F]/30 backdrop-blur-3xl transition-all duration-500 max-md:absolute left-0 z-1 ${!isMenuOpen && "max-md:-translate-x-full"}`}
    >
      {/* logo */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-xl">O</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Oryn
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">AI Assistant</p>
        </div>
      </div>

      {/* New Chat Button */}
      <button onClick = {createNewChat} className="group flex justify-center items-center w-full py-3 mt-8 text-white bg-gradient-to-r from-[#A456F7] to-[#3D81F6] text-sm rounded-xl cursor-pointer hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300">
        <span className="mr-2 text-xl group-hover:rotate-90 transition-transform duration-300">
          +
        </span>
        <span className="font-medium">New Chat</span>
      </button>

      {/* Search Conversations */}
      <div className="group flex items-center gap-3 p-4 mt-6 border border-gray-300 dark:border-white/20 rounded-xl bg-white/50 dark:bg-white/5 hover:bg-white/70 dark:hover:bg-white/10 transition-all duration-300 focus-within:ring-2 focus-within:ring-purple-500/50">
        <img
          src={assets.search_icon}
          className="w-4 not-dark:invert group-hover:scale-110 transition-transform duration-300"
          alt=""
        />
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder="Search conversations..."
          className="flex-1 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none bg-transparent"
        />
      </div>

      {/* Recent Chats */}
      {chats.length > 0 && (
        <p className="mt-6 text-sm font-medium text-gray-600 dark:text-gray-300">Recent Chats</p>
      )}
      <div className="space-y-2">
        {chats
          .filter((chat) =>
            chat.messages[0]
              ? chat.messages[0]?.content.toLowerCase().includes(search.toLowerCase())
              : chat.name.toLowerCase().includes(search.toLowerCase()),
          )
          .map((chat) => (
            <div
              onClick={() => {
                navigate("/");
                setSelectedChat(chat);
                setIsMenuOpen(false);
              }}
              key={chat._id}
              className="group p-3 px-4 mt-2 bg-white/30 dark:bg-[#57317C]/10 border border-gray-200 dark:border-[#80609F]/15 rounded-xl cursor-pointer flex justify-between items-center hover:bg-white/50 dark:hover:bg-[#57317C]/20 hover:shadow-md hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-gray-800 dark:text-white">
                  {chat.messages.length > 0 ? chat.messages[0].content.slice(0, 32) : chat.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-[#B1A6C0] mt-1">
                  {moment(chat.updatedAt).fromNow()}
                </p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <img
                  onClick={(e) => toast.promise(deleteChat(e, chat._id), {
                    success: "Chat deleted successfully!",
                    error: "Failed to delete chat"
                  })}
                  src={assets.bin_icon}
                  className="w-4 h-4 cursor-pointer not-dark:invert hover:scale-110 transition-transform duration-200"
                  alt="Delete chat"
                />
              </div>
            </div>
          ))}
      </div>

      {/* Bottom Section - Sticky to bottom */}
      <div className="mt-12 space-y-4">
        {/* Community Images */}
        <div
          onClick={() => {
            navigate("/community");
            setIsMenuOpen(false);
          }}
          className="group flex items-center gap-3 p-4 border border-gray-200 dark:border-white/15 rounded-xl cursor-pointer hover:bg-white/30 dark:hover:bg-white/5 hover:shadow-md hover:scale-[1.02] transition-all duration-300"
        >
        <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <img src={assets.gallery_icon} className="w-4 not-dark:invert" alt="" />
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-800 dark:text-white">Community</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Explore images</p>
        </div>
      </div>

        {/* Credit Purchase Option */}
        <div
          onClick={() => {
            navigate("/credits");
            setIsMenuOpen(false);
          }}
          className="group flex items-center gap-3 p-4 border border-gray-200 dark:border-white/15 rounded-xl cursor-pointer hover:bg-white/30 dark:hover:bg-white/5 hover:shadow-md hover:scale-[1.02] transition-all duration-300"
        >
        <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <img src={assets.diamond_icon} className="w-4 dark:invert" alt="" />
        </div>
        <div className="flex flex-col flex-1">
          <p className="text-sm font-medium text-gray-800 dark:text-white">
            Credits: {user?.credits || 0}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Purchase more credits</p>
        </div>
        <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">+</div>
      </div>

        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between gap-3 p-4 border border-gray-200 dark:border-white/15 rounded-xl bg-white/20 dark:bg-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center">
            <img src={assets.theme_icon} className="w-4 not-dark:invert" alt="" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-white">Theme</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {theme === "dark" ? "Dark" : "Light"} mode
            </p>
          </div>
        </div>
        <label className="relative inline-flex cursor-pointer group">
          <input
            onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
            type="checkbox"
            className="sr-only peer"
            checked={theme === "dark"}
          />
          <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-blue-600 transition-all duration-300 group-hover:shadow-lg"></div>
          <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5 shadow-md"></span>
        </label>
      </div>

        {/* User Account */}
        <div className="flex items-center gap-3 p-4 border border-gray-200 dark:border-white/15 rounded-xl cursor-pointer group hover:bg-white/30 dark:hover:bg-white/5 hover:shadow-md transition-all duration-300">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          <img src={assets.user_icon} className="w-6 rounded-full" alt="" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
            {user ? user.name : "Login your account"}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {user ? "Account" : "Sign in required"}
          </p>
        </div>
        {user && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <img
              onClick={logout}
              src={assets.logout_icon}
              className="h-5 cursor-pointer not-dark:invert hover:scale-110 transition-transform duration-200"
              alt="Logout"
            />
          </div>
        )}
        </div>
      </div>

      <img
        onClick={() => setIsMenuOpen(false)}
        src={assets.close_icon}
        className="absolute top-3 right-3 w-5 h-5 cursor-pointer md:hidden not-dark:invert"
        alt=""
      />
    </div>
  );
};

export default Sidebar;

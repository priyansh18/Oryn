import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {axios,setToken} = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = state === "login" ? "/api/user/login" : "/api/user/register";
    try{
      const {data} = await axios.post(url, {name,email,password});
      if(data.success){
        setToken(data.token);
        localStorage.setItem("token", data.token);
      }else{
        toast.error(data.message);
      }
    }catch(error){
      toast.error(error.message);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-purple-900 p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 m-auto items-start p-8 py-12 w-80 sm:w-[400px] text-gray-500 dark:text-gray-300 rounded-2xl shadow-2xl border border-gray-200 dark:border-purple-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 m-auto mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">O</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Oryn
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">AI Assistant</p>
          </div>
        </div>
        <p className="text-xl font-medium m-auto text-gray-800 dark:text-white">
          <span className="text-purple-700 dark:text-purple-400">Welcome to</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>
        {state === "register" && (
          <div className="w-full group">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter your name"
              className="w-full p-3 mt-2 border border-gray-200 dark:border-purple-600 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 hover:border-purple-400"
              type="text"
              required
            />
          </div>
        )}
        <div className="w-full group">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
            className="w-full p-3 mt-2 border border-gray-200 dark:border-purple-600 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 hover:border-purple-400"
            type="email"
            required
          />
        </div>
        <div className="w-full group">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your password"
            className="w-full p-3 mt-2 border border-gray-200 dark:border-purple-600 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 hover:border-purple-400"
            type="password"
            required
          />
        </div>
        {state === "register" ? (
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center w-full">
            Already have an account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-purple-700 dark:text-purple-400 cursor-pointer hover:underline font-medium transition-colors duration-300"
            >
              Sign in here
            </span>
          </p>
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center w-full">
            Don't have an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-purple-700 dark:text-purple-400 cursor-pointer hover:underline font-medium transition-colors duration-300"
            >
              Create one here
            </span>
          </p>
        )}
        <button
          type="submit"
          className="group w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="flex items-center justify-center gap-2">
            {state === "register" ? "Create Account" : "Sign In"}
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </span>
        </button>
      </form>
    </div>
  );
};

export default Login;

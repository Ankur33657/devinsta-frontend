import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import { Search, MessageSquare, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

const Connection = () => {
  const [users, setUsers] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/connection/viewallconnection`,
        {
          method: "GET",
          credentials: "include", // Necessary to send cookies
        },
      );
      const json = await res.json();
      setUsers(json);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSelectUser = (id) => {
    setSelectedUserId(id);
    if (window.innerWidth < 768) {
      setIsMobileChatOpen(true);
    }
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row overflow-hidden">
      <div
        className={`w-full md:w-[320px] lg:w-[380px] flex flex-col bg-[#080808] border-r border-white/5 overflow-hidden shrink-0 ${isMobileChatOpen ? "hidden md:flex" : "flex"}`}
      >
        <div className="p-6 border-b border-white/5 bg-white/2 flex flex-col gap-4">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <MessageSquare size={20} className="text-emerald-500" />
            Connections
          </h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 bg-white/5" />
            <input
              type="text"
              placeholder="Search connections..."
              className="w-full bg-[#161618]/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all font-light"
            />
          </div>
        </div>

        <div className="flex-grow overflow-y-auto p-3 space-y-1 custom-scrollbar">
          {users && users.length > 0 ? (
            users.map((user) => (
              <ConnectionItem
                key={user._id}
                user={user}
                isActive={selectedUserId === user._id}
                onClick={() => handleSelectUser(user._id)}
              />
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 p-8 text-center opacity-20">
              <MessageSquare size={40} className="mb-2" />
              <p className="text-sm">No connections</p>
            </div>
          )}
        </div>
      </div>

      <div
        className={`flex-grow flex flex-col bg-[#050505] overflow-hidden relative ${!isMobileChatOpen && !selectedUserId ? "hidden md:flex" : "flex"}`}
      >
        {isMobileChatOpen && (
          <button
            onClick={() => setIsMobileChatOpen(false)}
            className="absolute top-4 left-4 z-20 md:hidden p-2 bg-white/10 rounded-xl text-white backdrop-blur-md"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        <Chat targetUserId={selectedUserId} />
      </div>
    </div>
  );
};

export default Connection;

function ConnectionItem({ user, isActive, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3.5 rounded-2xl transition-all relative group border ${
        isActive
          ? "bg-emerald-500/10 border-emerald-500/20 shadow-lg shadow-emerald-500/5"
          : "bg-transparent border-transparent hover:bg-white/5 hover:border-white/5"
      }`}
    >
      <div className="relative shrink-0">
        <div className="avatar placeholder">
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg border border-white/10 ${isActive ? "bg-gradient-to-br from-indigo-500 to-emerald-500" : "bg-[#1a1a1c]"}`}
          >
            <span className="text-sm font-bold text-white">
              {user?.firstName?.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
        <div
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#111] ${isActive ? "bg-emerald-400" : "bg-emerald-600"} shadow-sm`}
        />
      </div>

      <div className="flex-grow text-left overflow-hidden">
        <div className="flex justify-between items-center mb-0.5">
          <span
            className={`font-bold truncate text-sm ${isActive ? "text-emerald-400" : "text-white"}`}
          >
            {user.firstName + " " + user?.lastName}
          </span>
          <span className="text-[9px] text-slate-500 font-mono opacity-50">
            12:45 PM
          </span>
        </div>
        <p
          className={`text-xs truncate opacity-60 ${isActive ? "text-emerald-300" : "text-slate-400"}`}
        >
          Available for collab...
        </p>
      </div>

      {isActive && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-glow" />
      )}
    </motion.button>
  );
}

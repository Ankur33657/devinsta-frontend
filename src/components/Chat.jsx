import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import CreateSocketConnection from "../assets/Socket";
import { Send, Search, MoreVertical, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Chat = ({ targetUserId: propTargetUserId }) => {
  const { targetuserId: paramTargetUserId } = useParams();
  const toUserId = propTargetUserId || paramTargetUserId;

  const [message, setMessage] = useState("");
  const [fromUserId, setFromUserId] = useState("");
  const [finalMsg, setFinalMsg] = useState([]);
  const [socket, setSocket] = useState(null);
  const [targetUser, setTargetUser] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [finalMsg]);

  // Fetch data when toUserId changes
  useEffect(() => {
    if (toUserId) {
      setFinalMsg([]); // Clear messages for new user
      fetchTargetUser();
      // and fetchMessages will be triggered by fromUserId/toUserId effect
    }
  }, [toUserId]);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (fromUserId && toUserId) {
      fetchMessages();
    }
  }, [fromUserId, toUserId]);

  // Handle socket connection
  useEffect(() => {
    if (!fromUserId || !toUserId) return;

    const newSocket = CreateSocketConnection();
    setSocket(newSocket);
    newSocket.emit("joinchat", { fromUserId, toUserId });

    newSocket.on("messagereceive", (payload) => {
      setFinalMsg((prevMsgs) => [
        ...prevMsgs,
        {
          fromUserId: payload.fromUserId,
          toUserId: payload.toUserId,
          message: payload.message,
          createdAt: new Date().toISOString(),
        },
      ]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [fromUserId, toUserId]);

  const handleChat = () => {
    if (!socket || message.trim() === "") return;
    socket.emit("sendmessage", { fromUserId, toUserId, message });
    setFinalMsg((prevMsgs) => [
      ...prevMsgs,
      { fromUserId, toUserId, message, createdAt: new Date().toISOString() },
    ]);
    setMessage("");
  };

  const fetchUser = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/profile`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      if (res.ok) {
        const data = await res.json();
        setFromUserId(data._id);
      }
    } catch (err) {
      console.log("Error fetching user:", err.message);
    }
  };

  const fetchTargetUser = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/view/${toUserId}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      if (res.ok) {
        const data = await res.json();
        setTargetUser(data);
      }
    } catch (err) {
      console.log("Error fetching target user:", err.message);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/connection/chat`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fromUserId, toUserId }),
          credentials: "include",
        },
      );

      if (res.ok) {
        const data = await res.json();
        setFinalMsg(data);
      }
    } catch (err) {
      console.log("Error fetching messages:", err.message);
    }
  };

  if (!toUserId) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center text-slate-500 p-8 text-center h-full">
        <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-6 border border-white/10">
          <MessageSquare size={40} className="opacity-20" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
          Select a Conversation
        </h3>
        <p className="max-w-xs text-sm">
          Choose a connection from the left to start chatting with other
          developers.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#080808]/50 shrink-0">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
              {targetUser?.firstName?.charAt(0).toUpperCase()}
            </div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#111] bg-emerald-500" />
          </div>
          <div>
            <h3 className="font-bold text-white leading-none mb-1 text-sm">
              {targetUser
                ? `${targetUser.firstName} ${targetUser.lastName}`
                : "Loading..."}
            </h3>
            <span className="text-[9px] uppercase tracking-widest text-emerald-400 font-bold">
              ● Online
            </span>
          </div>
        </div>
        <div className="flex gap-1">
          <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400">
            <Search size={16} />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#050505]/30">
        <AnimatePresence initial={false}>
          {finalMsg.map((msg, index) => (
            <MessageBubble
              key={msg._id || index}
              message={msg}
              isMe={msg.fromUserId === fromUserId}
              user={targetUser}
            />
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-white/10 bg-white/2 shrink-0">
        <MessageInput
          message={message}
          setMessage={setMessage}
          onSend={handleChat}
        />
      </div>
    </div>
  );
};

export default Chat;

function MessageBubble({ message, isMe, user }) {
  const timestamp = message.createdAt
    ? new Date(message.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex ${isMe ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex gap-3 max-w-[85%] ${isMe ? "flex-row-reverse" : "flex-row"}`}
      >
        {!isMe && (
          <div className="shrink-0 mt-auto mb-1">
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold uppercase">
              {user?.firstName?.charAt(0)}
            </div>
          </div>
        )}
        <div className="flex flex-col">
          <div
            className={`px-4 py-2.5 rounded-2xl text-sm shadow-sm ${
              isMe
                ? "bg-gradient-to-br from-indigo-600 to-emerald-600 text-white rounded-br-none"
                : "bg-white/5 text-slate-200 border border-white/5 rounded-bl-none"
            }`}
          >
            {message.message}
          </div>
          {timestamp && (
            <span
              className={`text-[9px] font-mono text-slate-500 mt-1 ${isMe ? "text-right" : "text-left"} opacity-60`}
            >
              {timestamp}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function MessageInput({ message, setMessage, onSend }) {
  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        onSend();
      }}
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/30 transition-all placeholder:text-slate-600"
      />
      <button
        type="submit"
        disabled={!message.trim()}
        className="shrink-0 w-11 h-11 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-500/10 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
      >
        <Send size={18} />
      </button>
    </form>
  );
}

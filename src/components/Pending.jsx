import React, { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";

const Pending = () => {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/connection/allpendingrequest`,
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

  const handleRequest = async (status, connectionId) => {
    try {
      console.log(status + " " + connectionId);
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/connection/review/${status}/${connectionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Important for sending cookies
        },
      );
      if (res.ok) {
        console.log("you ___ the response" + status);
        fetchData();
      } else {
        console.log("error hhhhhh ");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-[600px] mx-auto"
    >
      <div className="glass-dark rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-bold text-white">Pending Requests</h2>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-semibold">
            {users?.length} {users?.length <= 1 ? "Request" : "Requests"}{" "}
            Waiting
          </p>
        </div>

        <div className="p-4 space-y-3">
          <AnimatePresence mode="popLayout">
            {users?.length > 0 ? (
              users.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  onAccept={() =>
                    handleRequest("accepted", request.connectionId)
                  }
                  onReject={() =>
                    handleRequest("rejected", request.connectionId)
                  }
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-12 flex flex-col items-center justify-center text-slate-500"
              >
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4 border border-white/10">
                  <Clock size={32} className="opacity-20" />
                </div>
                <p className="text-lg font-medium text-white/60">
                  No Pending Requests
                </p>
                <p className="text-sm">You're all caught up!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Pending;

function RequestCard(props) {
  const { request, onAccept, onReject } = props;
  console.log(request, "ree");
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.01 }}
      className="group relative flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all shadow-lg"
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-[14px] font-bold uppercase">
            {request?.fromUser?.firstName.charAt(0)}
          </div>
        </div>
        <div>
          <h4 className="font-bold text-white leading-tight">
            {request?.fromUser?.firstName + " " + request?.fromUser?.lastName}
          </h4>
          <p className="text-xs text-slate-500 font-mono">
            _
            {request?.fromUser?.firstName + request?.fromUser?._id.slice(0, 10)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onReject}
          className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg border border-transparent hover:border-red-400/20 transition-all"
        >
          Reject
        </button>
        <button
          onClick={onAccept}
          className="px-4 py-2 text-xs font-bold uppercase tracking-widest bg-emerald-500 text-white rounded-lg shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all"
        >
          Accept
        </button>
      </div>
      <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 rounded-xl transition-colors -z-10" />
    </motion.div>
  );
}

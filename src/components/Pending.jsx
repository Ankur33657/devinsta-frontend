import React, { useEffect, useState } from "react";
import Image1 from "../assets/image1.png";
import Image2 from "../assets/image2.png";
import Image3 from "../assets/image3.png";
import Image4 from "../assets/image4.png";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";
const MOCK_PENDING_REQUESTS = [
  {
    id: 1,
    name: "Ankur Singh",
    username: "@ankur",
    avatar: "https://picsum.photos/seed/ankur/100/100",
  },
  {
    id: 2,
    name: "Priya Das",
    username: "@priya_dev",
    avatar: "https://picsum.photos/seed/priya/100/100",
  },
  {
    id: 3,
    name: "David Miller",
    username: "@davidm",
    avatar: "https://picsum.photos/seed/david/100/100",
  },
  {
    id: 4,
    name: "Yuki Tanaka",
    username: "@yuki_t",
    avatar: "https://picsum.photos/seed/yuki/100/100",
  },
];
const Pending = () => {
  const [users, setUsers] = useState(null);

  const [requests, setRequests] = useState(MOCK_PENDING_REQUESTS);

  const handleAction = (id) => {
    setRequests(requests.filter((req) => req.id !== id));
  };

  const navigate = useNavigate();
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
    // <div className="flex flex-col items-center min-h-screen bg-gray-900 py-3">
    //   <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-4">
    //     <h1 className="text-gray-200 text-lg font-semibold mb-3">
    //       Pending Requests
    //     </h1>
    //     {users &&
    //       users.map((user, index) => (
    //         <div
    //           key={index}
    //           className="flex items-center justify-between p-5 my-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-200"
    //         >
    //           {/* Profile Section */}
    //           <div className="flex items-center gap-4">
    //             <div
    //               className={`relative w-14 h-14 rounded-full overflow-hidden ${
    //                 user.story ? "border-2 border-pink-500" : ""
    //               }`}
    //             >
    //               <img
    //                 src={user.fromUser.image1}
    //                 alt={user.fromUser.firstName}
    //                 className="w-full h-full object-cover"
    //               />
    //             </div>
    //             <div>
    //               <div className="flex items-center gap-1">
    //                 <span className="font-semibold text-gray-200">
    //                   {user.fromUser.firstName}
    //                 </span>
    //                 {/* {user.verified && <span className="text-blue-500">✔</span>} */}
    //               </div>
    //               <span className="text-gray-400 text-sm">
    //                 {user.fromUser.firstName}
    //               </span>
    //             </div>
    //           </div>

    //           {/* Buttons Section */}
    //           <div className="flex gap-3">
    //             <button
    //               className="btn btn-success btn-xs"
    //               onClick={() => handleRequest("accepted", user.connectionId)}
    //             >
    //               Accept
    //             </button>
    //             <button
    //               className="btn btn-error btn-xs"
    //               onClick={() => handleRequest("rejected", user.connectionId)}
    //             >
    //               Reject
    //             </button>
    //           </div>
    //         </div>
    //       ))}
    //   </div>
    // </div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-[600px] mx-auto"
    >
      <div className="glass-dark rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-bold text-white">Pending Requests</h2>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-semibold">
            {requests.length} {requests.length === 1 ? "Request" : "Requests"}{" "}
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
                  onAccept={() => handleAction(request.id)}
                  onReject={() => handleAction(request.id)}
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

      {/* Hover Glow */}
      <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 rounded-xl transition-colors -z-10" />
    </motion.div>
  );
}

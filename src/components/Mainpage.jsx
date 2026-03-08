import React, { useEffect } from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Users,
  Clock,
  Settings,
  LogOut,
  Menu,
  X,
  Heart,
  XCircle,
  Twitter,
  Youtube,
  Facebook,
  Code2,
  Github,
} from "lucide-react";
const Mainpage = () => {
  const [data, setData] = useState([]);
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    feed();
  }, []);

  const feed = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/feed`, {
        method: "GET",
        credentials: "include", // Necessary to send cookies
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error("ERROR:");
      }
      setData(json);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handlerequest = async (msg) => {
    try {
      const status = msg;
      const toUser = data[idx]?._id;
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/connection/request/${status}/${toUser}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        console.log("Success");
      }
      setIdx((idx) => idx + 1);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
      <main className="flex-grow flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full -z-10" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-emerald-500/5 blur-[100px] rounded-full -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md md:max-w-5xl"
        >
          <div className="glass-dark rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 hover:border-white/20 transition-all hover:shadow-emerald-500/5 hover:-translate-y-1 flex flex-col md:flex-row">
            <div className="relative aspect-[4/5] md:aspect-auto md:w-1/2 overflow-hidden group">
              <img
                src="https://picsum.photos/seed/developer-profile/800/1000"
                alt="Profile"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r md:from-black/40 md:to-transparent" />

              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest font-bold text-white border border-white/20">
                  Full Stack
                </span>
                <span className="px-3 py-1 bg-emerald-500/20 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest font-bold text-emerald-400 border border-emerald-500/30">
                  Available
                </span>
              </div>
            </div>

            <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                  Alex Rivera, 26
                </h2>
                <div className="flex gap-3">
                  <Github className="w-6 h-6 text-slate-400 hover:text-white cursor-pointer" />
                  <Twitter className="w-6 h-6 text-slate-400 hover:text-white cursor-pointer" />
                </div>
              </div>
              <p className="text-slate-400 mb-8 text-lg leading-relaxed">
                Senior React Developer at{" "}
                <span className="text-indigo-400 font-semibold">TechFlow</span>.
                Passionate about clean code, micro-interactions, and open
                source. Currently building the next generation of developer
                tools.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                {[
                  "#react",
                  "#typescript",
                  "#rust",
                  "#uiux",
                  "#node",
                  "#graphql",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-sm font-mono text-emerald-400/80 bg-emerald-400/5 px-3 py-1.5 rounded-lg border border-emerald-400/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <button className="group relative flex items-center justify-center gap-3 py-5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-2xl border border-red-500/20 hover:border-red-500/40 transition-all overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <XCircle
                    size={24}
                    className="group-hover:rotate-90 transition-transform"
                  />
                  <span className="font-bold tracking-widest uppercase text-sm">
                    Ignore
                  </span>
                </button>
                <button className="group relative flex items-center justify-center gap-3 py-5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <Heart
                    size={24}
                    className="group-hover:scale-125 transition-transform"
                  />
                  <span className="font-bold tracking-widest uppercase text-sm">
                    Interested
                  </span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
};
export default Mainpage;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "Home", icon: User, href: "/" },
  { label: "Profile", icon: User, href: "/profile" },
  { label: "Connections", icon: Users, href: "/connection" },
  { label: "Pending", icon: Clock, href: "/pending" },
  { label: "Settings", icon: Settings, href: "#" },
];

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/logout`,
        {
          method: "GET",
          credentials: "include", // Necessary to send cookies
        },
      );

      if (res.ok) {
        navigate("/login");
      } else {
        alert("fail");
        console.log("Logout failed:", await res.text());
      }
    } catch (err) {
      console.log("Error:", err.message);
    }
  };
  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-white bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/">
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Code2 className="text-white w-6 h-6" />
                </div>
                <span className="text-2xl font-bold tracking-tight text-white ">
                  Dev<span className="text-emerald-400">Insta</span>
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-slate-400 hover:text-white relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all group-hover:w-full" />
                </a>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <div className="dropdown dropdown-end hidden md:block">
                <div
                  tabIndex={0}
                  role="button"
                  className="avatar hover:ring-2 hover:ring-emerald-400 rounded-full"
                >
                  <div className="w-10 h-10 rounded-full ring ring-white/10 ring-offset-base-100 ring-offset-2 overflow-hidden">
                    <img
                      src="https://picsum.photos/seed/dev-avatar/100/100"
                      alt="User Avatar"
                      className="w-full h-full object-cover rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsDrawerOpen(true)}
                className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-72 bg-[#09090b] border-l border-white/5 z-[70] p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-bold text-white">Menu</span>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </a>
                ))}
                <div className="divider opacity-10 my-4"></div>
                <a className="flex items-center gap-4 p-4 rounded-xl hover:bg-red-400/10 text-red-400 transition-colors">
                  <LogOut size={20} />
                  <span className="font-medium">Logout</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

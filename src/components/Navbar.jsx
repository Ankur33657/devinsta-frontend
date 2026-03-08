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
  Code2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "Home", icon: User, href: "/" },
  { label: "Profile", icon: User, href: "/profile" },
  { label: "Connections", icon: Users, href: "/connection" },
  { label: "Pending", icon: Clock, href: "/pending" },
  { label: "Logout", icon: LogOut, href: "#" },
];

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/logout`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (res.ok) {
        setShowLogoutConfirm(false);
        navigate("/login");
      }
    } catch (err) {
      console.log("Logout Error:", err.message);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-white/5 bg-black/20">
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
              {NAV_ITEMS.map((item) =>
                item.label === "Logout" ? (
                  <button
                    key={item.label}
                    onClick={() => setShowLogoutConfirm(true)}
                    className="text-sm font-medium text-slate-400 hover:text-white relative group cursor-pointer"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all group-hover:w-full" />
                  </button>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="text-sm font-medium text-slate-400 hover:text-white relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all group-hover:w-full" />
                  </Link>
                ),
              )}
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

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogoutConfirm(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass-dark border border-white/10 p-8 rounded-[2rem] w-full max-w-sm relative z-10 shadow-2xl"
            >
              <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <LogOut className="text-red-500 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white text-center mb-2">
                Come back soon!
              </h3>
              <p className="text-slate-400 text-center mb-8">
                Are you sure you want to logout?
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleLogout}
                  className="w-full py-4 bg-gradient-to-r from-indigo-500 to-emerald-500 text-white rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-red-500/20 cursor-pointer"
                >
                  Yes, Log me out
                </button>
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all border border-white/10 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl font-bold text-white">Menu</span>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {NAV_ITEMS.map((item) =>
                  item.label === "Logout" ? (
                    <button
                      key={item.label}
                      onClick={() => {
                        setIsDrawerOpen(false);
                        setShowLogoutConfirm(true);
                      }}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors text-left"
                    >
                      <item.icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ) : (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setIsDrawerOpen(false)}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                    >
                      <item.icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ),
                )}
                <div className="divider opacity-10 my-4"></div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

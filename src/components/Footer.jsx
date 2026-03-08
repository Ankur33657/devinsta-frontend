import { Twitter, Youtube, Facebook, Code2 } from "lucide-react";
const Footer = () => {
  return (
    <footer className="glass-dark border-t border-white/5 py-3 px-4 w-full hidden md:block">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-md flex items-center justify-center">
                <Code2 className="text-white w-4 h-4" />
              </div>
              <span className="text-white font-semibold">DevInsta</span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              Connecting developers through meaningful interactions.
            </p>
          </div>

          {/* Platform Links */}
          <div className="flex gap-6 text-xs text-slate-400">
            <a href="#" className="hover:text-emerald-400 transition-colors">
              About
            </a>
            <a href="#" className="hover:text-emerald-400 transition-colors">
              Careers
            </a>
            <a href="#" className="hover:text-emerald-400 transition-colors">
              Press
            </a>
            <a href="#" className="hover:text-emerald-400 transition-colors">
              Contact
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex gap-3">
            <a className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center hover:bg-emerald-500/10 hover:text-emerald-400 border border-white/5">
              <Twitter size={16} />
            </a>

            <a className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center hover:bg-emerald-500/10 hover:text-emerald-400 border border-white/5">
              <Youtube size={16} />
            </a>

            <a className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center hover:bg-emerald-500/10 hover:text-emerald-400 border border-white/5">
              <Facebook size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";

const Mainbody = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      <div className="flex flex-col h-screen bg-[#030303]">
        {!isAuthPage && <Navbar />}
        <main className={`flex-grow overflow-auto`}>
          <Outlet />
        </main>

        {!isAuthPage && <Footer />}
      </div>
    </>
  );
};
export default Mainbody;

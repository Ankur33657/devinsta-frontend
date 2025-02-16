import React from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Mainbody = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="bg-gray-900 text-white">
        <Navbar />
        <Outlet/>

        <Footer />
      </div>
    </>
  );
};
export default Mainbody;

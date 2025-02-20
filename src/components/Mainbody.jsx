import React, { useContext, useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Mainbody = () => {
  return (
    <>
      <div className="bg-gray-900">
        <Navbar />

        <Outlet />
        <Footer />
      </div>
    </>
  );
};
export default Mainbody;

import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { LoginUser, Auth } from "../assets/LoginUser";
const Mainbody = () => {
  return (
    <>
      <LoginUser>
        <div className="bg-gray-900">
          <Navbar />
          <Outlet />
          <Footer />
        </div>
      </LoginUser>
    </>
  );
};
export default Mainbody;

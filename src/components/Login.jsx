import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [emailId, setEmail] = useState("test1@gmail.com");
  const [password, setPassword] = useState("Test123@");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailId, password }),
        credentials: "include", // Important for sending cookies
      });

      if (!res.ok) {
        throw new Error(`Login failed: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();

      navigate("/");
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="card bg-gray-800 w-96 shadow-xl text-white">
          <div className="card-body">
            <h2 className="card-title font-medium text-white">Login</h2>

            <label className="form-control w-full max-w-xs text-gray-700 font-medium">
              <div className="label">
                <span className=" font-medium text-white">Email Id</span>
              </div>
              <input
                type="text"
                placeholder="Enter your email"
                value={emailId}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full max-w-xs bg-gray-700 text-gray-900 placeholder-gray-400"
              />
            </label>

            <label className="form-control w-full max-w-xs text-gray-700 font-medium">
              <div className="label">
                <span className="font-medium text-white">Password</span>
              </div>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full max-w-xs bg-gray-700 text-white placeholder-gray-400"
              />
            </label>

            <div className="m-3 card-actions justify-center">
              <button onClick={handleLogin} className="btn btn-primary w-full">
                Login
              </button>
            </div>

            <Link
              to="/signup"
              className="link link-primary text-white cursor-pointer underline"
            >
              New to dev? Create an account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;

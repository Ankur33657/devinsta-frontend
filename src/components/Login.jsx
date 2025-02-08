import React from "react";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="card bg-gray-800 w-96 shadow-xl text-white">
          <div className="card-body">
            <h2 className="card-title font-medium text-white">Login</h2>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className=" font-medium text-white">Email Id</span>
              </div>
              <input
                type="text"
                placeholder="Enter your email"
                className="input input-bordered w-full max-w-xs bg-gray-700 text-white placeholder-gray-400"
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="font-medium text-white">Password</span>
              </div>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full max-w-xs bg-gray-700 text-white placeholder-gray-400"
              />
            </label>

            <div className="m-3 card-actions justify-center">
              <button className="btn btn-primary w-full">Login</button>
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

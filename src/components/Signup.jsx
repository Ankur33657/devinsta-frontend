import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="flex items-center justify-center m-5 p-2 bg-gray-900 min-h-screen">
      <div className="card bg-gray-800 w-96 shadow-xl">
        <div className="card-body text-white">
          <h2 className="card-title font-medium">Signup</h2>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="text-white font-medium">First Name</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs bg-gray-700 "
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="text-white font-medium">Last Name</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs bg-gray-700 text-black"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="text-white font-medium">Email Id</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs bg-gray-700 text-black"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="text-white font-medium">Password</span>
            </div>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs bg-gray-700 text-black"
            />
          </label>

          <div className="m-3 card-actions justify-center">
            <button className="btn btn-active btn-neutral">Signup</button>
          </div>

          <Link to="/login" className="link link-primary text-white">
            Existing User? <span className="underline">Log in</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;

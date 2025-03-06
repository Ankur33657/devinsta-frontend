import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSignup = async () => {
    const requestData = {
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      password: password,
    };
    try {
      const response = await fetch("https://tinder-xgew.onrender.com/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      if (!response.ok) {
        throw new Error("User already exited");
      }

      const responseData = await response.json();
      navigate("/login");
    } catch (error) {
      setError("ERROR: Invalid data");
    }
  };

  return (
    <div className="flex items-center justify-center m-5 p-2 bg-gray-900 min-h-screen">
      <div className="card bg-gray-800 w-96 shadow-xl">
        <div className="card-body text-white">
          <h2 className="card-title font-medium">Signup</h2>

          <label className="form-control w-full max-w-xs  text-gray-700 font-medium">
            <div className="label">
              <span className="text-white font-medium">First Name</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input input-bordered w-full max-w-xs bg-gray-700 "
            />
          </label>

          <label className="form-control w-full max-w-xs  text-gray-700 font-medium">
            <div className="label">
              <span className="text-white font-medium">Last Name</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input input-bordered w-full max-w-xs bg-gray-700 text-black"
            />
          </label>

          <label className="form-control w-full max-w-xs  text-gray-700 font-medium">
            <div className="label">
              <span className="text-white font-medium">Email Id</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="input input-bordered w-full max-w-xs bg-gray-700 text-black"
            />
          </label>

          <label className="form-control w-full max-w-xs  text-gray-700 font-medium">
            <div className="label">
              <span className="text-white font-medium">Password</span>
            </div>
            <input
              type="password"
              placeholder="Type here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full max-w-xs bg-gray-700 text-black"
            />
          </label>
          <p className="text-red-800">{error}</p>
          <div className="m-3 card-actions justify-center">
            <button
              onClick={handleSignup}
              className="btn btn-active btn-primary"
            >
              Signup
            </button>
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

import React, { useEffect, useState } from "react";
import Image1 from "../assets/image1.png";
import Image2 from "../assets/image2.png";
import Image3 from "../assets/image3.png";
import Image4 from "../assets/image4.png";
import { Link } from "react-router-dom";

const Connection = () => {
  let userId;
  const [users, setUsers] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/connection/viewallconnection",
        {
          method: "GET",
          credentials: "include", // Necessary to send cookies
        }
      );
      const json = await res.json();
      setUsers(json);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 py-3">
      <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-4">
        <h1>Connections</h1>
        {users &&
          users.map((user, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-5 my-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-200"
            >
              {/* Profile Section */}
              <div className="flex items-center gap-4">
                <div
                  className={`relative w-14 h-14 rounded-full overflow-hidden ${
                    user.story ? "border-2 border-pink-500" : ""
                  }`}
                >
                  <img
                    src={user.image1}
                    alt={user.firstName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-gray-200">
                      {user.firstName}
                    </span>
                    {/* {user.verified && <span className="text-blue-500">✔</span>} */}
                  </div>
                  <span className="text-gray-400 text-sm">{user.name}</span>
                </div>
              </div>
              {/* Message Button */}
              <Link
                to={`/chat/${user._id}`} // Send user._id as part of the URL
                className="btn btn-secondary btn-sm"
              >
                message
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Connection;

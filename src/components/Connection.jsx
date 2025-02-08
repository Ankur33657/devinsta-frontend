import React from "react";
import Image1 from "../assets/image1.png";
import Image2 from "../assets/image2.png";
import Image3 from "../assets/image3.png";
import Image4 from "../assets/image4.png";

const Connection = () => {
  const users = [
    {
      username: "rashathadani",
      name: "Rasha Thadani",
      img: Image1,
      verified: true,
    },
    {
      username: "hannahchera...",
      name: "Hannah Cheramy",
      img: Image2,
      verified: true,
    },
    {
      username: "jasmeet_kaur09",
      name: "Jasmeet Kaur",
      img: Image3,
    },
    {
      username: "ikashishdhiman",
      name: "Kashish Dhiman",
      img: Image4,
    },
    {
      username: "c.i.a_sharma",
      name: "seeeee yaaa🐸",
      img: Image1,
      story: true,
    },
    {
      username: "akshitaathakurr",
      name: "Akshita",
      img: Image2,
    },
    {
      username: "mehaksharma21...",
      name: "Mehak ❤️",
      img: Image3,
    },
    {
      username: "tissa_vaasi.06",
      name: "Jyoti Thakur",
      img: Image4,
      verified: true,
    },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 py-3">
      <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-4">
        <h1>Connections</h1>
        {users.map((user, index) => (
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
                  src={user.img}
                  alt={user.username}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-gray-200">
                    {user.username}
                  </span>
                  {user.verified && <span className="text-blue-500">✔</span>}
                </div>
                <span className="text-gray-400 text-sm">{user.name}</span>
              </div>
            </div>

            {/* Message Button */}

            <button className="btn btn-secondary">Message</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connection;

import React, { useEffect, useState } from "react";
import Image1 from "../assets/image1.png";
import Image2 from "../assets/image2.png";
import Image3 from "../assets/image3.png";
import Image4 from "../assets/image4.png";
import Image5 from "../assets/image5.png";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/profile", {
          method: "GET",
          credentials: "include", // Necessary to send cookies
        });

        if (!res.ok) {
          navigate("/login");
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        navigate("/login");
      }
    };
    fetchData();
    connection();
  }, []);

  const connection = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/allcountconnection", {
        method: "GET",
        credentials: "include", // Necessary to send cookies
      });
      const json = await res.json();

      setCount(json);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-900 min-h-screen text-white">
      {/* Profile Section */}
      <div className="bg-gray-800 shadow-xl rounded-lg p-6 w-full max-w-md text-center flex flex-col items-center">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={data.image1} alt="Profile" />
          </div>
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <Link to="/pending" className="text-center">
            <p className="text-lg font-bold">{count.pending_count}</p>
            <span className="text-gray-400">Pending</span>
          </Link>
          <Link to="/connection" className="text-center">
            <p className="text-lg font-bold">{count.connection_count}</p>
            <span className="text-gray-400">Connections</span>
          </Link>
        </div>
        <Link to="/profile/edit" state={data} className="flex m-2 p-2">
          <button className="btn btn-success btn-sm">Edit</button>
        </Link>
      </div>

      {/* User Details (Boxes Instead of Inputs) */}
      <div className="bg-gray-800 shadow-xl rounded-lg p-6 w-full max-w-md mt-4">
        <p className="font-semibold text-center text-lg">Profile Information</p>
        <div className="space-y-4 mt-4">
          <div>
            <label className="text-gray-300 block mb-1">First Name</label>
            <div className="border border-gray-600 bg-gray-700 text-white p-2 rounded-lg">
              {data.firstName}
            </div>
          </div>
          <div>
            <label className="text-gray-300 block mb-1">Last Name</label>
            <div className="border border-gray-600 bg-gray-700 text-white p-2 rounded-lg">
              {!data.lastName ? " ." : data.lastName}
            </div>
          </div>
          <div>
            <label className="text-gray-300 block mb-1">Gender</label>
            <div className="border border-gray-600 bg-gray-700 text-white p-2 rounded-lg">
              {!data.gender ? " ." : data.gender}
            </div>
          </div>
          <div>
            <label className="text-gray-300 block mb-1">Date of Birth</label>
            <div className="border border-gray-600 bg-gray-700 text-white p-2 rounded-lg">
              {!data.dob ? " ." : data.dob.substring(0, 10)}
            </div>
          </div>
        </div>
      </div>

      {/* Other Images */}
      <div className="bg-gray-800 shadow-xl rounded-lg p-6 w-full max-w-md mt-4">
        <p className="font-semibold mb-4 text-center">Other Images</p>
        <div className="grid grid-cols-3 gap-4">
          {[data.image2, data.image3, data.image3].map((img, index) => (
            <div key={index} className="avatar">
              <div className="w-20 rounded">
                <img src={img ? img : Image5} alt={`Gallery ${index}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interests, Hobbies, and Bio (Now with Styled Boxes) */}
      <div className="bg-gray-800 shadow-xl rounded-lg p-6 w-full max-w-md mt-4">
        <p className="font-semibold text-center text-lg">More About Me</p>
        <div className="space-y-4 mt-4">
          <div>
            <label className="text-gray-300 block mb-1">Interested In</label>
            <div className="border border-gray-600 bg-gray-700 text-white p-2 rounded-lg">
              {data.interest ? data.interest : ["."]}
            </div>
          </div>
          <div>
            <label className="text-gray-300 block mb-1">Hobby</label>
            <div className="border border-gray-600 bg-gray-700 text-white p-2 rounded-lg">
              {data.hobby ? data.hobby : "."}
            </div>
          </div>
          <div>
            <label className="text-gray-300 block mb-1">Bio</label>
            <div className="border border-gray-600 bg-gray-700 text-white p-2 rounded-lg">
              {data.bio ? data.bio : "."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

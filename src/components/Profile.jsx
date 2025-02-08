import React from "react";
import Image1 from "../assets/image1.png";
import Image2 from "../assets/image2.png";
import Image3 from "../assets/image3.png";
import Image4 from "../assets/image4.png";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="flex flex-col items-center p-6 bg-gray-900 min-h-screen text-white">
      {/* Profile Section */}
      <div className="bg-gray-800 shadow-xl rounded-lg p-6 w-full max-w-md text-center flex flex-col items-center">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={Image1} alt="Profile" />
          </div>
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <Link to="/pending" className="text-center">
            <p className="text-lg font-bold">100</p>
            <a className="text-gray-400">Pending</a>
          </Link>
          <Link to="/connection" className="text-center">
            <p className="text-lg font-bold">150</p>
            <a className="text-gray-400">Connections</a>
          </Link>
        </div>
      </div>

      {/* User Details (Boxes Instead of Inputs) */}
      <div className="bg-gray-800 shadow-xl rounded-lg p-6 w-full max-w-md mt-4">
        <p className="font-semibold text-center text-lg">Profile Information</p>
        <div className="space-y-4 mt-4">
          <div>
            <label className="text-gray-300 block mb-1">First Name</label>
            <div className="border border-gray-600 bg-gray-700 text-white p-2 rounded-lg">
              John
            </div>
          </div>
          <div>
            <label className="text-gray-300 block mb-1">Last Name</label>
            <div className="border border-gray-600 bg-gray-700 text-white p-2 rounded-lg">
              Doe
            </div>
          </div>
          <div>
            <label className="text-gray-300 block mb-1">Gender</label>
            <div className="border border-gray-600 bg-gray-700 text-white p-2 rounded-lg">
              Male
            </div>
          </div>
          <div>
            <label className="text-gray-300 block mb-1">Date of Birth</label>
            <div className="border border-gray-600 bg-gray-700 text-white p-2 rounded-lg">
              January 1, 1995
            </div>
          </div>
        </div>
      </div>

      {/* Other Images */}
      <div className="bg-gray-800 shadow-xl rounded-lg p-6 w-full max-w-md mt-4">
        <p className="font-semibold mb-4 text-center">Other Images</p>
        <div className="grid grid-cols-3 gap-4">
          {[Image2, Image3, Image4].map((img, index) => (
            <div key={index} className="avatar">
              <div className="w-20 rounded">
                <img src={img} alt={`Gallery ${index}`} />
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
              Technology, Sports
            </div>
          </div>
          <div>
            <label className="text-gray-300 block mb-1">Hobby</label>
            <div className="border border-gray-600 bg-gray-700 text-white p-2 rounded-lg">
              Photography, Traveling
            </div>
          </div>
          <div>
            <label className="text-gray-300 block mb-1">Bio</label>
            <div className="border border-gray-600 bg-gray-700 text-white p-2 rounded-lg">
              I am a passionate developer and traveler who loves exploring new
              things.
            </div>
            <Link to="/profile/edit" className="flex m-2 p-2">
              <button className="btn btn-success btn-sm">Edit</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

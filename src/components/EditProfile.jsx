import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditProfile = () => {
  const location = useLocation();
  const user = location.state || {};
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender);
  const [dob, setDob] = useState(user.dob);
  const [image1, setImage1] = useState(user.image1);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage1(URL.createObjectURL(file));
    }
  };

  const handleEdit = async () => {
    try {
      const data = {
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        dob: dob,
        image1: image1,
      };
      const response = await fetch("https://tinder-xgew.onrender.com/api/profile/edit", {
        method: "PATCH",
        credentials: "include", // Ensures cookies are sent if applicable
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(data);
      if (response.ok) {
        navigate("/profile");
      } else {
        console.log("fail");
      }
    } catch (error) {
      console.log("Error hhh");
    }
  };
  console.log(image1);
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="bg-gray-800 shadow-xl rounded-lg p-8 w-full max-w-lg text-gray-700">
          <p className="font-semibold text-center text-xl text-white mb-6">
            Edit Profile
          </p>

          <div className="space-y-4">
            {/* First Name */}
            <div>
              <label className="text-gray-400 block mb-1 ">First Name</label>
              <input
                className="input input-bordered w-full bg-gray-700 text-gray-900 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="John"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="text-gray-400 block mb-1">Last Name</label>
              <input
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input input-bordered w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="text-gray-400 block mb-1">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="select select-bordered w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="text-gray-400 block mb-1">Date of Birth</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="input input-bordered w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Interest */}
            <div>
              <label className="text-gray-400 block mb-1">Interest</label>
              <input
                type="text"
                placeholder="Technology, Sports"
                className="input input-bordered w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Hobby */}
            <div>
              <label className="text-gray-400 block mb-1">Hobby</label>
              <input
                type="text"
                placeholder="Photography, Traveling"
                className="input input-bordered w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="text-gray-400 block mb-1">Bio</label>
              <textarea
                placeholder="Write something about yourself..."
                className="textarea textarea-bordered w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <input
              type="file"
              className="file-input file-input-bordered file-input-secondary w-full max-w-xs m-2 p-2"
              onChange={handleFileChange}
            />

            {/* Submit Button */}
            <div className="m-3 card-actions justify-center">
              <button onClick={handleEdit} className="btn btn-primary w-full">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;

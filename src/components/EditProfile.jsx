import React from "react";

const EditProfile = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 shadow-xl rounded-lg p-8 w-full max-w-lg">
        <p className="font-semibold text-center text-xl text-white mb-6">
          Edit Profile
        </p>

        <div className="space-y-4">
          {/* First Name */}
          <div>
            <label className="text-gray-400 block mb-1">First Name</label>
            <input
              type="text"
              placeholder="John"
              className="input input-bordered w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="text-gray-400 block mb-1">Last Name</label>
            <input
              type="text"
              placeholder="Doe"
              className="input input-bordered w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="text-gray-400 block mb-1">Gender</label>
            <select className="select select-bordered w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500">
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

          {/* Submit Button */}
          <div className="m-3 card-actions justify-center">
              <button className="btn btn-primary w-full">Save</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

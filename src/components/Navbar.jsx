import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/logout", {
        method: "GET",
        credentials: "include", // Necessary to send cookies
      });

      if (res.ok) {
        navigate("/login");
      } else {
        alert("fail");
        console.log("Logout failed:", await res.text());
      }
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <>
      <div className="navbar bg-gray-600 sticky top-0 z-20">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl text-white">
            daisyUI
          </Link>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
              onClick={toggleDropdown} // Toggle dropdown visibility
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            {isDropdownOpen && ( // Only show the dropdown if it's open
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-gray-500 rounded-box z-[1] mt-3 w-52 p-2 shadow text-white"
              >
                <li>
                  <Link
                    to="/profile"
                    className="justify-between hover:bg-blue-900 hover:text-white p-2 rounded"
                    onClick={closeDropdown}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/connection"
                    className="justify-between hover:bg-gray-700 hover:text-blue p-2 rounded"
                    onClick={closeDropdown}
                  >
                    Connections
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pending"
                    className="justify-between hover:bg-gray-700 hover:text-blue p-2 rounded"
                    onClick={closeDropdown}
                  >
                    Pending
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:bg-gray-700 hover:text-blue p-2 rounded"
                    onClick={closeDropdown}
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      Logout();
                      closeDropdown();
                    }}
                    className="w-full text-left hover:bg-gray-700 hover:text-blue p-2 rounded"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

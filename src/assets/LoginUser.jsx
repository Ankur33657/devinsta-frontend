import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Create context
export const Auth = createContext();

// Custom provider component
export const LoginUser = ({ children }) => {
  const [data, setData] = useState(null); // State to hold user data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const navigate = useNavigate(); // Navigate hook

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/profile", {
          method: "GET",
          credentials: "include", // Necessary to send cookies
        });

        if (!res.ok) {
          // If not ok, redirect to login
          navigate("/login");
        }

        const json = await res.json();
        setData(json); // Set data when successful
      } catch (err) {
        navigate("/login"); // On error, redirect to login
      } finally {
        setLoading(false); // Set loading to false once finished
      }
    };

    fetchUserData();
  }, []);

  // While loading, you can show a loading indicator or null
  if (loading) {
    return <div>Loading...</div>;
  }

  return <Auth.Provider value={data}>{children}</Auth.Provider>;
};

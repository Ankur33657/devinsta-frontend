import React, { useEffect } from "react";
import { useState } from "react";

const Mainpage = () => {
  const [data, setData] = useState([]);
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    feed();
  }, []);

  const feed = async () => {
    try {
      const res = await fetch("https://tinder-xgew.onrender.com/api/feed", {
        method: "GET",
        credentials: "include", // Necessary to send cookies
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error("ERROR:");
      }
      setData(json);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handlerequest = async (msg) => {
    try {
      const status = msg;
      const toUser = data[idx]?._id;
      const response = await fetch(
        `https://tinder-xgew.onrender.com/api/connection/request/${status}/${toUser}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        console.log("Success");
      }
      setIdx((idx) => idx + 1);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center m-5 p-2 ">
        <div className="card bg-gray-800 w-96 shadow-xl">
          <div className=" flex items-center justify-center card-body">
            <div className=" carousel rounded-box w-74">
              <div className="carousel-item w-full">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
                  className="w-full"
                  alt="Tailwind CSS Carousel component"
                />
              </div>
              <div className="carousel-item w-full">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
                  className="w-full"
                  alt="Tailwind CSS Carousel component"
                />
              </div>
            </div>
            <div className="text-white">{data[idx]?.firstName}</div>

            <p>#cat lover #sexiest #Dog lover</p>

            <div className="flex justify-between w-full p-4">
              <button
                className="btn btn-success btn-sm"
                onClick={() => handlerequest("interested")}
              >
                Interested
              </button>
              <button
                onClick={() => handlerequest("ignored")}
                className="btn btn-error btn-sm"
              >
                Ignore
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Mainpage;

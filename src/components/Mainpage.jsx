import React from "react";
const Mainpage = () => {
  return (
    <>
      <div className="flex items-center justify-center m-10 p-2 ">
        <div className="card bg-gray-800 w-96 shadow-xl">
          <div className=" flex items-center justify-center card-body">
            <div className=" carousel rounded-box w-64">
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
            <div>Ankur Singh</div>
            <p>#cat lover #sexiest #Dog lover</p>

            <div className="flex justify-between w-full p-4">
              <button className="btn btn-success">Interested</button>
              <button className="btn btn-error">Reject</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Mainpage;

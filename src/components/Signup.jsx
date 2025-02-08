import React from "react";
const Signup = () => {
  return (
    <>
      <div className="flex items-center justify-center m-10 p-2 ">
        <div className="card bg-base-200 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title font-medium">Signup</h2>
            <label className="form-control w-full max-w-xs">
              <div className="label ">
                <span className="label-text font-medium ">First Name</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label ">
                <span className="label-text font-medium ">Last Name</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label ">
                <span className="label-text font-medium ">Email Id</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-medium ">password</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>

            <div className="m-3 card-actions justify-center ">
              <button className="btn btn-active btn-neutral">Signup</button>
            </div>
            <span className="link  link-primary ">Existing User? Log in</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;

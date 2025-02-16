import React from "react";
const Chat = () => {
  return (
    <>
      <div className="w-full max-w-xl mx-auto mt-10 bg-white shadow-xl rounded-lg p-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Live Chat</h2>
          <p className="text-gray-500 text-sm">
            Chat with your friends in real-time
          </p>
        </div>

        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <div className="chat-header">
            Obi-Wan Kenobi
            <time className="text-xs opacity-50">12:45</time>
          </div>
          <div className="chat-bubble">You were the Chosen One!</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <div className="chat-header">
            Anakin
            <time className="text-xs opacity-50">12:46</time>
          </div>
          <div className="chat-bubble">I hate you!</div>
          <div className="chat-footer opacity-50">Seen at 12:46</div>
        </div>

        <div className="flex text-gray-900 items-center space-x-3 m-2 p-2">
          <label className="form-control w-full max-w-xs">
          
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
           
          </label>
          <button className=" m-2 p-2 btn btn-success">Send</button>
        </div>
      </div>
    </>
  );
};
export default Chat;

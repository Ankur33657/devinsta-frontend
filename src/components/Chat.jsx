import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Auth } from "../assets/LoginUser";
import CreateSocketConnection from "../assets/Socket";
const Chat = () => {
  const { targetuserId } = useParams();

  const [message, setMessage] = useState("");
  const [msg, setMsg] = useState("");
  const user = useContext(Auth);
  const UserId = user._id;

  useEffect(() => {
    const socket = CreateSocketConnection();
    socket.emit("joinchat", { targetuserId, UserId });

    socket.on("messagerecieve", ({ message }) => {
      setMsg(message);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  const handleChat = () => {
    const socket = CreateSocketConnection();
    socket.emit("sendmessage", { targetuserId, UserId, message });
  };
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
          <div className="chat-header">
            Obi-Wan Kenobi
            <time className="text-xs opacity-50">12:45</time>
          </div>
          <div className="chat-bubble">{msg}</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
        <div className="flex text-gray-900 items-center space-x-3 m-2 p-2">
          <label className="form-control w-full max-w-xs">
            <input
              type="text"
              placeholder="Type here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <button onClick={handleChat} className="m-2 p-2 btn btn-success">
            Send
          </button>
        </div>
      </div>
    </>
  );
};
export default Chat;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateSocketConnection from "../assets/Socket";

const Chat = () => {
  const toUserId = useParams().targetuserId;
  const [message, setMessage] = useState("");
  const [fromUserId, setFromUserId] = useState("");
  const [finalMsg, setFinalMsg] = useState([]); // Ensure it's an empty array
  const [socket, setSocket] = useState(null);

  // Fetch User when the component mounts
  useEffect(() => {
    fetchUser();
  }, []);

  // Fetch Messages when fromUserId changes
  useEffect(() => {
    // if (fromUserId) {
    Messages();
    // }
  }); // Fetch messages only when fromUserId is set

  // Handle socket connection and incoming messages
  useEffect(() => {
    if (!fromUserId) return;

    const newSocket = CreateSocketConnection();
    setSocket(newSocket);
    newSocket.emit("joinchat", { fromUserId, toUserId });

    // Listen for new messages
    newSocket.on("messagereceive", ({ fromUserId, toUserId, message }) => {
      setFinalMsg((prevMsgs) => [
        ...prevMsgs,
        { fromUserId, toUserId, message },
      ]); // Append message correctly
    });

    return () => {
      newSocket.disconnect();
    };
  }, [fromUserId, toUserId]); // Depend on fromUserId & toUserId to ensure reconnection

  // Handle Sending Messages
  const handleChat = () => {
    if (!socket || message.trim() === "") return;

    socket.emit("sendmessage", { fromUserId, toUserId, message });

    setFinalMsg((prevMsgs) => [...prevMsgs, { fromUserId, toUserId, message }]); // Append message to UI
    setMessage(""); // Clear input field
  };

  // Fetch the currently logged-in user
  const fetchUser = async () => {
    try {
      const res = await fetch("https://tinder-xgew.onrender.com/api/profile", {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json(); // Parse JSON response
        setFromUserId(data._id); // Set User ID
      }
    } catch (err) {
      console.log("Error fetching user:", err.message);
    }
  };

  // Fetch previous messages
  const Messages = async () => {
    try {
      if (!fromUserId || !toUserId) return; // Ensure both IDs are available

      const res = await fetch(`https://tinder-xgew.onrender.com/api/connection/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromUserId: fromUserId,
          toUserId: toUserId,
        }),
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json(); // Parse JSON response
        setFinalMsg(() => data); // Set messages in state properly
      }
    } catch (err) {
      console.log("Error fetching messages:", err.message);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-10 bg-white shadow-xl rounded-lg p-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Live Chat</h2>
        <p className="text-gray-500 text-sm">
          Chat with your friends in real-time
        </p>
      </div>

      {/* Chat messages */}
      <div className="space-y-3">
        {finalMsg.map((value, index) => (
          <div
            key={index}
            className={
              value.fromUserId === fromUserId
                ? "chat chat-end"
                : "chat chat-start"
            }
          >
            <div className="chat-bubble">{value.message}</div>
          </div>
        ))}
      </div>

      {/* Input Field */}
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
  );
};

export default Chat;

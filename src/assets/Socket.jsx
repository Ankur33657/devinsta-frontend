import io from "socket.io-client";
const CreateSocketConnection = () => {
  return io("https://tinder-xgew.onrender.com");
};
export default CreateSocketConnection;

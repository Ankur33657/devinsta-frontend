import io from "socket.io-client";
const CreateSocketConnection = () => {
  return io("http://localhost:3000");
};
export default CreateSocketConnection;

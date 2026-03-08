import io from "socket.io-client";
const CreateSocketConnection = () => {
  return io(import.meta.env.VITE_BACKEND_URL);
};
export default CreateSocketConnection;

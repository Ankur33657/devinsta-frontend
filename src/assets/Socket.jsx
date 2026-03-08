import io from "socket.io-client";
const CreateSocketConnection = () => {
  return io(process.env.BACKENT_URL);
};
export default CreateSocketConnection;

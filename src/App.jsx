import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Mainpage from "./components/Mainpage";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Mainbody from "./components/Mainbody";
import Connection from "./components/Connection";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Mainbody />}>
          <Route index element={<Mainpage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit" element={<EditProfile />} />
          <Route path="connection" element={<Connection />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

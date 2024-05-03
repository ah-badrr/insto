import "./App.css";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Message from "./pages/Message";
import Profile from "./pages/Profile";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Explore from "./pages/Explore";
import AddPost from "./components/AddPost";
import NotFound from "./components/NotFound";
import EditProfile from "./components/EditProfile";
import EditPost from "./components/EditPost";
import MessageCard from "./components/MessageCard";
import io from "socket.io-client";
import Socket from "./pages/Socket";
import SavedPost from "./components/SavedPost";
import ProfileVisit from "./components/ProfileVisit";

const socket=io.connect("http://localhost:5000");

function App() {

  return (
    <div className="App" style={{ overflow: "hidden" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/:uid" element={<Home />} />
          <Route path="/profile/:uid" element={<Profile />} />
          <Route path="/profile/saved/:uid" element={<SavedPost />} />
          <Route path="/profile/visit/:uid/:id" element={<ProfileVisit />} />
          <Route path="/profile/edit/:uid" element={<EditProfile />} />
          <Route path="/post/:uid" element={<AddPost />} />
          <Route path="/post/:uid/:id" element={<EditPost />} />
          <Route path="/explore/:uid" element={<Explore />} />
          <Route path="/message/:uid" element={<Message />} />
          <Route path="/messages/:uid/:id" element={<MessageCard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:uid/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

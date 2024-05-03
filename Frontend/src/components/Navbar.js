import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome,   faSearch, faUser, faRightToBracket, faCab } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane,faCircleUser, faCompass ,faSquarePlus} from "@fortawesome/free-regular-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import AddPost from "./AddPost";
import axios from "axios";
import profiled from "../images/profile.png"

const Navbar = () => {
  const [postc, setPostc] = useState(false);
  const [profile, setProfile] = useState([]);
  const [userById, setUserById] = useState([]);
  const { uid } = useParams();

  useEffect(() => {
    getProfile();
    getUserById();
  }, [0]);

  const postCard = () => {
    setPostc((postc) => !postc);
  };

  const getProfile = async () => {
    const response = await axios.get(`http://localhost:5000/profiles/user/${uid}`);
    setProfile(response.data);
  };

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:5000/users/${uid}`);
    setUserById(response.data);
  };

  let buat = postc ? " is-active" : null;
  return (
    <ul style={{}} className="navbar m-0">
      <li className="navlogo ">
        <FontAwesomeIcon icon={faInstagram} className="logo" style={{ fontSize: "1.5rem" }} />
        <span className="navitem brand">Insto</span>
      </li>
      <li className="">
        <ul className="listmenu p-0">
          <NavLink className="linkitem" to={`/${uid}`}>
            <FontAwesomeIcon icon={faHome} className="linklogo" style={{ fontSize: "1.5rem" }} />
            <span className="navitem">Home</span>
          </NavLink>
          <NavLink className="linkitem" to={`/search/${uid}`}>
            <FontAwesomeIcon icon={faSearch} className="linklogo" style={{ fontSize: "1.5rem" }} />
            <span className="navitem">Cari</span>
          </NavLink>
          <NavLink className="linkitem" to={`/explore/${uid}`}>
            <FontAwesomeIcon icon={faCompass} className="linklogo" style={{ fontSize: "1.5rem" }} />
            <span className="navitem">Jelajahi</span>
          </NavLink>
          <NavLink className="linkitem" to={`/message/${uid}`}>
            <FontAwesomeIcon icon={faPaperPlane} className="linklogo" style={{ fontSize: "1.5rem" }} />
            <span className="navitem">Pesan</span>
          </NavLink>
          <NavLink className="linkitem" to={`/post/${uid}`}>
            <FontAwesomeIcon icon={faSquarePlus} className="linklogo" style={{ fontSize: "1.5rem" }} />
            <span className="navitem">Buat</span>
          </NavLink>
          <NavLink className="linkitem" to={`/profile/${uid}`}>
            <FontAwesomeIcon icon={faCircleUser} className="linklogo" style={{ fontSize: "1.5rem" }} />
            <span className="navitem">Profil</span>
          </NavLink>
        </ul>
      </li>
      <li className="">
        <ul className="listbottom ">
          <NavLink className="linkitem" to={"/login"}>
            <FontAwesomeIcon icon={faRightToBracket} className="linklogo" style={{ fontSize: "1.5rem" }} />
            <span className="navitem">Logout</span>
          </NavLink>
          <li className="p-0" to={"/login"}>
            <figure className="navimg image p-0">
              <img className="is-rounded border border-2 d-inline-block" alt="" src={profile.url ? profile.url : profiled} style={{ height: "30px", width: "30px", objectFit: "cover", objectPosition: "top" }} />
            </figure>
            <span className="navitem">{userById.username}</span>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import axios from "axios";
import profiled from "../images/profile.png";
import Moment from "react-moment";
import "moment-timezone";
import moment, { now } from "moment";
import "moment/locale/id";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as hr } from "@fortawesome/free-regular-svg-icons";

const CommentCard = ({ id, created, username, comment }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    getUser();
  }, [0]);

  const getUser = async () => {
    const response = await axios.get(`http://localhost:5000/users/${id}`);
    setUser(response.data);
  };

  return (
    <li className="pl-2 py-1 pr-3 gap-2 is-flex is-justify-content-space-between shadow mb-3 rounded" style={{ maxWidth: "100%", width: "100%", textWrap: "wrap" }}>
      <div className="is-flex gap-2">
        <img src={user ? (user.url ? user.url : profiled) : profiled} alt="" className="" style={{ borderRadius: "50%", height: "32px", width: "32px", objectFit: "cover", objectPosition: "center" }} />
        <ul>
          <li className="text-bold has-text-weight-bold" style={{ fontSize: "15px" }}>
            {username}
            <span className="ml-2 fw-normal">{comment}</span>
          </li>
          <li className=""> 
            <span className="is-size-7 fw-light mr-3">0 suka</span>
            <Moment className="has-text-weight-light is-size-7" fromNow>
              {created}
            </Moment>
          </li>
        </ul>
      </div>
      <FontAwesomeIcon className="is-size-7 pt-2" icon={hr} />
    </li>
  );
};

export default CommentCard;

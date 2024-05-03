import { NavLink, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import MessageCard from "../components/MessageCard";
import profile from "../images/profile.png";

const Message = ({ child }) => {
  const [users, setUsers] = useState([]);
  const { uid } = useParams();
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users`);
      setUsers(response.data);
    } catch (error) {}
  };
  return (
    <Layout>
      <div className="row message m-0 m-auto" style={{ overflow: "hidden", width: "100%", height: "100%" }}>
        <div className="list col-3 col-sm-4 col-md-3 is-flex gap-2 p-0 is-flex-direction-column " style={{ borderRight: "1.5px solid #0000002f", overflowY: "auto", height: "100%" }}>
          <div className="table table-hover m-0" style={{ height: "max-content" }}>
            <thead className="border-none border-0">
              <tr className="border-none border-0">
                <td className="border-none border-0" style={{ width: "100%" }}></td>
                <td className="border-none border-0"></td>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                if (user.id != uid) {
                  return (
                    <tr className="contact p-0" style={{ width: "100%" }}>
                      <td colSpan="2" className="border-0" style={{ width: "100%" }}>
                        <NavLink to={`/messages/${uid}/${user.id}`} className="con">
                            <img class="rounded-circle" alt="" style={{ height: "64px", width: "64px", objectFit: "cover", objectPosition: "top" }} src={user.profile.url ? user.profile.url : profile} />
                          <p className="text-black username">{user.username}</p>
                        </NavLink>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Message;

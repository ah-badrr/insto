import { NavLink, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import MessageCard from "../components/MessageCard";
import profile from "../images/profile.png";

const Message = ({ child }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState([]);
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
          <table className="table table-hover m-0" style={{ height: "max-content" }}>
            <tbody>
              <tr>
                <td className="border-0 pt-3" >
                  <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Cari Kontak" className="input mb-1" style={{ width: "100%" }} />
                </td>
              </tr>
              {users.filter((item)=>{
                return search.toString().toLowerCase() == '' ? item : item.username.toString().toLowerCase().includes(search)
              }).map((user) =>
                {
                if (user.id != uid) {
                  return (
                    <tr className="contact p-0 pt-2" style={{ width: "100%" }}>
                      <td className="border-0 " style={{ width: "100%" }}>
                        <NavLink to={`/messages/${uid}/${user.id}`} className="con">
                          <img class="rounded-circle" alt="" style={{ height: "64px", width: "64px", objectFit: "cover", objectPosition: "top" }} src={user != null ? (user.url ? user.url : profile) : profile} />
                          <p className="text-black username">{user.username}</p>
                        </NavLink>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Message;

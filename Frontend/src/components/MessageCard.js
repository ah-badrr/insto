import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import profiled from "../images/profile.png";
import Message from "../pages/Message";
import Layout from "./Layout";
import { faHeart, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MessageCard = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState([]);
  const [user2, setUser2] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState([]);
  const [profileTwo, setProfileTwo] = useState([]);
  const [user1, setUser1] = useState([]);
  const { uid, id } = useParams();

  useEffect(() => {
    getMessages();
    getUsers();
  }, [0]);

  const getUsers = async () => {
    // try {
    const response = await axios.get(`http://localhost:5000/users`);
    setUsers(response.data);
    // } catch (error) {}
  };

  const getMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/messages`);
      const user1 = await axios.get(`http://localhost:5000/users/${uid}`);
      const prof2 = await axios.get(`http://localhost:5000/profiles/user/${id}`);
      const user2 = await axios.get(`http://localhost:5000/users/${id}`);
      setUser2(user2.data);
      if (prof2.data != null) {
        setProfileTwo(prof2.data);
      }
      if (user1.data != null) {
        
        setUser1(user1.data);
      }
      setMessages(response.data);
      // getuser2();
      // getuser1();
      // getProfileTwo();
    } catch (error) {}
  };

  const postMessage = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/messages`, {
        userId: uid,
        toId: id,
        message: message,
      });
      getMessages();
    } catch (error) {}
  };

  const deleteMessage = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/messages/${id}`);
      getMessages();
    } catch (error) {}
  };

  const getMessageById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/messages/${id}`);
      setMessage(response.data.message);
    } catch (error) {}
  };
  const updateMessage = async (id) => {
    // e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/messages/${id}`, {
        message: message,
      });
      getMessages();
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
              {users
                .filter((item) => {
                  return search.toString().toLowerCase() == "" ? item : item.username.toString().toLowerCase().includes(search);
                })
                .map((user) => {
                  if (user.id != uid) {
                    return (
                      <tr className="contact p-0" style={{ width: "100%" }}>
                        <td className="border-0" style={{ width: "100%" }}>
                          <NavLink to={`/messages/${uid}/${user.id}`} className="con">
                            <img class="rounded-circle" alt="" style={{ height: "64px", width: "64px", objectFit: "cover", objectPosition: "top" }} src={user ? (user.url ? user.url : profiled) : profiled} />
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
        <div className="chat col p-0">
          <div className="card border-0 shadow-none rounded-0" style={{ height: "100%" }}>
            <div className="card-header">
              <figure class="image is-48x48">
                <img className="is-rounded" alt="" src={user2 ? (user2.url ? user2.url : profiled) : profiled} style={{ height: "48px", objectFit: "cover", objectPosition: "top" }} />
              </figure>
              <div className="card-header-title">{user2.username}</div>
            </div>
            <div className="card-body is-flex gap-4 is-flex-direction-column" style={{ height: "100px", overflow: "auto" }}>
              {messages.map((m) => {
                if ((m.userId == uid && m.toId == id) || (m.toId == uid && m.userId == id)) {
                  return (
                    <div className={`is-flex is-align-items-end ${m.userId == uid ? "is-flex-direction-row-reverse" : ""} gap-2`}>
                      <figure class="image is-32x32">
                        <img
                          className="is-rounded"
                          alt=""
                          src={m.userId == uid ? (user1.url == null ? profiled : user1.url) : user2.url == null ? profiled : user2.url}
                          style={{ height: "32px", objectFit: "cover", objectPosition: "top" }}
                        />
                      </figure>
                      <div className="mesTog has-background-info py-2 px-5" style={{ width: "max-content", borderRadius: "20px", textWrap: "wrap" }}>
                        {m.message}
                      </div>
                      <div class={`dropdown is-active d-none is-position-absolute ${m.userId == uid ? "dropMes rightc" : ""}`} style={{}}>
                        <div class="dropdown-menu" id="dropdown-menu" role="menu">
                          <div class="dropdown-content">
                            <a href={`#modal${m.id}`} onClick={() => getMessageById(m.id)} className="button border-0 dropdown-item">
                              <button>Edit</button>
                            </a>
                            <button onClick={() => deleteMessage(m.id)} class="dropdown-item ">
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                      <div id={`modal${m.id}`} className="modal mdlChat is-active d-none">
                        <div className="modal-background opacity-50"></div>
                        <div className="box m-auto" style={{ width: "" }}>
                          <form action="#" onSubmit={() => updateMessage(m.id)}>
                            <div className="field">
                              {/* <input value={message} type="text" className="input" /> */}
                              <textarea value={message} onChange={(e) => setMessage(e.target.value)} name="" id="" cols="30" rows="5" className="textarea" />
                            </div>
                            <div className="field is-flex is-justify-content-space-between">
                              <a href="#" className="button is-warning">
                                cancel
                              </a>
                              <button type="submit" className="button is-info">
                                update
                              </button>
                            </div>
                          </form>
                        </div>
                        <a href="#" class="modal-close is-large" aria-label="close"></a>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <div className="card-footer rounded-0 px-2">
              <form onSubmit={postMessage} className="is-flex gap-0" style={{ width: "100%" }}>
                <input onChange={(e) => setMessage(e.target.value)} class="input border-0 rounded-0" type="text" placeholder="Text input" />
                <button type="submit" className="button rounded-0 ">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MessageCard;

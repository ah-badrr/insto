import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import profiled from "../images/profile.png";

const Search = ({ state }) => {
  const { uid } = useParams();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState([]);
  useEffect(() => {
    getUsers();
  }, [0]);
  const getUsers = async () => {
    const response = await axios.get(`http://localhost:5000/users`);
    setUsers(response.data);
  };

  return (
    <div className={`search ${state}`}>
      <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Cari Kontak" className="input mb-1" style={{ width: "100%" }} />
      <div className="list">
        <table className="table table-hover m-0 p-0">
          <tbody className="m-0 p-0">
            {users
              .filter((item) => {
                return search.toString().toLowerCase() == "" ? item : item.username.toString().toLowerCase().includes(search);
              })
              .map((user) => {
                if (user.id != uid) {
                  return (
                    <tr className="p-0 border-0">
                      <td className="border-0">
                        <NavLink to={`/profile/visit/${uid}/${user.id}`} className="con">
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
    </div>
  );
};

export default Search;

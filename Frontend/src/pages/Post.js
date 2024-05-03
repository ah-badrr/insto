import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { NavLink, useNavigate, Link } from "react-router-dom";
const Post = () => {
  const [users, setUser] = useState([]);
  const navigate=useNavigate();
  
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUser(response.data);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="columns mt-5 is-centered">
        <div className="column is-half">
          <Link to={"/add"} className="button is-success">
            Add New
          </Link>
          <table className="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.password}</td>
                  <td>
                    <Link to={`/edit/${user.id}`} className="button is-small is-info">
                      Edit
                    </Link>
                    <button onClick={() => deleteUser(user.id)} className="button is-small is-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Post;

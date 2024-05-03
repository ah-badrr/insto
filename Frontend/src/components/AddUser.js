import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const AddUser = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/users', {
        name,
        password,
      });
      navigate("/post");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="columns mt-5 is-centered">
        <div className="column is-half">
          <form onSubmit={saveUser}>
            <div className="field">
              <label htmlFor="name" className="label">
                Name
              </label>
              <div className="control">
                <input value={name} type="text" className="input" placeholder="Name" onChange={(e) => setName(e.target.value)} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="passwprd" className="label">
                Password
              </label>
              <div className="control">
                <input value={password} type="password" className="input" placeholder="***********" onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
            <div className="field is-flex is-justify-content-space-between">
              <button type="submit" className="button is-success">
                Save
              </button>
              <Link to={"/post"} className="button is-warning">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddUser;

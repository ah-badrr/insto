import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const EditUser = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
    const {id}=useParams();
    
  useEffect(() => {
    getUserById();
  }, []);
    
  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
        name,
        password,
      });
      navigate("/post");
    } catch (error) {
      console.log(error);
    }
  };

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:5000/users/${id}`);
    setName(response.data.name);
    setPassword(response.data.password);
  };
  return (
    <Layout>
      <div className="columns mt-5 is-centered">
        <div className="column is-half">
          <form onSubmit={updateUser}>
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
                Update
              </button>
              <Link to={'/post'} className="button is-warning">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditUser;

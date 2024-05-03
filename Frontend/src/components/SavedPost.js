import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { NavLink, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import profiled from "../images/profile.png";
import { faMessage, faHeart as heart } from "@fortawesome/free-regular-svg-icons";
import { faHeart, faEllipsisVertical, faMessage as meso } from "@fortawesome/free-solid-svg-icons";
import PostCards from "../components/PostCards";
import axios from "axios";
import Save from "./Save";

const SavedPost = ({ likes, comments }) => {
  const [userById, setUserById] = useState([]);
  const [posts, setPosts] = useState([]);
  const [follower, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);
  const [saved, setSaved] = useState([]);
  const [profile, setProfile] = useState([]);
  const { uid } = useParams();

  useEffect(() => {
    // get();
    getSaved();
    getPosts();
    getRelation();
    getUserById();
    getProfile();
    // deletePost();
    // getState();
  }, [0]);

  const getPosts = async () => {
    const response = await axios.get(`http://localhost:5000/posts/user/${uid}`);
    setPosts(response.data);
  };

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:5000/users/${uid}`);
    setUserById(response.data);
  };

  const getSaved = async () => {
    const response = await axios.get(`http://localhost:5000/saves/user/${uid}`);
    setSaved(response.data);
  };

  const getRelation = async () => {
    const response = await axios.get(`http://localhost:5000/relations/follower/${uid}`);
    const res = await axios.get(`http://localhost:5000/relations/followed/${uid}`);
    setFollower(res.data);
    setFollowing(response.data);
  };
  const getProfile = async () => {
    const response = await axios.get(`http://localhost:5000/profiles/user/${uid}`);
    setProfile(response.data);
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/posts/${id}`);
      getPosts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="profile m-0 p-0" style={{ height: "100vh", overflowY: "auto", paddingBottom: "5rem" }}>
        <div className="protop m-0 row gap-1" style={{ width: "100%" }}>
          <div className="col-3 px-0  is-flex proimg">
            <img className="rounded-circle" alt="" src={profile ? (profile.url ? profile.url : profiled) : profiled} style={{ objectFit: "cover", objectPosition: "top" }} />
          </div>
          <div className="col-8 col-sm-7 col-lg-5 is-flex is-flex-direction-column has-align-items-center" style={{ height: "100%" }}>
            <h4 className="h4 mb-4 p-0">
              {userById.username}{" "}
              <NavLink to={`/profile/edit/${uid}`} className="button is-small ml-3">
                Edit Profil
              </NavLink>
            </h4>
            <ul className="prostate is-flex mb-3">
              <li>
                <span className="has-text-weight-bold">{posts.length}</span> post
              </li>
              <li>
                <span className="has-text-weight-bold">{follower.length}</span> pengikut
              </li>
              <li>
                <span className="has-text-weight-bold">{following.length}</span> mengikuti
              </li>
            </ul>
            <p className="text-secondary probio">{profile ? (profile.job ? profile.job : "none") : "none"}</p>
            <p className=" probio">{profile ? (profile.bio ? profile.bio : "none") : "none"}</p>
          </div>
        </div>
        <div className="protom p-0">
          <div className="postpro row m-auto">
            <div class="tabs col-12 is-centered">
              <ul>
                <li className={``}>
                  <NavLink to={`/profile/${uid}`}>Postingan</NavLink>
                </li>
                <li className={`ml-5 is-active`}>
                  <NavLink>Tersimpan</NavLink>
                </li>
              </ul>
            </div>
            <div className="postfl m-0 p-0 row">
              {saved.map((s) => (
                <>
                  <Save id={s.post.id} likes={getPosts} />
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SavedPost;

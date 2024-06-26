import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { NavLink, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import profiled from "../images/profile.png";
import { faMessage, faHeart as heart } from "@fortawesome/free-regular-svg-icons";
import { faHeart, faEllipsisVertical, faMessage as meso } from "@fortawesome/free-solid-svg-icons";
import PostCards from "../components/PostCards";
import axios from "axios";

const Profile = () => {
  const [userById, setUserById] = useState([]);
  const [posts, setPosts] = useState([]);
  const [follower, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);
  const { uid } = useParams();

  useEffect(() => {
    getPosts();
    getUserById();
    getRelation();
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

  const getRelation = async () => {
    const response = await axios.get(`http://localhost:5000/relations/follower/${uid}`);
    const res = await axios.get(`http://localhost:5000/relations/followed/${uid}`);
    setFollower(res.data);
    setFollowing(response.data);
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
        <div className="protop m-0 row gap-0 " style={{ width: "100%" }}>
          <div className="col-3 px-0  is-flex proimg">
            <img className="rounded-circle" alt="" src={userById ? (userById.url ? userById.url : profiled) : profiled} style={{ objectFit: "cover", objectPosition: "top" }} />
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
            <p className="text-secondary probio">{userById ? (userById.job ? userById.job : "none") : "none"}</p>
            <p className=" probio">{userById ? (userById.bio ? userById.bio : "none") : "none"}</p>
          </div>
        </div>
        <div className="protom p-0">
          <div className="postpro row m-auto">
            <div class="tabs col-12 is-centered">
              <ul>
                <li className={`is-active `}>
                  <NavLink>Postingan</NavLink>
                </li>
                <li className={`ml-5`}>
                  <NavLink to={`/profile/saved/${uid}`}>Tersimpan</NavLink>
                </li>
              </ul>
            </div>
            <div className="postfl m-0 p-0 row">
              {posts.map((post, index) => (
                <div key={post.id} className="is-position-relative m-0 p-0" style={{ width: "max-content", height: "max-content" }}>
                  {post.type == "picture" ? (
                    <img className="postsize" src={post.url} style={{ objectFit: "cover", objectPosition: "center" }} alt="" />
                  ) : (
                    <video className="postsize" controls style={{ objectFit: "cover", objectPosition: "center" }}>
                      <source src={post.url} type="video/mp4" />
                    </video>
                  )}
                  <a href={`#modal${post.id}`}>
                    <div className="postcard postsize is-position-absolute top-0 is-flex">
                      <p className="m-auto text-light">
                        <span className="mr-4">
                          <FontAwesomeIcon icon={faHeart} className=""></FontAwesomeIcon> {post.likes.length}
                        </span>
                        <span className="">
                          <FontAwesomeIcon icon={meso} className=""></FontAwesomeIcon> {post.comments.length}
                        </span>
                      </p>
                    </div>
                  </a>
                  <div id={`modal${post.id}`} class={`modal mdlpost is-active d-none`}>
                    <div class="modal-background opacity-50"></div>
                    <PostCards
                      drop={
                        <>
                          <FontAwesomeIcon icon={faEllipsisVertical} className={`dropTog`} style={{ cursor: "pointer" }}></FontAwesomeIcon>
                          <div class="dropdown is-active dropPost d-none is-position-absolute " style={{ right: "0" }}>
                            <div class="dropdown-trigger">
                              <button class="button has-background-light pr-4 border-0" aria-haspopup="true" aria-controls="dropdown-menu">
                                <FontAwesomeIcon icon={faEllipsisVertical} className={``} style={{ cursor: "pointer" }}></FontAwesomeIcon>
                              </button>
                            </div>
                            <div class="dropdown-menu" id="dropdown-menu" role="menu">
                              <div class="dropdown-content">
                                <NavLink to={`/post/${uid}/${post.id}`} className="button border-0 dropdown-item">
                                  <button>Edit</button>
                                </NavLink>
                                <button onClick={() => deletePost(post.id)} class="dropdown-item ">
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      }
                      comments={getPosts}
                      likes={getPosts}
                      image={post.url}
                      user={post.userId}
                      caption={post.caption}
                      id={post.id}
                      type={post.type}
                      createdAt={post.createdAt}
                    ></PostCards>
                    <a href="#" className="modal-close is-large"></a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

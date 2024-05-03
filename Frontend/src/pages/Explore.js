import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import img from "../images/1-2.png";
import Layout from "../components/Layout";
import axios from "axios";
import { faMessage, faHeart as heart } from "@fortawesome/free-regular-svg-icons";
import { faHeart, faEllipsisVertical, faMessage as meso } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useParams } from "react-router-dom";
import PostCards from "../components/PostCards";

const Explore = () => {
  const [posts, setPosts] = useState([]);
  const { uid } = useParams();

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const response = await axios.get("http://localhost:5000/posts");
    setPosts(response.data);
  };
  // const like =

  return (
    <Layout>
      <div className="explore p-0" style={{ height: "100vh", overflowY: "auto" }}>
        <div className="row postpro py-5 m-auto">
          <div className="postfl m-0 p-0 row">
            {posts.map((post, index) => (
              <div key={post.id} className="is-position-relative m-0 p-0" style={{ width: "max-content", height: "max-content" }}>
                {post.type == "picture" ? (
                  <img className="postsize p-0 m-0" src={post.url} style={{ objectFit: "cover", objectPosition: "center" }} alt="" />
                ) : (
                  <video className="postsize p-0 m-0" controls style={{ objectFit: "cover", objectPosition: "center" }}>
                    <source src={post.url} type="video/mp4" />
                  </video>
                )}
                <a href={`#modal${post.id}`}>
                  <div className="postcard postsize p-0 m-0 is-position-absolute top-0 is-flex" style={{}}>
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
                    createdAt={post.createdAt}
                    type={post.type}
                    comments={getPosts}
                    likes={getPosts}
                    image={post.url}
                    user={post.userId}
                    caption={post.caption}
                    id={post.id}
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
                              <NavLink to={`/profile/visit/${uid}/${post.userId}`} className="button border-0 dropdown-item">
                                <button>Tentang akun ini</button>
                              </NavLink>
                              {/* <button class="dropdown-item text-danger fw-semibold">Berhenti mengikuti</button> */}
                            </div>
                          </div>
                        </div>
                      </>
                    }
                  ></PostCards>
                  <a href="#" className="modal-close is-large"></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Explore;

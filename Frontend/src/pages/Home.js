import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import PostCards from "../components/PostCards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faEllipsisVertical, faMessage as meso } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useParams } from "react-router-dom";

const Home = () => {
  // const [userById, setUserById] = useState([]);
  const [posts, setPosts] = useState([]);
  const { uid } = useParams();

  useEffect(() => {
    // getUserById();
    getPosts();
  }, [0]);

  const empty = () => {};

  const getPosts = async () => {
    const response = await axios.get("http://localhost:5000/posts");
    setPosts(response.data);
  };

  // const getUserById = async () => {
  //   const response = await axios.get(`http://localhost:5000/users/${uid}`);
  //   setUserById(response.data);
  // };
  return (
    <Layout>
      <div className="py-5" style={{ overflowY: "auto", height: "100%" }}>
        <div className="is-flex is-flex-direction-column gap-4">
          {posts.map((post) => (
            <PostCards
              createdAt={post.createdAt}
              type={post.type}
              comments={empty}
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
                        <FontAwesomeIcon  icon={faEllipsisVertical} className={``} style={{ cursor: "pointer" }}></FontAwesomeIcon>
                      </button>
                    </div>
                    <div class="dropdown-menu" id="dropdown-menu" role="menu">
                      <div class="dropdown-content">
                        <NavLink to={`/profile/visit/${uid}/${post.userId}`} className="button border-0 dropdown-item">
                          <button>Tentang akun ini</button>
                        </NavLink>
                        {/* <button class="dropdown-item text-danger fw-semibold">
                          Berhenti mengikuti
                        </button> */}
                      </div>
                    </div>
                  </div>
                </>
              }
            ></PostCards>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;

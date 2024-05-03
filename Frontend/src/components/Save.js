import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { faHeart, faEllipsisVertical, faMessage as meso } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PostCards from "./PostCards";

const Save = ({ id, likes }) => {
  const [post, setPost] = useState([]);
  const [like, setLike] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    getPost();
    // deletePost();
    // getState();
  }, [0]);

  const getPost = async () => {
    // try {
    const response = await axios.get(`http://localhost:5000/posts/${id}`);
    setPost(response.data);
    setLike(response.data.likes.length);
    setComment(response.data.comments.length);
    // } catch (error) {}
  };

  return (
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
              <FontAwesomeIcon icon={faHeart} className="mr-1"></FontAwesomeIcon>
              {like}
            </span>
            <span className="">
              <FontAwesomeIcon icon={meso} className=""></FontAwesomeIcon> {comment}
            </span>
          </p>
        </div>
      </a>
      {/* <div id={`modal${post.id}`} class={`modal mdlpost is-active d-none`}>
        <div class="modal-background opacity-50"></div>
        <PostCards
          comments={likes}
          likes={likes}
          image={post.url}
          user={post.userId}
          caption={post.caption}
          id={post.id}
          type={post.type}
          createdAt={post.createdAt}
        ></PostCards>
        <a href="#" className="modal-close is-large"></a>
      </div> */}
    </div>
  );
};

export default Save;

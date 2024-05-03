import React, { useEffect, useState } from "react";
import PostCards from "./PostCards";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const PostDetail = () => {
  const [postc, setPostc] = useState(false);
  const { id } = useParams();
  const [postById, setPostById] = useState([]);

  const active = () => {
    setPostc((postc) => !postc);
  };

  let state = postc ? null : "is-active";
  
  useEffect(() => {
    getPostById();
  }, []);

  const getPostById = async () => {
    const response = await axios.get(`http://localhost:5000/posts/${id}`);
    setPostById(response.data);
  };
  return (
    <div className={`modal ${state}`}>
      <div className="modal-background"></div>
      {postById.id}
      <PostCards id={id} user={postById.userId} caption={postById.caption}></PostCards>
      <Link to={"/explore"} class="modal-close is-large" aria-label="close"></Link>
    </div>
  );
};

export default PostDetail;

/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { GridComponent, ColumnDirective } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as br, faMessage, faHeart as heart } from "@fortawesome/free-regular-svg-icons";
import { faCircle, faBookmark, faHeart, faClose, faMessage as meso, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Moment from "react-moment";
import "moment-timezone";
import moment, { now } from "moment";
import "moment/locale/id";
import EditPost from "./EditPost";
import profiled from "../images/profile.png";
import CommentCard from "./CommentCard";

const PostCards = ({ user, caption, id, createdAt, image, likes, type, comments, drop }) => {
  const [userById, setUserById] = useState([]);
  const [profile, setProfile] = useState([]);
  const [likeCount, setLikeCount] = useState([]);
  const [comment, setComment] = useState([]);
  const [comCard, setComCard] = useState(false);
  const [like, setLike] = useState();
  const [follow, setFollow] = useState();
  const [save, setSave] = useState();
  const navigate = useNavigate();
  const { uid } = useParams();
  const [comm, setComm] = useState("");
  const start = moment().startOf("hour").fromNow();
  const [postc, setPostc] = useState(false);
  const [pro, setPro] = useState([]);

  useEffect(() => {
    likes();
    getUserById();
    getProfile();
    cekSave();
    cekLike();
    cekFollow();
    getComments();
    // getPro();
  }, [0]);

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:5000/users/${user}`);
    setUserById(response.data);
  };

  const getProfile = async () => {
    const response = await axios.get(`http://localhost:5000/profiles/user/${user}`);
    setProfile(response.data);
  };

  const cekLike = async () => {
    const response = await axios.get(`http://localhost:5000/likes/postus/${id}&&${uid}`);
    const res = await axios.get(`http://localhost:5000/likes/post/${id}`);
    likes();
    setLikeCount(res.data);
    if (response.data.length > 0) {
      setLike(() => true);
    } else {
      setLike(() => false);
    }
  };

  const cekSave = async () => {
    const response = await axios.get(`http://localhost:5000/saves/postus/${id}&&${uid}`);
    likes();
    if (response.data.length > 0) {
      setSave(() => true);
    } else {
      setSave(() => false);
    }
  };

  const cekFollow = async () => {
    const response = await axios.get(`http://localhost:5000/relations/ff/${uid}&&${user}`);
    likes();
    if (response.data.length > 0) {
      setFollow(() => true);
    } else {
      setFollow(() => false);
    }
  };

  const liking = async () => {
    const response = await axios.get(`http://localhost:5000/likes/postus/${id}&&${uid}`);
    cekSave();
    cekLike();
    cekFollow();
    if (response.data.length < 1) {
      setLike(() => true);
      try {
        await axios.post(`http://localhost:5000/likes`, {
          postId: id,
          userId: uid,
        });
        cekSave();
        cekLike();
        cekFollow();
      } catch (error) {}
    } else {
      setLike(() => false);
      try {
        await axios.delete(`http://localhost:5000/likes/${id}&&${uid}`);
        cekSave();
        cekLike();
        cekFollow();
      } catch (error) {}
    }
  };

  const saving = async () => {
    const response = await axios.get(`http://localhost:5000/saves/postus/${id}&&${uid}`);
    cekSave();
    cekLike();
    cekFollow();
    if (response.data.length < 1) {
      setSave(() => true);
      try {
        await axios.post(`http://localhost:5000/saves`, {
          postId: id,
          userId: uid,
        });
        cekSave();
        cekLike();
        cekFollow();
      } catch (error) {}
    } else {
      setSave(() => false);
      try {
        await axios.delete(`http://localhost:5000/saves/${id}&&${uid}`);
        cekSave();
        cekLike();
        cekFollow();
      } catch (error) {}
    }
  };

  const following = async () => {
    const response = await axios.get(`http://localhost:5000/relations/ff/${uid}&&${user}`);
    cekSave();
    cekLike();
    cekFollow();
    if (response.data.length < 1) {
      setFollow(() => true);
      try {
        await axios.post(`http://localhost:5000/relations`, {
          userId: uid,
          followed: user,
        });
        cekLike();
        cekFollow();
        cekSave();
      } catch (error) {}
    } else {
      setFollow(() => false);
      try {
        await axios.delete(`http://localhost:5000/relations/${uid}&&${user}`);
        cekLike();
        cekFollow();
        cekSave();
      } catch (error) {}
    }
    likes();
  };

  const getComments = async () => {
    const response = await axios.get(`http://localhost:5000/comments/${id}`);
    setComment(response.data);
  };

  const commentcard = () => {
    setComCard((comCard) => !comCard);
  };

  const saveComment = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("postId", id);
    formData.append("userId", uid);
    formData.append("comment", comm);
    try {
      await axios.post(`http://localhost:5000/comments`, formData);
      setComm(() => null);
      getComments();
      comments();
      // navigate(`/${uid}`);
      // getComments();
    } catch (error) {
      console.log(error);
    }
  };

  let now = moment();

  let cc = comCard ? " is-5" : "is-hidden";
  let cck = comCard ? null : "m-auto";
  let cc2 = comCard ? meso : faMessage;
  let lk = like ? faHeart : heart;
  let fl = follow ? "d-none" : "d-inline-block";
  let sv = save ? faBookmark : br;
  let buat = postc ? " is-active" : null;
  let lks = like ? "text-danger" : null;
  return (
    <>
      <div className="postcar columns gap-0 m-0 p-0 m-auto is-justify-content-center">
        <div className={`${cck} postmain col-12 col-md-7 m-0`}>
          <div class="card shadow rounded-0 border-0 border-end border-1 border-grey">
            <div class="card-header is-flex-direction-column p-0 is-position-relative">
              <div className="card-header-title is-flex is-justify-content-space-between">
                <div className="is-flex gap-2 is-align-items-center">
                  <figure className="image is-32x32">
                    <img src={profile.url ? profile.url : profiled} alt="" className="is-rounded" style={{ height: "32px", objectFit: "cover", objectPosition: "top" }} />
                  </figure>
                  <p>
                    {userById.username} <FontAwesomeIcon className="pb-1 ml-1 text-secondary" style={{ fontSize: "4px" }} icon={faCircle} />{" "}
                  </p>
                  {user == uid ? (
                    ""
                  ) : (
                    <span onClick={following} className={`${fl} p-0 m-0 fw-semibold text-primary`} style={{ fontSize: "14px", cursor: "pointer" }}>
                      Ikuti
                      <FontAwesomeIcon className="pb-1 ml-2 text-secondary" style={{ fontSize: "4px" }} icon={faCircle} />
                    </span>
                  )}
                  <Moment className="ml-0 text-secondary has-text-weight-light is-size-7" fromNow>
                    {createdAt}
                  </Moment>
                </div>
                {drop}
              </div>
              {type == "picture" ? (
                <img src={image} className="image postmedia" alt="Placeholder image" style={{ objectFit: "cover", objectPosition: "center" }} />
              ) : (
                <video className="postmedia" controls style={{ objectFit: "cover", objectPosition: "center" }}>
                  <source src={image} type="video/mp4" />
                </video>
              )}
            </div>
            <div class="card-body">
              <div className="h3">
                <FontAwesomeIcon onClick={liking} icon={lk} className={`${lks} mr-4`} style={{ cursor: "pointer" }}></FontAwesomeIcon>
                <FontAwesomeIcon onClick={commentcard} icon={cc2} style={{ cursor: "pointer" }}></FontAwesomeIcon>
                <FontAwesomeIcon onClick={saving} icon={sv} className="ml-4" style={{ cursor: "pointer" }}></FontAwesomeIcon>
                <p className="is-size-7 mt-2 fw-bold">{Object.keys(likeCount).length} suka</p>
              </div>
              <strong className="mr-2">{userById.username}</strong>
              <span>{caption}</span>
            </div>
          </div>
        </div>
        <div className={`${cc} col-12 col-md-4 m-0`}>
          <div className="postcom card shadow border-0 rounded-0" style={{ height: "100%" }}>
            <div className="card-header p-1 rounded-0">
              <div className="card-header-title is-flex is-justify-content-space-between">
                <p>Komentar</p>
                <FontAwesomeIcon icon={faClose} onClick={commentcard} type="button"></FontAwesomeIcon>
              </div>
            </div>
            <div className="card-body" style={{ height: "150px", overflow: "auto" }}>
              <ul>
                {comment.map((c) => (
                  <CommentCard username={c.user.username} id={c.userId} created={c.createdAt} comment={c.comment} />
                ))}
              </ul>
            </div>
            <div className="card-footer border-top border-1 rounded-0 p-2">
              <form onSubmit={saveComment} className="is-flex gap-0" style={{ width: "100%" }}>
                <input class="input inputku rounded-0 border-0" onChange={(e) => setComm(e.target.value)} type="text" placeholder="Tambahkan komentar" />
                <button type="submit" className="button rounded-0">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCards;

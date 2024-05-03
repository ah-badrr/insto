import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faClose, faShare } from "@fortawesome/free-solid-svg-icons";
import profiled from "../images/profile.png";
import Profile from "../pages/Profile";

const AddPost = ({ state, btn, cancel, share }) => {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState("");
  const [profile, setProfile] = useState([]);
  const [userById, setUserById] = useState([]);
  const { uid } = useParams();
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getUserById();
    getProfile();
  }, [0]);

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const getUserById = async () => {
    const res = await axios.get(`http://localhost:5000/users/${uid}`);
    setUserById(res.data);
  };
  const getProfile = async () => {
    const res = await axios.get(`http://localhost:5000/profiles/user/${uid}`);
    setProfile(res.data);
  };
  const savePost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", uid);
    formData.append("caption", caption);
    try {
      await axios.post(`http://localhost:5000/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate(`/profile/${uid}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Profile></Profile>
      <div className={`mdlpost modal is-active`}>
        <div className="modal-background"></div>
        <form className="p-5" onSubmit={savePost} style={{ width: "100%" }}>
          <div className="addpost card m-auto">
            <div className="card-header p-0">
              <div className="card-header-title is-flex is-justify-content-space-between">
                <NavLink className="text-black fw-normal" to={`/profile/${uid}`} type="button" style={{ cursor: "pointer" }}>
                  <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
                </NavLink>
                <p>
                  Buat <span className="is-hidden-mobile">Postingan Baru</span>
                </p>
                <button type="submit">
                  <FontAwesomeIcon icon={faShare}></FontAwesomeIcon>
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="columns">
                <div className="column border rounded border-2 p-0 pb-2 gap-2 is-flex is-flex-direction-column is-justify-content-end">
                  {preview ? (
                    //   <figure className="image is-128x128 mb-5">
                    <img src={preview} alt="preview-img" style={{ maxHeight: "70vh", objectFit: "cover" }} />
                  ) : (
                    //   </figure>
                    ""
                  )}
                  <div class="file is-centered">
                    <label class="file-label">
                      <input id="files" class="file-input" type="file" name="file" onChange={loadImage} />
                      <span class="file-cta">
                        <span class="file-icon">
                          <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
                        </span>
                        <span class="file-label"> Choose a file… </span>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="column is-5">
                  <div className="is-flex gap-2 is-align-items-center">
                    <figure class="image is-32x32">
                      <img className="is-rounded" alt="" src={userById ? (userById.url ? userById.url : profiled) : profiled} style={{ height: "32px", objectFit: "cover", objectPosition: "top" }} />
                    </figure>
                    <p>{userById.username}</p>
                  </div>
                  <div className="field">
                    <div className="control">
                      <textarea onChange={(e) => setCaption(e.target.value)} className="textarea border-0 mt-3 p-2" name="caption" id="" cols="30" placeholder="Tulis caption" rows="5"></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <NavLink to={`/profile/${uid}`}>
          <button class="modal-close is-large" aria-label="close"></button>
        </NavLink>
      </div>
    </>
  );
};

export default AddPost;

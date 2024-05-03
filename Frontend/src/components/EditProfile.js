import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import profiled from "../images/profile.png"

const EditProfile = () => {
  const [bio, setBio] = useState("");
  const [job, setJob] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const { uid } = useParams();
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
    getUserById();
  }, []);

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", uid);
    formData.append("bio", bio);
    formData.append("job", job);
    try {
      await axios.patch(`http://localhost:5000/profiles/${uid}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await axios.patch(`http://localhost:5000/users/${uid}`, {
        username: name,
      });
      navigate(`/profile/${uid}`);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:5000/users/${uid}`);
    setName(response.data.username);
  };
  const getProfile = async () => {
    const response = await axios.get(`http://localhost:5000/profiles/user/${uid}`);
    setBio(response.data.bio);
    setJob(response.data.job);
    setPreview(response.data.url);
  };
  return (
    <Layout>
      <div className="editpro">
        <h1 className="h4">Edit Profil</h1>
        <form onSubmit={updateProfile}>
          <div className="editimg field has-background-grey-lighter is-align-items-center rounded-4" >
            {/* <figure class="image is-128x128"> */}
              <img alt="" class="" src={preview ? preview : profiled} style={{ objectFit: "cover", objectPosition: "center" }} />
            {/* </figure> */}
            <div class="file">
              <label class="file-label">
                <input id="files" class="file-input" type="file" name="file" onChange={loadImage} />
                <span class="file-cta">
                  <span class="file-icon">
                    <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
                  </span>
                  <span class="file-label"> Ubah foto </span>
                </span>
              </label>
            </div>
          </div>
          <div className="field mt-5 pt-5">
            <label htmlFor="name" className="label">
              Username
            </label>
            <input value={name} onChange={(e) => setName(e.target.value)} id="name" type="text" className="input" />
          </div>
          <div className="field">
            <label htmlFor="job" className="label">
              Pekerjaan
            </label>
            <input value={job} onChange={(e) => setJob(e.target.value)} id="job" type="text" className="input" />
          </div>
          <div className="field">
            <label htmlFor="bio" className="label">
              Bio
            </label>
            <input value={bio} onChange={(e) => setBio(e.target.value)} id="bio" type="text" className="input" />
          </div>
          <div className="field mt-5 pt-5 is-flex is-justify-content-space-between" >
            <NavLink to={`/profile/${uid}`} type="button" className="button is-outlined is-danger " >
              Cancel
            </NavLink>
            <button type="submit" className="button is-primary is-outlined " >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditProfile;

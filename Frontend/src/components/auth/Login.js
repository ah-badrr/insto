import React, { useEffect, useState } from "react";
import "bulma/css/bulma.min.css";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../images/mount.jpg";
import axios from "axios";
import md5 from "md5";

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try
    {
      const res = await axios.get(`http://localhost:5000/users/login/${username}&&${md5(password)}`);
      if (res.data.Login) {
        navigate(`/profile/${res.data.Data.id}`);
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div
              className="col-12 col-sm-12 col-md-4 col-lg-3"
            >
              <div className="box rounded-0 p-0 has-background-light" style={{ height: "100%" }}>
                <img className="is-rounded" src={logo} alt="logo-petik" style={{ height: "100%", objectFit: "cover", objectPosition: "right" }} />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-7 col-lg-5">
              <form className="box rounded-0 p-5 has-background-grey has-text-light" onSubmit={login}>
                <div className="field gap-2 has-text-centered">
                  {/* <NavLink to={"/"}> */}
                  {/* <figure className="image is-128x128 mx-auto mb-3">
                    <img className="is-rounded" src={logo} alt="logo-petik" width={100} />
                  </figure> */}
                  {/* </NavLink> */}
                  <h3 className="title has-text-light">Login</h3>
                </div>
                <div className="field">
                  <label className="label text-light" htmlFor="username">
                    Username
                  </label>
                  <input id="username" type="text" onChange={(e) => setUsername(e.target.value)} className="input rounded-0" placeholder="Masukkan username" />
                </div>
                <div className="field mb-5">
                  <label className="label text-light" htmlFor="password">
                    Password
                  </label>
                  <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} className="input rounded-0" placeholder="****************" />
                </div>
                <div className="field pt-5">
                  <button type="submit" className="button has-text-light rounded-0 is-info is-fullwidth">
                    Login
                  </button>
                </div>
                <div className="field">
                  <p>
                    Belum punya akun?{" "}
                    <NavLink className="has-text-info" to={"/register"}>
                      Daftar
                    </NavLink>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

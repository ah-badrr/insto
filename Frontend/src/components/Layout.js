import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="p-0 m-0" style={{ overflow: "hidden" }}>
      <React.Fragment>
        <div className="row p-0 m-0" style={{ overflow: "hidden" }}>
          <div className="navout col-0 col-md-2 p-0 m-0 " style={{ overflow: "hidden" }}>
            <Navbar></Navbar>
          </div>
          <div className="col m-0 has-background-light p-0">
            <main className="p-0" style={{ height: "100vh" }}>
              {children}
            </main>
          </div>
        </div>
      </React.Fragment>
    </div>
  );
};

export default Layout;

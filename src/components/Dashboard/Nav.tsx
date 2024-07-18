import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Nav: React.FC = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4 navbar-test">
        <div className="d-flex align-items-center">
          <i
            className="fas fa-align-left primary-text fs-4 me-3"
            id="menu-toggle"
          ></i>
          <h2 className="fs-2 m-0 h2-custom">AlexStore Gestor</h2>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </nav>
    </>
  );
};

export default Nav;

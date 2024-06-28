// LoginPage.tsx
import React from "react";
import "../components/Styles/LoginPage.css";

const LoginPage: React.FC = () => {
  return (
    <>
      <div className="container">
        <div className="content">
          <h2 className="logo">
            <i className="bx bxl-firebase"></i>Bienvenido! a<br />
            <br />
            AlexStore
          </h2>
          <div className="text-sci">
            <h2>
              Inicia Sesión con nosotros
              <br />
            </h2>
            <p>
              Encuentra los mejores productos y ofertas <br />
              del mercado y desde tu casa.
            </p>
            <div className="social-icons">
              <a href="#">
                <i className="bx bxl-linkedin"></i>
              </a>
              <a href="https://www.facebook.com/alexis.talavera.503?locale=es_LA">
                <i className="bx bxl-facebook"></i>
              </a>
              <a href="#">
                <i className="bx bxl-github"></i>
              </a>
              <a href="#">
                <i className="bx bxl-instagram"></i>
              </a>
              <a href="#">
                <i className="bx bxl-twitter"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="logreg-box">
          <div className="form-box login">
            <form action="#">
              {/* Resto del contenido del formulario y componentes */}
            </form>
          </div>
          <div className="form-box register">
            <form action="#">
              {/* Resto del contenido del formulario y componentes */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

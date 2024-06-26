import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="footer mt-auto py-3 text-white footer-custom">
      <div className="container">
        <span className="text-white">
          2024 AlexStore. Todos los derechos reservados.
        </span>

        <p>
          Puedes encontrarme en Facebook
          <a href="https://www.facebook.com/alexis.talavera.503?locale=es_LA">
            {" "}
            Click Aqui
          </a>
        </p>
        <p>
          Puedes encontrarme en Github
          <a href="https://www.facebook.com/alexis.talavera.503?locale=es_LA">
            {" "}
            Click Aqui
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

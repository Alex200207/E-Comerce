import React from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import "bootstrap/dist/css/bootstrap.min.css"

const FormContainer = () => {
  return (
    <div>
      <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
        <li className="nav-item" role="presentation">
          <a className="nav-link active" id="tab-login" data-mdb-pill-init href="#pills-login" role="tab"
            aria-controls="pills-login" aria-selected="true">Login</a>
        </li>
        <li className="nav-item" role="presentation">
          <a className="nav-link" id="tab-register" data-mdb-pill-init href="#pills-register" role="tab"
            aria-controls="pills-register" aria-selected="false">Register</a>
        </li>
      </ul>

      <div className="tab-content">
        <LoginForm />
        <RegisterForm />
      </div>
    </div>
  );
};

export default FormContainer;

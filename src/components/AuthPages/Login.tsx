import AuthLayout from '../../layout/AuthLayout.tsx';


import React, { useState } from 'react';
import { useAuth } from '../../utils/AuthProvider.tsx';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Estados para el login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = () => {
    if (!email) {
      setEmailError('El correo es requerido');
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Formato de correo erróneo');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError('La contraseña es requerida');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateEmail() && validatePassword()) {
      login({ email, password }).then(() => navigate('/home'));
    }
  };

  return (
    <AuthLayout>
      <div className="card col-xl-9 col-xxl-8 mx-auto rounded-4 overflow-hidden">
        <div className="row g-4">
          <div className="col-lg-6 d-flex align-items-center">
            <div className="card-body">
             
              <h4 className="fw-bold">Bienvenido </h4>
              <p className="mb-0">Ingrese los datos de su cuenta</p>

              {emailError ? <div className="alert alert-danger">{emailError}</div> : <></>}

              {passwordError ? <div className="alert alert-danger">{passwordError}</div> : <></>}

              <div className="form-body mt-4">
                <form onSubmit={handleSubmit} className="row g-3">
                  <div className="col-12">
                    <label htmlFor="inputEmailAddress" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmailAddress"
                      placeholder="user@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="inputChoosePassword" className="form-label">
                      Clave
                    </label>
                    <div className="input-group" id="show_hide_password">
                      <input
                        type="password"
                        className="form-control border-end-0"
                        id="inputChoosePassword"
                        value={password}
                        onBlur={validatePassword}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                      />
                      <a href="#" className="input-group-text bg-transparent">
                        <i className="bi bi-eye-slash-fill"></i>
                      </a>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary">
                        Acceder
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-6 d-lg-flex d-none">
            <div className="p-3 rounded-4 w-100 d-flex align-items-center justify-content-center bg-light">
          
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AuthLayout from "../../layout/AuthLayout.tsx";
import { useAuth } from "../../utils/AuthProvider.tsx";
import "../Style/login.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Estados para el login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = () => {
    if (!email) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El correo es requerido',
      });
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Formato de correo erróneo',
      });
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (!password) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La contraseña es requerida',
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateEmail() && validatePassword()) {
      try {
        await login({ email, password });
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Ingreso exitoso. Redirigiendo...',
          showConfirmButton:false,
          timer:1500,
        }).then(() => {
          navigate("/home");
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Correo electrónico o contraseña incorrectos',
        });
      }
    }
  };

  return (
    <AuthLayout>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <div className="BackgroundBanner"></div>
        <div className="card-main col-xl-5 col-xxl-4 mx-auto overflow-hidden">
          <div className="card-main__contendor">
            <div className="col-lg-6 d-flex align-items-center">
              <div className="card-body">
                <div className="titles">
                  <h4 className="fw-bold">Bienvenido a AlexStore</h4>
                  <p className="mb-0">Ingrese tus datos</p>
                </div>

                <div className="form-body">
                  <form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-12 form-body__div">
                      <input
                        type="email"
                        className="form-controler"
                        id="inputEmailAddress"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={validateEmail}
                      />
                    </div>
                    <div className="col-12">
                      <div className="form-body__div">
                        <input
                          type="password"
                          className="form-controler"
                          id="inputChoosePassword"
                          value={password}
                          onBlur={validatePassword}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Contraseña"
                        />
                      </div>
                    </div>
                    <div className="remember-forgot">
                      <label>
                        <input type="checkbox" className="remember__checkbox"/> Recordarme
                      </label>
                      <label>
                        <a href="#">¿Olvidaste tu cuenta?</a>
                      </label>
                    </div>

                    <div className="contain-buttons">
                      <div className="contain-button__div">
                        <button type="submit" className="btn-log">
                          Acceder
                        </button>
                      </div>
                      <div className="register">
                        <label>No tienes cuenta? <Link to='/register'>Registrarse</Link></label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;

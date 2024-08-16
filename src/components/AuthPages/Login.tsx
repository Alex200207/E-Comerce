import AuthLayout from "../../layout/AuthLayout.tsx";
import React, { useState } from "react";
import { useAuth } from "../../utils/AuthProvider.tsx";
import { Link, useNavigate } from "react-router-dom";
import "../Style/login.css";
import Swal from "sweetalert2";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Estados para el login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const validateEmail = () => {
    if (!email) {
      setEmailError("El correo es requerido");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El correo es requerido",
      });
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Formato de correo erróneo");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Formato de correo erróneo",
      });
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("La contraseña es requerida");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La contraseña es requerida",
      });
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGeneralError(""); // Reinicia el mensaje de error general al intentar enviar el formulario

    if (validateEmail() && validatePassword()) {
      try {
        await login({ email, password });
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Inicio de sesión exitoso",
        }).then(() => {
          navigate("/home");
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Correo electrónico o contraseña incorrectos",
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

                {emailError && (
                  <div className="alert alert-danger">{emailError}</div>
                )}

                {passwordError && (
                  <div className="alert alert-danger">{passwordError}</div>
                )}

                {generalError && (
                  <div className="alert alert-danger">{generalError}</div>
                )}

                <div className="form-body">
                  <form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-12 form-body__div">
                      <input
                        type="email"
                        className="form-controler"
                        id="inputEmailAddress"
                        placeholder="Username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                          placeholder="Enter Password"
                        />
                      </div>
                    </div>
                    <div className="remember-forgot">
                      <label>
                        <input type="checkbox" className="remember__checkbox"/> Recordarme
                      </label>
                      <label>
                        <a href="#">Haz olvidado tu cuenta?</a>
                      </label>
                    </div>

                    <div className="contain-buttons">
                      <div className="contain-button__div">
                        <button type="submit" className="btn-log">
                          Acceder
                        </button>
                      </div>
                      <div className="register">
                      <label>¿No tienes cuenta?</label>
                      <Link to="/Register">Registrarse</Link>
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

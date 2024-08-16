import AuthLayout from "../../layout/AuthLayout.tsx";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../Style/login.css";

const Register = () => {
  const navigate = useNavigate();

  // States for registration
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateFields = () => {
    let isValid = true;

    if (!name) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El nombre es requerido',
      });
      isValid = false;
    }
    if (!email) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El correo es requerido',
      });
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Formato de correo erróneo',
      });
      isValid = false;
    }

    if (!password) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La contraseña es requerida',
      });
      isValid = false;
    }
    if (!confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La confirmación de la contraseña es requerida',
      });
      isValid = false;
    } else if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas no coinciden',
      });
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateFields()) {
      try {
        const response = await fetch("http://localhost:3000/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });

        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Registrado',
            text: 'Registro exitoso. Redirigiendo al inicio de sesión...',
          }).then(() => {
            navigate("/login");
          });
        } else {
          const responseData = await response.json();
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: responseData.message || 'Error al registrar el usuario',
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error en la conexión con el servidor',
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
                  <h4 className="fw-bold">Registrarse en AlexStore</h4>
                  <p className="mb-0">Ingrese tus datos</p>
                </div>

                <div className="form-body">
                  <form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-12 form-body__div">
                      <input
                        type="text"
                        className="form-controler"
                        placeholder="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="col-12 form-body__div">
                      <input
                        type="email"
                        className="form-controler"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="col-12">
                      <div className="form-body__div">
                        <input
                          type="password"
                          className="form-controler"
                          placeholder="Contraseña"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          autoComplete="new-password"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-body__div">
                        <input
                          type="password"
                          className="form-controler"
                          placeholder="Confirmar Contraseña"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          autoComplete="new-password"
                        />
                      </div>
                    </div>
                    <div className="contain-buttons">
                      <div className="contain-button__div">
                        <button type="submit" className="btn-log">
                          Registrarse
                        </button>
                      </div>
                      <div className="register">
                        <label>
                          ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
                        </label>
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

export default Register;

import React, { useState } from "react";
import "../Style/LoginForm.css";
import { FaUser, FaLock } from "react-icons/fa";

interface Usuario {
  nombre_usuario: string;
  email: string;
  Clave: string;
  confirmarClave: string;
}

const RegisterForm: React.FC = () => {
  const initialState: Usuario = {
    nombre_usuario: "",
    email: "",
    Clave: "",
    confirmarClave: "",
  };

  const [usuario, setUsuario] = useState<Usuario>(initialState);
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [loading, setLoading] = useState(false); // Estado para controlar el loading que agregue

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { nombre_usuario, email, Clave, confirmarClave } = usuario;

    if (Clave !== confirmarClave) {
      alert("Las contraseñas no coinciden");
      return;
    }

    setLoading(true); // Mostrarmos el loading

    try {
      const response = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre_usuario, email, Clave }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Usuario registrado:", data);
        setRegistroExitoso(true);
        setUsuario(initialState); // limpiar formuario
      } else {
        console.error("Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    } finally {
      setLoading(false); // oculta el loading
    }
  };

  return (
    <div className={`wrapper ${loading ? "blur" : ""}`}>
      {loading && (
        <div className="loading-overlay">
          <div className="loader"></div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <h1>Registro</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Nombre de Usuario"
            name="nombre_usuario"
            value={usuario.nombre_usuario}
            onChange={handleChange}
            required
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type="email"
            placeholder="Correo"
            name="email"
            value={usuario.email}
            onChange={handleChange}
            required
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Contraseña"
            name="Clave"
            value={usuario.Clave}
            onChange={handleChange}
            required
          />
          <FaLock className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Confirmar Contraseña"
            name="confirmarClave"
            value={usuario.confirmarClave}
            onChange={handleChange}
            required
          />
          <FaLock className="icon" />
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox" />
            Recordarme
          </label>
        </div>
        <button type="submit">Registrarse</button>

        {registroExitoso && (
          <div className="success-message">
            <p className="title__me">¡Cuenta creada con éxito!</p>
          </div>
        )}

        <div className="register-link">
          <p>
            ¿Ya tienes una cuenta? <a href="#">Iniciar sesión</a>{" "}
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;

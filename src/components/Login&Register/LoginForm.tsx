import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Aquí iría la lógica de autenticación (simulada en este ejemplo)
    if (username === 'admin' && password === 'password') {
      // Login exitoso
      alert('Login exitoso!');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
      <form onSubmit={handleLogin}>
        <div className="text-center mb-3">
          <p>Sign in with:</p>
          {/* Botones de redes sociales */}
        </div>

        <p className="text-center">or:</p>

        {/* Inputs de usuario y contraseña */}
        
        {/* Checkbox de recordar contraseña y link de olvidó contraseña */}

        {/* Botón de inicio de sesión */}

        <div className="text-center">
          <p>Not a member? <a href="#!">Register</a></p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

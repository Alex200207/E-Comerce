import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
const RegisterForm = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    // Aquí iría la lógica de registro (simulada en este ejemplo)
    if (password !== repeatPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (!agreedToTerms) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }

    // Registro exitoso (simulado)
    alert('Registro exitoso!');
  };

  return (
    <div className="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
      <form onSubmit={handleRegister}>
        <div className="text-center mb-3">
          <p>Sign up with:</p>
          {/* Botones de redes sociales */}
        </div>

        <p className="text-center">or:</p>

        {/* Inputs de nombre, usuario, email, contraseñas */}

        {/* Checkbox de términos y condiciones */}
        
        {/* Botón de registro */}

        {/* Link para iniciar sesión si ya se tiene cuenta */}
      </form>
    </div>
  );
};

export default RegisterForm;

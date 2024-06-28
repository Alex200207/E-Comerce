import '../Style/LoginForm.css'
import { FaUser,FaLock} from "react-icons/fa";

function RegisterForm() {
  return (
    <div className='wrapper'>
        <form action=''>
            <h1>Login</h1>
            <div className='input-box'>
                <input type="email" placeholder='Correo' required/><FaUser className='icon'/>
            </div>
            <div className='input-box'>
                <input type="text" placeholder='Usuario' required/><FaUser className='icon'/>
            </div>
            <div className='input-box'>
                <input type="password" placeholder='Password' required /><FaLock className='icon' />
            </div>
            <div className='remember-forgot'>
                <label><input type="checkbox" />Recordarme</label>
            </div>
            <button type='submit'>Registrarse</button>

            <div className="register-link">
                <p>Ya tienes una cuenta? <a href="#">Iniciar</a> </p>
            </div>
        </form>
    </div>
  )
}

export default RegisterForm
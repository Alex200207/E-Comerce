import '../Style/LoginForm.css'
import { FaUser,FaLock} from "react-icons/fa";

function LoginForm() {
  return (
    <div className='wrapper'>
        <form action=''>
            <h1>Login</h1>
            <div className='input-box'>
                <input type="text" placeholder='Username' required/><FaUser className='icon'/>
            </div>
            <div className='input-box'>
                <input type="password" placeholder='Password' required /><FaLock className='icon' />
            </div>
            <div className='remember-forgot'>
                <label><input type="checkbox" />Recordarme</label>
                <a href="#">Haz olvidado la clave?</a>
            </div>
            <button type='submit'>Iniciar</button>

            <div className="register-link">
                <p>No tienes una cuenta? <a href="#">Registrarse</a> </p>
            </div>
        </form>
    </div>
  )
}

export default LoginForm
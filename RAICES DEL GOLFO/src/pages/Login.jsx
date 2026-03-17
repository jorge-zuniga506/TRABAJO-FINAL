import LoginForm from "../components/LOGIN/Inicioseccion";
import { Link } from "react-router-dom";
import "../styles/Auth.css";

 function Login() {
  return (
    <div className="container">
      <div className="card">

        <div className="logo">⚛</div>

        <h2>Sign In</h2>

        <LoginForm />

        <p className="toggle">
          ¿No tienes cuenta?
          <Link to="/registro"> Registrarse</Link>
        </p>

      </div>
    </div>
  );
}
export default Login;
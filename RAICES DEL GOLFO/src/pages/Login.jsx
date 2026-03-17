import Inicioseccion from "../components/LOGIN/Inicioseccion";
import { Link } from "react-router-dom";
import "../styles/Auth.css";

function Login() {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <Inicioseccion />
        <div className="auth-info-container">
          <h1>RAICES DEL GOLFO</h1>
          <p>Descubre la belleza del Golfo de Nicoya. Un paraíso natural te espera.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;

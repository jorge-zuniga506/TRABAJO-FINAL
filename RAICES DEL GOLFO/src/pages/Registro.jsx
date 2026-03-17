import RegisterForm from "../components/REGISTRO/RegistroForm";
import { Link } from "react-router-dom";
import "../styles/Auth.css";

 function Registro() {
  return (
    <div className="container">
      <div className="card">

        <div className="logo">⚛</div>

        <h2>Sign Up</h2>

        <RegisterForm />

        <p className="toggle">
          ¿Ya tienes cuenta?
          <Link to="/"> Iniciar sesión</Link>
        </p>

      </div>
    </div>
  );
}
export default Registro;
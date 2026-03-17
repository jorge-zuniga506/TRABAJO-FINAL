import RegisterForm from "../components/REGISTRO/RegistroForm";
import { Link } from "react-router-dom";
import "../styles/Auth.css";

 function Registro() {
  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="logo">Velocity</div>
      </div>
      <div className="auth-right">
        <h2>Register</h2>
        <RegisterForm />
        <p className="toggle">
          Already have an account?
          <Link to="/"> Login here</Link>
        </p>
      </div>
    </div>
  );
}
export default Registro;
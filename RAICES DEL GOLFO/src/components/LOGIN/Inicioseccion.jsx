import { useState } from "react";
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await loginUser(form.email, form.password);

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/restaurante");
    } else {
      alert("Datos incorrectos");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input name="email" placeholder="Correo" onChange={handleChange} />

      <div className="password-box">
        <input
          type={show ? "text" : "password"}
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
        />
        <span onClick={() => setShow(!show)}>
          {show ? "🙈" : "👁️"}
        </span>
      </div>

      <button>Entrar</button>
    </form>
  );
}
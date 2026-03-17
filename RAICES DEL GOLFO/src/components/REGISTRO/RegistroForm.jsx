import { useState } from "react";
import { registerUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await registerUser(form);

    alert("Registrado correctamente");
    navigate("/");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input name="name" placeholder="Nombre" onChange={handleChange} />
      <input name="email" placeholder="Correo" onChange={handleChange} />
      <input name="password" placeholder="Contraseña" onChange={handleChange} />

      <button>Registrarse</button>
    </form>
  );
}
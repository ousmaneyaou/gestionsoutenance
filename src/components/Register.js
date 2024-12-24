import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      // Vérifie si un utilisateur avec le même email ou username existe
      const response = await axios.get("http://localhost:4000/users", {
        params: { username, email },
      });

      if (response.data.length > 0) {
        alert("Un utilisateur avec ce nom d'utilisateur ou email existe déjà.");
        return;
      }

      // Ajout de l'utilisateur dans la base de données
      await axios.post("http://localhost:4000/users", {
        username,
        email,
        password,
      });

      alert("Inscription réussie !");
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1>gestion des soutenances</h1>
        <h2>Créer un compte</h2>
        <p>Inscrivez-vous pour accéder à la plateforme</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Nom d'utilisateur"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmer le mot de passe"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">S'inscrire</button>
        </form>
        <p>
          Déjà un compte ? <a href="/login">Connectez-vous</a>
        </p>
      </div>
    </div>
  );
};

export default Register;

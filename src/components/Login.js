// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../css/Login.css";

// const Login = () => {
//   const [credentials, setCredentials] = useState({
//     username: "",
//     password: "",
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials({ ...credentials, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (
//       credentials.username === "admin" &&
//       credentials.password === "admin123"
//     ) {
//       alert("Connexion réussie!");
//       navigate("/dashboard");
//     } else {
//       alert("Identifiants incorrects");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h2>Bienvenue</h2>
//         <p>Connectez-vous pour accéder à votre tableau de bord</p>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="username"
//             placeholder="Nom d'utilisateur"
//             value={credentials.username}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Mot de passe"
//             value={credentials.password}
//             onChange={handleChange}
//             required
//           />
//           <button type="submit">Se connecter</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("http://localhost:4000/users", {
        params: {
          email: credentials.email,
          password: credentials.password,
        },
      });

      if (response.data.length > 0) {
        alert("Connexion réussie !");
        navigate("/dashboard");
      } else {
        alert("Identifiants incorrects.");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Bienvenue</h2>
        <p>Connectez-vous pour accéder à votre tableau de bord</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Email..."
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

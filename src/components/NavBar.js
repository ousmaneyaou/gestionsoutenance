import React from "react";
import { Link } from "react-router-dom";
import "../css/NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <h1>Gestion des Soutenances</h1>
      <ul className="nav-links">
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/students">Étudiants</Link>
        </li>
        <li>
          <Link to="/defense">Soutenances</Link>
        </li>
        <li>
          <Link to="/certificates">Attestations</Link>
        </li>
        <li>
          <Link to="/">Déconnexion</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

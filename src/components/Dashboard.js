import React from "react";
import { Link } from "react-router-dom";
import "../css/Dashboard.css";
import centreIndien from "../image/CI.jpg";
import uam from "../image/uam.jpg";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Menu de navigation */}
      <nav className="menu-container">
        <h3>Menu Général</h3>
        {/* Section image */}
        <div className="image-container">
          <img src={centreIndien} alt="Centre Indien" />
          <img src={uam} alt="Centre Indien" />
        </div>
        <ul>
          <li>
            <Link to="/students">Étudiants</Link>
          </li>
          <li>
            <Link to="/defense">Soutenances</Link>
          </li>
          <li>
            <Link to="/mentors">Encadreurs</Link>
          </li>
          <li>
            <Link to="/credits">Crédits</Link>
          </li>
          <li>
            <Link to="/gestionjury">Présidents</Link>
          </li>
          <li>
            <Link to="/assesseur">Assesseurs</Link>
          </li>
          <li>
            <Link to="/filiere">Autres</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;

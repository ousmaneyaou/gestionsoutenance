import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/StudentForm.css";

const StudentForm = ({ onAddStudent, onClose }) => {
  const navigate = useNavigate();
  const [newStudent, setNewStudent] = useState({
    matricule: "",
    nom: "",
    datedeNaissance: "",
    nationalite: "",
    encadreur: "",
    filiere: "",
    niveau: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({
      ...newStudent,
      [name]: value,
    });
  };

  const handleAddStudent = async () => {
    if (!newStudent.nom || !newStudent.encadreur) {
      // Validation pour nom et encadreur
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      await axios.post("http://localhost:4000/etudiants", newStudent);
      alert("Étudiant ajouté avec succès !");

      // Appeler le callback uniquement s'il est défini
      if (typeof onAddStudent === "function") {
        onAddStudent(newStudent); // Passer les données de l'étudiant ajouté si nécessaire
      }

      // Réinitialiser le formulaire
      setNewStudent({
        matricule: "",
        nom: "",
        datedeNaissance: "",
        nationalite: "",
        encadreur: "",
        filiere: "",
        niveau: "",
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'étudiant :", error);
      alert("Une erreur s'est produite lors de l'ajout de l'étudiant.");
    }
  };

  const handleClose = () => {
    navigate("/dashboard"); // Redirige vers le tableau de bord
  };

  return (
    <div className="student-form">
      <h2>Ajouter un Étudiant</h2>

      <div className="form-container">
        <div className="left-column">
          <input
            type="text"
            name="matricule"
            placeholder="Matricule"
            value={newStudent.matricule}
            onChange={handleChange}
          />
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={newStudent.nom}
            onChange={handleChange}
          />
          <input
            type="date"
            name="datedeNaissance"
            placeholder="Date de Naissance"
            value={newStudent.datedeNaissance}
            onChange={handleChange}
          />
          <input
            type="text"
            name="nationalite"
            placeholder="Nationalité"
            value={newStudent.nationalite}
            onChange={handleChange}
          />
        </div>

        <div className="right-column">
          <input
            type="text"
            name="encadreur"
            placeholder="Encadreur"
            value={newStudent.encadreur}
            onChange={handleChange}
          />
          <input
            type="text"
            name="filiere"
            placeholder="Filière"
            value={newStudent.filiere}
            onChange={handleChange}
          />
          <input
            type="text"
            name="niveau"
            placeholder="Niveau"
            value={newStudent.niveau}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="buttons">
        <button onClick={handleAddStudent}>Ajouter</button>
        <button onClick={handleClose}>Fermer</button>
      </div>
    </div>
  );
};

export default StudentForm;

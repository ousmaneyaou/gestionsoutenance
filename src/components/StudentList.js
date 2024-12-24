import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/StudentList.css";

const StudentList = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:4000/etudiants");
      setStudents(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des étudiants :", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/etudiants/${id}`);
      fetchStudents(); // Mettre à jour la liste après suppression
    } catch (error) {
      console.error("Erreur lors de la suppression de l'étudiant :", error);
    }
  };

  const handleEdit = (student) => {
    alert(`Modification de l'étudiant : ${student.nom}`);
    // Ajouter une logique de navigation ou d'édition ici si nécessaire
  };
  const handleClose = () => {
    navigate("/students");
  };

  return (
    <div className="student-list-page">
      <button onClick={handleClose}>retour</button>
      <h2>Liste des Étudiants</h2>
      <table className="student-table">
        <thead>
          <tr>
            <th>Matricule</th>
            <th>Nom</th>
            <th>Date de Naissance</th>
            <th>Nationalité</th>
            <th>Encadreur</th>
            <th>Filière</th>
            <th>Niveau</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.matricule}</td>
              <td>{student.nom}</td>
              <td>{student.datedeNaissance}</td>
              <td>{student.nationalite}</td>
              <td>{student.encadreur}</td>
              <td>{student.filiere}</td>
              <td>{student.niveau}</td>
              <td className="actions">
                <button onClick={() => handleEdit(student)}>Modifier</button>
                <button onClick={() => handleDelete(student.id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;

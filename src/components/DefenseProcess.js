import React, { useEffect, useState } from "react";
import "../css/DefenseProcess.css";
import { useNavigate } from "react-router-dom";

const DefenseProcess = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    annee: "",
    nomEtudiant: "",
    presidentJury: "",
    assesseur: "",
    heureSoutenance: "",
    theme: "",
    dateSoutenance: "",
    montant: "",
    note: "",
    mention: "",
  });

  const [students, setStudents] = useState([]);
  const [editing, setEditing] = useState(false);

  // Fetch students from JSON Server
  useEffect(() => {
    fetch("http://localhost:4000/soutenance")
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error("Erreur :", error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    try {
      const response = await fetch("http://localhost:4000/soutenance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          id: Math.random().toString(36).slice(2, 7),
        }),
      });
      if (response.ok) {
        const newStudent = await response.json();
        setStudents([...students, newStudent]);
        resetForm();
      } else {
        alert("Erreur lors de l'ajout !");
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const handleEdit = (student) => {
    setFormData(student);
    setEditing(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/soutenance/${formData.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        const updatedStudent = await response.json();
        setStudents(
          students.map((student) =>
            student.id === updatedStudent.id ? updatedStudent : student
          )
        );
        resetForm();
        setEditing(false);
      } else {
        alert("Erreur lors de la mise à jour !");
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/soutenance/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setStudents(students.filter((student) => student.id !== id));
      } else {
        alert("Erreur lors de la suppression !");
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const resetForm = () => {
    setFormData({
      id: "",
      annee: "",
      nomEtudiant: "",
      presidentJury: "",
      assesseur: "",
      heureSoutenance: "",
      theme: "",
      dateSoutenance: "",
      montant: "",
      note: "",
      mention: "",
    });
  };

  const handleClose = () => {
    navigate("/dashboard");
  };

  return (
    <div className="defense-process-container">
      <h2>Liste des Soutenances</h2>
      <table className="students-table">
        <thead>
          <tr>
            <th>Année</th>
            <th>Nom</th>
            <th>Président de Jury</th>
            <th>Assesseur</th>
            <th>Heure</th>
            <th>Thème</th>
            <th>Date</th>
            <th>Montant</th>
            <th>Note</th>
            <th>Mention</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.annee}</td>
              <td>{student.nomEtudiant}</td>
              <td>{student.presidentJury}</td>
              <td>{student.assesseur}</td>
              <td>{student.heureSoutenance}</td>
              <td>{student.theme}</td>
              <td>{student.dateSoutenance}</td>
              <td>{student.montant}</td>
              <td>{student.note}</td>
              <td>{student.mention}</td>
              <td>
                <button onClick={() => handleEdit(student)}>Modifier</button>
                <button onClick={() => handleDelete(student.id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>
        {editing ? "Modifier une soutenance" : "Programmer une soutenance"}
      </h2>
      <form className="defense-form">
        <div className="form-fields">
          <label>
            Année :{" "}
            <input
              type="text"
              name="annee"
              value={formData.annee}
              onChange={handleChange}
            />
          </label>
          <label>
            Nom :{" "}
            <input
              type="text"
              name="nomEtudiant"
              value={formData.nomEtudiant}
              onChange={handleChange}
            />
          </label>
          <label>
            Président de Jury :{" "}
            <input
              type="text"
              name="presidentJury"
              value={formData.presidentJury}
              onChange={handleChange}
            />
          </label>
          <label>
            Assesseur :{" "}
            <input
              type="text"
              name="assesseur"
              value={formData.assesseur}
              onChange={handleChange}
            />
          </label>
          <label>
            Heure :{" "}
            <input
              type="time"
              name="heureSoutenance"
              value={formData.heureSoutenance}
              onChange={handleChange}
            />
          </label>
          <label>
            Thème :{" "}
            <input
              type="text"
              name="theme"
              value={formData.theme}
              onChange={handleChange}
            />
          </label>
          <label>
            Date :{" "}
            <input
              type="date"
              name="dateSoutenance"
              value={formData.dateSoutenance}
              onChange={handleChange}
            />
          </label>
          <label>
            Montant :{" "}
            <input
              type="number"
              name="montant"
              value={formData.montant}
              onChange={handleChange}
            />
          </label>
          <label>
            Note :{" "}
            <input
              type="number"
              name="note"
              value={formData.note}
              onChange={handleChange}
            />
          </label>
          <label>
            Mention :{" "}
            <input
              type="text"
              name="mention"
              value={formData.mention}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-buttons">
          {editing ? (
            <button type="button" onClick={handleUpdate}>
              Mettre à jour
            </button>
          ) : (
            <button type="button" onClick={handleAdd}>
              Ajouter
            </button>
          )}
          <button type="button" onClick={handleClose}>
            Fermer
          </button>
        </div>
      </form>
    </div>
  );
};

export default DefenseProcess;

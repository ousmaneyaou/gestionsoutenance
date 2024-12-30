import React, { useState } from "react";
import "../css/Credit.css";

const Credit = () => {
  const [student, setStudent] = useState({ name: "", note: "" });
  const [studentsList, setStudentsList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleAdd = () => {
    if (!student.name.trim() || !student.note.trim()) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    if (isNaN(student.note) || student.note < 0 || student.note > 20) {
      alert("La note doit être un nombre entre 0 et 20.");
      return;
    }

    if (editingId !== null) {
      // Modifier l'étudiant existant
      setStudentsList(
        studentsList.map((s, index) =>
          index === editingId
            ? { name: student.name, note: parseFloat(student.note) }
            : s
        )
      );
      setEditingId(null);
    } else {
      // Ajouter un nouvel étudiant
      setStudentsList([
        ...studentsList,
        { name: student.name, note: parseFloat(student.note) },
      ]);
    }

    setStudent({ name: "", note: "" });
  };

  const handleEdit = (index) => {
    setStudent(studentsList[index]);
    setEditingId(index);
  };

  const handleDelete = (index) => {
    setStudentsList(studentsList.filter((_, i) => i !== index));
  };

  return (
    <div className="credit-management-container">
      <h2>Gestion des Notes des Étudiants</h2>
      <div className="credit-form">
        <input
          type="text"
          name="name"
          placeholder="Nom de l'étudiant"
          value={student.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="note"
          placeholder="Note (0 à 20)"
          value={student.note}
          onChange={handleChange}
        />
        <button onClick={handleAdd}>
          {editingId !== null ? "Modifier" : "Ajouter"}
        </button>
      </div>

      <table className="credit-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nom de l'Étudiant</th>
            <th>Note</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {studentsList.map((s, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{s.name}</td>
              <td>{s.note}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Modifier</button>
                <button onClick={() => handleDelete(index)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Credit;

import React, { useState, useEffect } from "react";
import "../css/Assesseurs.css";
import { useNavigate } from "react-router-dom";

const Assesseurs = ({ onClose }) => {
  const navigate = useNavigate();
  const [assesseur, setAssesseur] = useState({ name: "", phone: "" });
  const [assesseursList, setAssesseursList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Fetch assesseurs from JSON Server
  useEffect(() => {
    fetch("http://localhost:4000/assesseurs")
      .then((response) => response.json())
      .then((data) => setAssesseursList(data))
      .catch((error) => console.error("Erreur :", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssesseur({ ...assesseur, [name]: value });
  };

  const handleAdd = async () => {
    if (!assesseur.name.trim() || !assesseur.phone.trim()) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const newAssesseur = {
        id: Math.random().toString(36).slice(2, 7),
        name: assesseur.name,
        phone: assesseur.phone,
      };
      const response = await fetch("http://localhost:4000/assesseurs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAssesseur),
      });

      if (response.ok) {
        setAssesseursList([...assesseursList, newAssesseur]);
        setAssesseur({ name: "", phone: "" });
      } else {
        alert("Erreur lors de l'ajout !");
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const handleEdit = (assesseur) => {
    setAssesseur({ name: assesseur.name, phone: assesseur.phone });
    setEditingId(assesseur.id);
  };

  const handleUpdate = async () => {
    if (!assesseur.name.trim() || !assesseur.phone.trim()) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/assesseurs/${editingId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingId,
            name: assesseur.name,
            phone: assesseur.phone,
          }),
        }
      );

      if (response.ok) {
        setAssesseursList(
          assesseursList.map((a) =>
            a.id === editingId
              ? { id: editingId, name: assesseur.name, phone: assesseur.phone }
              : a
          )
        );
        setAssesseur({ name: "", phone: "" });
        setEditingId(null);
      } else {
        alert("Erreur lors de la mise à jour !");
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/assesseurs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setAssesseursList(assesseursList.filter((a) => a.id !== id));
      } else {
        alert("Erreur lors de la suppression !");
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };
  const handleClose = () => {
    navigate("/dashboard");
  };

  return (
    <div className="assesseurs-container">
      <h2>Gestion des Assesseurs</h2>
      <div className="assesseur-form">
        <input
          type="text"
          name="name"
          placeholder="Nom complet"
          value={assesseur.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Téléphone"
          value={assesseur.phone}
          onChange={handleChange}
        />
        {editingId ? (
          <button onClick={handleUpdate}>Modifier</button>
        ) : (
          <button onClick={handleAdd}>Ajouter</button>
        )}
        <button onClick={handleClose}>Fermer</button>
      </div>
      <table className="assesseurs-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom Complet</th>
            <th>Téléphone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assesseursList.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.name}</td>
              <td>{a.phone}</td>
              <td>
                <button onClick={() => handleEdit(a)}>Modifier</button>
                <button onClick={() => handleDelete(a.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Assesseurs;

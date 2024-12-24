import React, { useState, useEffect } from "react";
import "../css/GestionPresidentJury.css";
import { useNavigate } from "react-router-dom";

const GestionPresidentJury = ({ onClose }) => {
  const navigate = useNavigate();
  const [president, setPresident] = useState({ name: "", phone: "" });
  const [presidentsList, setPresidentsList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Fetch presidents from JSON Server
  useEffect(() => {
    fetch("http://localhost:4000/presidentdejury")
      .then((response) => response.json())
      .then((data) => setPresidentsList(data))
      .catch((error) => console.error("Erreur :", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPresident({ ...president, [name]: value });
  };

  const handleAdd = async () => {
    if (!president.name.trim() || !president.phone.trim()) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const newPresident = {
        id: Math.random().toString(36).slice(2, 7),
        name: president.name,
        phone: president.phone,
      };
      const response = await fetch("http://localhost:4000/presidentdejury", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPresident),
      });

      if (response.ok) {
        setPresidentsList([...presidentsList, newPresident]);
        setPresident({ name: "", phone: "" });
      } else {
        alert("Erreur lors de l'ajout !");
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const handleEdit = (president) => {
    setPresident({ name: president.name, phone: president.phone });
    setEditingId(president.id);
  };

  const handleUpdate = async () => {
    if (!president.name.trim() || !president.phone.trim()) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/presidentdejury/${editingId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingId,
            name: president.name,
            phone: president.phone,
          }),
        }
      );

      if (response.ok) {
        setPresidentsList(
          presidentsList.map((p) =>
            p.id === editingId
              ? { id: editingId, name: president.name, phone: president.phone }
              : p
          )
        );
        setPresident({ name: "", phone: "" });
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
      const response = await fetch(
        `http://localhost:4000/presidentdejury/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setPresidentsList(presidentsList.filter((p) => p.id !== id));
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
    <div className="gestion-president-container">
      <h2>Gestion des Présidents de Jury</h2>
      <div className="president-form">
        <input
          type="text"
          name="name"
          placeholder="Nom complet"
          value={president.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Téléphone"
          value={president.phone}
          onChange={handleChange}
        />
        {editingId ? (
          <button onClick={handleUpdate}>Modifier</button>
        ) : (
          <button onClick={handleAdd}>Ajouter</button>
        )}
        <button onClick={handleClose}>Fermer</button>
      </div>
      <table className="presidents-table">
        <thead>
          <tr>
            <th>Nom Complet</th>
            <th>Téléphone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {presidentsList.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.phone}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Modifier</button>
                <button onClick={() => handleDelete(p.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestionPresidentJury;

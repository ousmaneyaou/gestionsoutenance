import React, { useState, useEffect } from "react";
import "../css/Assesseurs.css";
import { useNavigate } from "react-router-dom";

const Encadreurs = ({ onClose }) => {
  const navigate = useNavigate();
  const [encadreur, setEncadreur] = useState({ name: "", phone: "" });
  const [encadreursList, setEncadreursList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Récupérer les encadreurs depuis le serveur
  useEffect(() => {
    const fetchEncadreurs = async () => {
      try {
        const response = await fetch("http://localhost:4000/encadreurs");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des encadreurs.");
        }
        const data = await response.json();
        setEncadreursList(data);
      } catch (error) {
        console.error("Erreur :", error.message);
      }
    };

    fetchEncadreurs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEncadreur({ ...encadreur, [name]: value });
  };

  const handleAdd = async () => {
    if (!encadreur.name.trim() || !encadreur.phone.trim()) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/encadreurs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(encadreur),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de l'encadreur.");
      }

      const newEncadreur = await response.json();
      setEncadreursList([...encadreursList, newEncadreur]);
      setEncadreur({ name: "", phone: "" });
    } catch (error) {
      console.error("Erreur :", error.message);
    }
  };

  const handleEdit = (encadreur) => {
    setEncadreur({ name: encadreur.name, phone: encadreur.phone });
    setEditingId(encadreur.id);
  };

  const handleUpdate = async () => {
    if (!encadreur.name.trim() || !encadreur.phone.trim()) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/encadreurs/${editingId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(encadreur),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de l'encadreur.");
      }

      setEncadreursList(
        encadreursList.map((e) =>
          e.id === editingId ? { ...encadreur, id: editingId } : e
        )
      );
      setEncadreur({ name: "", phone: "" });
      setEditingId(null);
    } catch (error) {
      console.error("Erreur :", error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/encadreurs/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'encadreur.");
      }

      setEncadreursList(encadreursList.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Erreur :", error.message);
    }
  };

  const handleClose = () => {
    navigate("/dashboard");
  };

  return (
    <div className="assesseurs-container">
      <h2>Gestion des Encadreurs</h2>
      <div className="assesseur-form">
        <input
          type="text"
          name="name"
          placeholder="Nom complet"
          value={encadreur.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Téléphone"
          value={encadreur.phone}
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
            <th>Nom Encadreur</th>
            <th>Téléphone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {encadreursList.map((e) => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.name}</td>
              <td>{e.phone}</td>
              <td>
                <button onClick={() => handleEdit(e)}>Modifier</button>
                <button onClick={() => handleDelete(e.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Encadreurs;

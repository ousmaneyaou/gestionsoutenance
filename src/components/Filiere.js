import React, { useEffect, useState } from "react";
import "../css/Filiere.css";
import { useNavigate } from "react-router-dom";

const Filiere = () => {
  const navigate = useNavigate();
  const [filiere, setFiliere] = useState("");
  const [filiereList, setFiliereList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Fetch filieres from JSON Server
  useEffect(() => {
    fetch("http://localhost:4000/filiere")
      .then((response) => response.json())
      .then((data) => setFiliereList(data))
      .catch((error) => console.error("Erreur :", error));
  }, []);

  const handleChange = (e) => {
    setFiliere(e.target.value);
  };

  const handleAdd = async () => {
    if (!filiere.trim()) {
      alert("Veuillez saisir une filière.");
      return;
    }

    try {
      const newFiliere = {
        id: Math.random().toString(36).slice(2, 7),
        name: filiere,
      };
      const response = await fetch("http://localhost:4000/filiere", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFiliere),
      });

      if (response.ok) {
        setFiliereList([...filiereList, newFiliere]);
        setFiliere("");
      } else {
        alert("Erreur lors de l'ajout !");
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const handleEdit = (filiere) => {
    setFiliere(filiere.name);
    setEditingId(filiere.id);
  };

  const handleUpdate = async () => {
    if (!filiere.trim()) {
      alert("Veuillez saisir une filière.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/filiere/${editingId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingId, name: filiere }),
        }
      );

      if (response.ok) {
        setFiliereList(
          filiereList.map((f) =>
            f.id === editingId ? { id: editingId, name: filiere } : f
          )
        );
        setFiliere("");
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
      const response = await fetch(`http://localhost:4000/filiere/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setFiliereList(filiereList.filter((f) => f.id !== id));
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
    <div className="filiere-container">
      <h2>Gestion des Filières</h2>
      <div className="filiere-form">
        <input
          type="text"
          placeholder="Saisir une filière"
          value={filiere}
          onChange={handleChange}
        />
        {editingId ? (
          <button onClick={handleUpdate}>Modifier</button>
        ) : (
          <button onClick={handleAdd}>Ajouter</button>
        )}
        <button onClick={handleClose}>Fermer</button>
      </div>
      <table className="filiere-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Filière</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filiereList.map((f) => (
            <tr key={f.id}>
              <td>{f.id}</td>
              <td>{f.name}</td>
              <td>
                <button onClick={() => handleEdit(f)}>Modifier</button>
                <button onClick={() => handleDelete(f.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Filiere;

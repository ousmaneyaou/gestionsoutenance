import React from "react";
import { useNavigate } from "react-router-dom";
import StudentForm from "./StudentForm";
import "../css/StudentManagement.css";

const StudentManagement = () => {
  const navigate = useNavigate();

  return (
    <div className="student-management-container">
      <StudentForm />
      <button
        className="navigate-button"
        onClick={() => navigate("/Student-List")}
      >
        Voir la liste des étudiants
      </button>
    </div>
  );
};

export default StudentManagement;

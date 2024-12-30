import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import StudentManagement from "./components/StudentManagement";
import DefenseProcess from "./components/DefenseProcess";
import CertificateManagement from "./components/CertificateManagement";
import NavBar from "./components/NavBar";
import Register from "./components/Register";
import StudentList from "./components/StudentList";
import Filiere from "./components/Filiere";
import Assesseurs from "./components/Assesseurs";
import Encadreurs from "./components/Encadreurs";
import GestionPresidentJury from "./components/GestionPresidentJury";
import Credit from "./components/Credit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route
          path="/*"
          element={
            <>
              <NavBar />
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/students" element={<StudentManagement />} />
                <Route path="/student-list" element={<StudentList />} />
                <Route path="/defense" element={<DefenseProcess />} />
                <Route
                  path="/certificates"
                  element={<CertificateManagement />}
                />
                <Route path="/filiere" element={<Filiere />} />
                <Route path="/assesseur" element={<Assesseurs />} />
                <Route path="/encadreur" element={<Encadreurs />} />
                <Route path="/credits" element={<Credit />} />
                <Route path="/gestionjury" element={<GestionPresidentJury />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

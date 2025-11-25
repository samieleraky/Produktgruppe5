import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";
import Ansogning from "./Jobansøger/Ansogning";
import Dashboard from "./HR/Dashboard";
import "./App.css";
import Login from "./Login";


export default function App() {
    return (
        <Router>
            {/* Logo øverst til højre på ALLE sider */}
            <img
                src="/.dotlegal.png"
                alt=".Legal"
                className="corner-logo"
            />

            {/* Navigation med logo */}
            <nav className="navbar">
                <img
                    src="/dotlegal-logo.webp"
                    alt="Logo"
                    className="navbar-logo"
                />
            </nav>

            {/* Indhold */}
            <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
                <Routes>
                    {/* Forside */}
                    <Route path="/" element={<Ansogning />} />

                    {/* Login */}
                    <Route path="/login" element={<Login />} />

                    {/* Dashboard */}
                    <Route path="/dashboard" element={<Dashboard />} />

                    {/* Fallback (404) */}
                    <Route path="*" element={<Ansogning />} />
                </Routes>
            </div>
        </Router>
    );
}

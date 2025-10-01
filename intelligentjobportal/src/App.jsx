import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PersonligeOpl from "./Jobansøger/PersonligeOpl";
import Ansogning from "./Jobansøger/Ansogning";
import Dokumenter from "./Jobansøger/Dokumenter";
import "./App.css";

// Hovedkomponent med routing og navigation, logo og styling, importerer undersider, definerer ruter og navigation links
export default function App() {
    return (
        <Router>
            {/* Logo øverst til højre på ALLE sider */}
            <img
                src="/.dotlegal.png"
                alt=".Legal"
                className="corner-logo"
            />


            {/* Navigation menu med logo - strækker over hele siden */}
            <nav className="navbar">
                <img
                    src="/dotlegal-logo.webp"
                    alt="Logo"
                    className="navbar-logo"
                />
                <div className="nav-links-container">
                    <Link to="/personlige" className="nav-link">
                        Personlige oplysninger
                    </Link>
                    <Link to="/ansogning" className="nav-link">
                        Ansøgning
                    </Link>
                    <Link to="/dokumenter" className="nav-link">
                        Dokumenter
                    </Link>
                </div>
               
            </nav>

            {/* Page content */}
            <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
                <Routes>
                    {/* Startside */}
                    <Route path="/" element={<PersonligeOpl />} />
                    <Route path="/personlige" element={<PersonligeOpl />} />
                    <Route path="/ansogning" element={<Ansogning />} />
                    <Route path="/dokumenter" element={<Dokumenter />} />
                    {/* fallback route */}
                    <Route path="*" element={<h2>404 - Siden blev ikke fundet</h2>} />
                </Routes>
            </div>
        </Router>
    );
}
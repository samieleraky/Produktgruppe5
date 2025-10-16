import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Ansogning from "./Jobansøger/Ansogning";
import "./App.css";

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
                    {/* Forside = Ansøgningsside */}
                    <Route path="/" element={<Ansogning />} />

                    {/* Fallback (404) */}
                    <Route path="*" element={<Ansogning />} />
                </Routes>
            </div>
        </Router>
    );
}

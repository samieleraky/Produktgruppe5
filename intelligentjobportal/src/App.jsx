import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PersonligeOpl from "./Jobansøger/PersonligeOpl";
import Ansogning from "./Jobansøger/Ansogning";
import Dokumenter from "./Jobansøger/Dokumenter";
import "./App.css";


export default function App() {
    return (
        <Router>
            <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
                {/* Logo in top right */}
                <img
                    src="/.dotlegal.png"
                    alt="Logo"
                    className="app-logo"
                />


                {/* Navigation menu */}
                <nav
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px",
                        marginBottom: "20px",
                    }}
                >
                    <Link to="/personlige" className="nav-link">
                        Personlige oplysninger
                    </Link>
                    <Link to="/ansogning" className="nav-link">
                        Ansøgning
                    </Link>
                    <Link to="/dokumenter" className="nav-link">
                        Dokumenter
                    </Link>
                </nav>

                {/* Page content */}
                <Routes>
                    <Route path="/personlige" element={<PersonligeOpl />} />
                    <Route path="/ansogning" element={<Ansogning />} />
                    <Route path="/dokumenter" element={<Dokumenter />} />
                    {/* Default route */}
                    <Route path="*" element={<PersonligeOpl />} />
                </Routes>
            </div>
        </Router>
    );
}
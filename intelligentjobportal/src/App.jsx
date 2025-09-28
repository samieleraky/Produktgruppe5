import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PersonligeOpl from "./Jobansøger/PersonligeOpl";
import Ansogning from "./Jobansøger/Ansogning";
import Dokumenter from "./Jobansøger/Dokumenter";


export default function App() {
    return (
        <Router>
            <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
                {/* Navigation menu */}
                <nav
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px",
                        marginBottom: "20px",
                    }}
                >
                    <Link to="/personlige" style={{ padding: "10px", border: "1px solid black" }}>
                        Personlige oplysninger
                    </Link>
                    <Link to="/ansogning" style={{ padding: "10px", border: "1px solid black" }}>
                        Ansøgning
                    </Link>
                    <Link to="/dokumenter" style={{ padding: "10px", border: "1px solid black" }}>
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
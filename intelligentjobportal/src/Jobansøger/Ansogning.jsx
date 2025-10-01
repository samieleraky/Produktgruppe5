import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importer useNavigate som bruges til at navigere til en anden side ved klik på knappen (hooks) }
import "../FormStyles.css";

export default function Ansogning() {
    const [selectedJob, setSelectedJob] = useState("");
    const navigate = useNavigate(); // navigation hook

    const handleJobChange = (e) => {
        setSelectedJob(e.target.value);
    };

    const handleFileUpload = (type) => {
        console.log(`Tilføj ${type}`);
        // evt. fil-upload logik her
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Valgt job:", selectedJob);
        navigate("/dokumenter"); // går videre til dokumenter-siden
    };

    return (
        <div className="page-container">
            <div className="form-box">
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Ansøgning</h2>

                <form onSubmit={handleSubmit}>
                    {/* Vælg jobstilling */}
                    <div className="form-group">
                        <label htmlFor="job">Vælg Jobstilling</label>
                        <select
                            id="job"
                            name="job"
                            value={selectedJob}
                            onChange={handleJobChange}
                            className="form-select"
                        >
                            <option value="">-- Vælg --</option>
                            <option value="design">Multimediedesign praktikant</option>
                            <option value="udvikler">Frontend-udvikler/ UX-designer</option>
                            <option value="compliance">Compliance- og GRC-specialist</option>
                            <option value="kommunikation">Kommunikations- og contentstrateg</option>
                            <option value="it">IT-support og systemadministrator</option>
                            <option value="tech">Legal tech-udvikler</option>
                        </select>
                    </div>

                    {/* Upload knapper */}
                    <button type="button" className="submit-btn" onClick={() => handleFileUpload("Ansøgning")}>
                        Tilføj Ansøgning
                    </button>
                    <button type="button" className="submit-btn" onClick={() => handleFileUpload("CV")}>
                        Tilføj CV
                    </button>
                    <button type="button" className="submit-btn" onClick={() => handleFileUpload("Portefølje")}>
                        Tilføj Portefølje
                    </button>
                    <button type="button" className="submit-btn" onClick={() => handleFileUpload("Anbefaling")}>
                        Tilføj Anbefaling
                    </button>

                    {/* Navigation knapper */}
                    <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                        <button type="submit" className="submit-btn">Næste</button>
                        <button
                            type="button"
                            className="submit-btn"
                            onClick={() => navigate("/personlige")} // går tilbage til personlige oplysninger
                        >
                            Forrige
                        </button>
                        <button type="button" className="submit-btn delete-btn" >
                            Slet Ansøgning
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

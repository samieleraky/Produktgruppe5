import React, { useState } from "react";
import "../FormStyles.css";

export default function Ansogning() {
    const [selectedJob, setSelectedJob] = useState(""); // valgt jobstilling

    const handleJobChange = (e) => {
        setSelectedJob(e.target.value);
    };

    const handleFileUpload = (type) => {
        console.log(`Tilføj ${type}`);
        // Her kan du åbne en fil-dialog eller håndtere upload
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Valgt job:", selectedJob);
    };

    return (
        <div className="page-container">
            <div className="form-box">
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Ansøgning</h2>
                <p style={{ marginBottom: "20px", textAlign: "center" }}>
                   
                </p>

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
                        <button type="button" className="submit-btn">Forrige</button>
                        <button type="button" className="submit-btn" style={{ background: "#f55" }}>
                            Slet Ansøgning
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

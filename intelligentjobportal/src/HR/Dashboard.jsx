import React, { useState, useEffect } from "react";
import "../FormStyles.css";

export default function Dashboard() { 
    const [topCandidates, setTopCandidates] = useState([]); // Tilstand til at gemme topkandidater
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Hent top 5 kandidater ved component load, og når "Opdater Liste" knappen trykkes 
    useEffect(() => {
        fetchTopCandidates(); 
    }, []);

    const fetchTopCandidates = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:5204/api/applications/top10"); // Henter top 10 kandidater fra API i backend 

            if (response.ok) {
                const data = await response.json(); // Parse JSON data svar fra API
                // Tag kun top 5 kandidater
                setTopCandidates(data.slice(0, 5));
            } else {
                setError("Kunne ikke hente kandidater");
            }
        } catch (err) {
            console.error("Fejl:", err);
            setError("Serverfejl - kunne ikke hente data");
        } finally {
            setLoading(false);
        }
    };

    if (loading) { // Vis loading state 
        return (
            <div className="page-container">
                <div className="form-box">
                    <h2 style={{ textAlign: "center" }}>Indlæser kandidater...</h2>
                </div>
            </div>
        );
    }

    if (error) { // Vis fejlmeddelelse
        return (
            <div className="page-container">
                <div className="form-box">
                    <h2 style={{ textAlign: "center", color: "red" }}>{error}</h2>
                    <button onClick={fetchTopCandidates}>Prøv igen</button>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="form-box" style={{ maxWidth: "1200px" }}>
                <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
                    Top 5 Kandidater
                </h2>

                {topCandidates.length === 0 ? (
                    <p style={{ textAlign: "center" }}>Ingen ansøgninger endnu</p>
                ) : (
                    <div className="candidates-grid">
                        {topCandidates.map((candidate, index) => (
                            <div key={candidate.id} className="candidate-card">
                                <div className="candidate-rank">#{index + 1}</div>

                                <h3>{candidate.navn}</h3>

                                <div className="candidate-score">
                                    <span className="score-label">Match Score:</span>
                                    <span className="score-value">{candidate.matchScore}%</span>
                                </div>

                                <div className="candidate-info">
                                    <p><strong>Job:</strong> {candidate.job}</p>
                                    <p><strong>Email:</strong> {candidate.email}</p>
                                    <p><strong>Telefon:</strong> {candidate.telefon}</p>
                                </div>

                                <div className="candidate-files">
                                    <h4>Dokumenter:</h4>
                                    <ul>
                                        <li>📄 Ansøgning</li>
                                        <li>📄 CV</li>
                                        {candidate.portefoljePath && <li>📁 Portefølje</li>}
                                        {candidate.anbefalingPath && <li>📁 Anbefaling</li>}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div style={{ textAlign: "center", marginTop: "30px" }}>
                    <button onClick={fetchTopCandidates} className="submit-btn">
                        Opdater Liste
                    </button>
                </div>
            </div>
        </div>
    );
}
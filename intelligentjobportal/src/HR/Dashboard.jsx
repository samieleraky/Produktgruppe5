import React, { useState, useEffect } from "react";
import "../FormStyles.css";

export default function Dashboard() {
    const [topCandidates, setTopCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem("token");

 
    // ❗ SIMPLE ACCESS CHECK – HR skal være logget ind
   
    if (!token) {
        return (
            <div className="page-container">
                <div className="form-box">
                    <h2 style={{ textAlign: "center" }}>Adgang nægtet</h2>
                    <p style={{ textAlign: "center" }}>
                        Du skal logge ind for at få adgang til dashboardet.
                    </p>

                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                        <a href="/login" className="submit-btn">
                            Gå til login
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    // Fetch top candidates
    useEffect(() => {
        fetchTopCandidates();
    }, []);

    const fetchTopCandidates = async () => {
        try {
            setLoading(true);

            const response = await fetch("http://localhost:5204/api/applications/top10", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setTopCandidates(data.slice(0, 10));
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

    
    // Loading state
    if (loading) {
        return (
            <div className="page-container">
                <div className="form-box">
                    <h2 style={{ textAlign: "center" }}>Indlæser kandidater...</h2>
                </div>
            </div>
        );
    }

   
    // Error state
    if (error) {
        return (
            <div className="page-container">
                <div className="form-box">
                    <h2 style={{ textAlign: "center", color: "red" }}>{error}</h2>
                    <button onClick={fetchTopCandidates} className="submit-btn">
                        Prøv igen
                    </button>
                </div>
            </div>
        );
    }

   
    // MAIN DASHBOARD VIEW
    return (
        <div className="page-container">
            <div className="form-box" style={{ maxWidth: "1200px" }}>
                <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
                    Top 10 Kandidater
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

                {/* Log ud knap */}
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <button
                        className="submit-btn"
                        onClick={() => {
                            localStorage.removeItem("token");
                            window.location.href = "/login";
                        }}
                    >
                        Log ud
                    </button>
                </div>
            </div>
        </div>
    );
}

import React, { useState } from "react";
import "../FormStyles.css";


export default function Ansogning() {
    // Personal details. use state is used to store the data
    const [personligeData, setPersonligeData] = useState({
        navn: "",
        adresse: "",
        telefon: "",
        email: "",
        titel: "",
    });

    //alse by default because not given yet
    const [samtykke, setSamtykke] = useState(false);

    // jobchoice. Empty string by default because no job is selected yet
    const [selectedJob, setSelectedJob] = useState("");

    // Fileuploads. null by default because no files are uploaded yet
    const [files, setFiles] = useState({
        ansogning: null,
        cv: null,
        portefolje: null,
        anbefaling: null,
    });

    // Håndter tekstinput
    const handlePersonligeChange = (e) => {
        const { name, value } = e.target;
        setPersonligeData((prev) => ({ ...prev, [name]: value }));
    };

    // Håndter jobvalg
    const handleJobChange = (e) => {
        setSelectedJob(e.target.value);
    };

    // Håndter filupload
    const handleFileChange = (e) => {
        const { name, files: uploadedFiles } = e.target;
        setFiles((prev) => ({ ...prev, [name]: uploadedFiles[0] }));
    };

    // Håndter form-submit
    const handleSubmitAll = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("Navn", personligeData.navn);
        formData.append("Adresse", personligeData.adresse);
        formData.append("Telefon", personligeData.telefon);
        formData.append("Email", personligeData.email);
        formData.append("Titel", personligeData.titel);
        formData.append("Job", selectedJob);
        formData.append("Ansogning", files.ansogning);
        formData.append("CV", files.cv);
        if (files.portefolje) formData.append("Portefolje", files.portefolje);
        if (files.anbefaling) formData.append("Anbefaling", files.anbefaling);

        try {
            // Send data til backend API
            const response = await fetch("http://localhost:5204/api/applications", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Ansøgning sendt! ✅");

                //reset form
                setPersonligeData({ navn: "", adresse: "", telefon: "", email: "", titel: "" });
                setSelectedJob("");
                setFiles({ ansogning: null, cv: null, portefolje: null, anbefaling: null });
                setSamtykke(false);
            } else {
                alert("Fejl ved indsendelse ❌");
            }
        } catch (error) {
            console.error("Fejl:", error);
            alert("Serverfejl ❌");
        }
    };

    return (
        <div className="page-container">
            <div className="form-box">
                <h3 style={{ textAlign: "center", marginBottom: "30px" }}>
                    Ansøgningsformular
                </h3>



                <form onSubmit={handleSubmitAll}>

                    {/* Sektion 1 - Personlige oplysninger */}
                    <section style={{ marginBottom: "40px" }}>
                        

                        <div className="form-group">
                            <label htmlFor="navn">Navn</label>
                            <input
                                type="text"
                                name="navn"
                                value={personligeData.navn}
                                onChange={handlePersonligeChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="adresse">Adresse</label>
                            <input
                                type="text"
                                name="adresse"
                                value={personligeData.adresse}
                                onChange={handlePersonligeChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="telefon">Telefon</label>
                            <input
                                type="tel"
                                name="telefon"
                                value={personligeData.telefon}
                                onChange={handlePersonligeChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={personligeData.email}
                                onChange={handlePersonligeChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="titel">Uddannelse</label>
                            <input
                                type="text"
                                name="titel"
                                value={personligeData.titel}
                                onChange={handlePersonligeChange}
                            />
                        </div>
                    </section>

                    {/* Sektion 2 - Ansøgning */}
                    <section style={{ marginBottom: "40px" }}>

                        <div className="form-group">
                            <label htmlFor="job">Vælg Jobstilling</label>
                            <select
                                id="job"
                                name="job"
                                value={selectedJob}
                                onChange={handleJobChange}
                                className="form-select"
                                required
                            >
                                <option value="">-- Vælg --</option>
                                <option value="design">Multimediedesign praktikant</option>
                                <option value="udvikler">Frontend-udvikler / UX-designer</option>
                                <option value="compliance">Compliance- og GRC-specialist</option>
                                <option value="kommunikation">Kommunikations- og contentstrateg</option>
                                <option value="it">IT-support og systemadministrator</option>
                                <option value="tech">Legal tech-udvikler</option>
                                
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Upload Ansøgning (PDF / DOCX)</label>
                            <input
                                type="file"
                                name="ansogning"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                                required
                            />
                            {files.ansogning && <p>📄 {files.ansogning.name}</p>}
                        </div>

                        <div className="form-group">
                            <label>Upload CV</label>
                            <input
                                type="file"
                                name="cv"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                                required
                            />
                            {files.cv && <p>📄 {files.cv.name}</p>}
                        </div>

                        <div className="form-group">
                            <label>Upload Portefølje (valgfrit)</label>
                            <input
                                type="file"
                                name="portefolje"
                                accept=".pdf,.zip,.jpg,.png"
                                onChange={handleFileChange}
                            />
                            {files.portefolje && <p>📁 {files.portefolje.name}</p>}
                        </div>

                        <div className="form-group">
                            <label>Upload Anbefaling (valgfrit)</label>
                            <input
                                type="file"
                                name="anbefaling"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                            />
                            {files.anbefaling && <p>📁 {files.anbefaling.name}</p>}
                        </div>
                    </section>

         

                    {/* Samtykkeerklæring */}
                    <div className="form-group" style={{ marginBottom: "20px" }}>
                        <label style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                            <input
                                type="checkbox"
                                checked={samtykke}
                                onChange={(e) => setSamtykke(e.target.checked)}
                                required
                                style={{ marginTop: "4px" }}
                            />
                            <span>
                                Jeg giver hermed min samtykke til at .dotlegal må opbevare min ansøgning og dertilhørende dokumenter i de næste 6 måneder. Jeg er bekendt med at jeg til ethvert tidspunkt kan trække samtykket tilbage.{" "}
                                <a href="https://www.dotlegal.com/en/privacy-policy" target="_blank" rel="noopener noreferrer">
                                    privatlivspolitik
                                </a>.
                            </span>
                        </label>
                    </div>

                    {/* Afslutning */}
                    <div style={{ textAlign: "center" }}>
                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={!samtykke}
                        >
                            Send Ansøgning
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


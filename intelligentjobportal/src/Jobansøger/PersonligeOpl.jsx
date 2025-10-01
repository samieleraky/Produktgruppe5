import React, { useState } from "react";
import {useNavigate} from "react-router-dom";  //Importer useNavigate som bruges til at navigere til en anden side ved klik på knappen (hooks)
import "../FormStyles.css";



// komponent til personlige oplysninger
export default function PersonligeOpl() {
    const navigate = useNavigate(); // Initialiser useNavigate hook
    const [formData, setFormData] = useState({ // initial state, alle felter tomme, bruges til at holde styr på inputværdier
        navn: "",
        adresse: "",
        telefon: "",
        email: "",
        titel: "",
    });



    // håndter ændringer i inputfelter
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // håndter submit
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form data:", formData);
        navigate("/ansogning"); // Brug navigate til at gå til ansøgnings siden ved submit
    };

    // Brug navigate til at gå til ansøgnings siden ved submit
    navigate("/ansogning");

    // JSX til at rendre formen, med labels og inputfelter bundet til state, og en submit knap, der kalder handleSubmit ved klik
    return (
        <div className="page-container">
            <div className="form-box">
                <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
                    Personlige oplysninger
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="navn">Navn</label>
                        <input type="text" name="navn" value={formData.navn} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="adresse">Adresse</label>
                        <input type="text" name="adresse" value={formData.adresse} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="telefon">Telefon</label>
                        <input type="text" name="telefon" value={formData.telefon} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="titel">Uddannelse</label>
                        <input type="text" name="titel" value={formData.titel} onChange={handleChange} />
                    </div>

                    <button type="submit" className="submit-btn">
                        Næste
                    </button>
                </form>
            </div>
        </div>
    );
}

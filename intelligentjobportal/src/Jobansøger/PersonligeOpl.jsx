import React, { useState } from "react";
import "../FormStyles.css";


export default function PersonligeOpl() {
    const [formData, setFormData] = useState({
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
    };

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

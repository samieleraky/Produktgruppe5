import React, { useState } from "react";

export default function Login() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const response = await fetch("http://localhost:5204/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: form.username, passwordHash: form.password }),
        });

        setLoading(false);

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.token);
            window.location.href = "/dashboard";
        } else {
            setError("Forkert brugernavn eller adgangskode");
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <h2>HR Login</h2>
                <p className="login-subtitle">Log ind for at administrere kandidater</p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Brugernavn"
                        value={form.username}
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                        className="login-input"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Adgangskode"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="login-input"
                        required
                    />

                    {error && <div className="login-error">{error}</div>}

                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? "Logger ind…" : "Log ind"}
                    </button>
                </form>
            </div>
        </div>
    );
}

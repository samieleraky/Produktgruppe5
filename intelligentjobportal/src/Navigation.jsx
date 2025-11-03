import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

export default function Navigation() {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <h1 className="nav-logo">.dotlegal</h1>
                <ul className="nav-menu">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Hjem</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/ansogning" className="nav-link">Ansøg</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/dashboard" className="nav-link">Dashboard</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
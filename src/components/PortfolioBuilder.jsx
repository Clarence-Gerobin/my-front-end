import React, { useState } from "react";
import "./PortfolioBuilder.css";

// This import handles the offline image from your assets folder
import bgImage from "../assets/bg.jpg"; 

const PortfolioBuilder = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        category: "",
        portfolioLink: "",
        about: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // --- LOGGING TO CONSOLE ---
        console.log("User Name:", formData.name);
        console.log("User Email:", formData.email);
        console.log("Category:", formData.category);
        console.log("Project Link:", formData.portfolioLink);
        console.log("About/Bio:", formData.about);


        setTimeout(() => {
            alert("PUPBC Portfolio Submitted!");
        }, 100);
    };

    return (
        <div 
            className="fullscreen-bg" 
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="glass-card">
                <div className="header-section">
                    <h1 className="project-title">PUPBC Portfolio</h1>
                    <p className="project-tagline">Showcase your Projects to the Community</p>
                </div>
                
                <form onSubmit={handleSubmit} className="form-stack">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <select 
                        name="category" 
                        value={formData.category} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="" disabled>Select Specialization</option>
                        <option value="Technical">Technical</option>
                        <option value="Creative">Creative</option>
                        <option value="Literary">Literary</option>
                    </select>

                    <input
                        type="url"
                        name="portfolioLink"
                        placeholder="Project Link (GitHub/Drive)"
                        value={formData.portfolioLink}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="about"
                        placeholder="Short Bio / About your work"
                        value={formData.about}
                        onChange={handleChange}
                        rows="3"
                        required
                    />

                    <button type="submit" className="submit-btn">
                        SUBMIT PORTFOLIO
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PortfolioBuilder;
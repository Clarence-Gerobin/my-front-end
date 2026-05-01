import React, { useState } from "react";
import "./PortfolioBuilder.css";
import bgImage from "../assets/bg.jpg"; 

const PortfolioBuilder = () => {
    // Initial state object for clean resetting
    const initialState = {
        name: "", 
        email: "", 
        category: "", 
        portfolioLink: "", 
        about: ""
    };

    const [formData, setFormData] = useState(initialState);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); 
        
        try {
            // Connecting to your Render Backend
            const response = await fetch("https://pupbc-back-end.onrender.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                alert("Success: Portfolio Submitted!");
                
                // This resets the form to empty after a successful submission
                setFormData(initialState);
            } else {
                alert("Error: " + (result.error || "Submission failed"));
            }
        } catch (error) {
            // Handles Render's "Cold Start" or network issues
            alert("The server is waking up. Please wait about 30 seconds and try again.");
        } finally {
            // Re-enables the button whether it succeeded or failed
            setIsSubmitting(false); 
        }
    };

    return (
        <div className="fullscreen-bg" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="glass-card">
                <div className="header-section">
                    <h1 className="project-title">PUPBC Portfolio</h1>
                    <p className="project-tagline">Showcase your Projects to the Community</p>
                </div>
                <form onSubmit={handleSubmit} className="form-stack">
                    <input 
                        type="text" name="name" placeholder="Full Name" 
                        value={formData.name} onChange={handleChange} required 
                    />
                    <input 
                        type="email" name="email" placeholder="Email" 
                        value={formData.email} onChange={handleChange} required 
                    />
                    <select 
                        name="category" value={formData.category} 
                        onChange={handleChange} required
                    >
                        <option value="" disabled>Select Specialization</option>
                        <option value="Technical">Technical</option>
                        <option value="Creative">Creative</option>
                        <option value="Literary">Literary</option>
                    </select>
                    <input 
                        type="url" name="portfolioLink" placeholder="Project Link (GitHub/Drive)" 
                        value={formData.portfolioLink} onChange={handleChange} required 
                    />
                    <textarea 
                        name="about" placeholder="Short Bio / About your work" 
                        value={formData.about} onChange={handleChange} rows="3" required 
                    />
                    
                    <button type="submit" className="submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? "SENDING..." : "SUBMIT PORTFOLIO"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PortfolioBuilder;
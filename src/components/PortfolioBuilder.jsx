import React, { useState } from "react";
import "./PortfolioBuilder.css";
import bgImage from "../assets/bg.jpg"; 

const PortfolioBuilder = () => {
    const [formData, setFormData] = useState({
        name: "", email: "", category: "", portfolioLink: "", about: ""
    });
    // NEW: Add a loading state
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Disable the button when clicked
        
        try {
            const response = await fetch("https://pupbc-back-end.onrender.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                alert("Success: " + result.message);
                // This clears the form upon a successful save!
                setFormData({ name: "", email: "", category: "", portfolioLink: "", about: "" });
            } else {
                alert("Error: " + (result.error || "Submission failed"));
            }
        } catch (error) {
            alert("The server is waking up or unavailable. Please wait 30 seconds and try again.");
            console.error("Fetch error:", error);
        } finally {
            setIsLoading(false); // Re-enable the button no matter what happens
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
                    <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    <select name="category" value={formData.category} onChange={handleChange} required>
                        <option value="" disabled>Select Specialization</option>
                        <option value="Technical">Technical</option>
                        <option value="Creative">Creative</option>
                        <option value="Literary">Literary</option>
                    </select>
                    <input type="url" name="portfolioLink" placeholder="Project Link (GitHub/Drive)" value={formData.portfolioLink} onChange={handleChange} required />
                    <textarea name="about" placeholder="Short Bio / About your work" value={formData.about} onChange={handleChange} rows="3" required />
                    
                    {/* NEW: Button changes based on loading state */}
                    <button type="submit" className="submit-btn" disabled={isLoading}>
                        {isLoading ? "SUBMITTING..." : "SUBMIT PORTFOLIO"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PortfolioBuilder;
// Filepath: /Volumes/Macintosh HD/Users/mahaprasad/Downloads/Job-Portal-main/components/ResumeForm.jsx

import React, { useState } from 'react';

const ResumeForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        experience: '',
        skills: '',
    });
    const [submissionResult, setSubmissionResult] = useState(null); // State to hold submission result

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Access your Gemini API key from environment variables
        const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    
        // Example API call (replace with your actual API endpoint)
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`, // Ensure this is correctly formatted
            },
            body: JSON.stringify(formData),
        });
    
        const data = await response.json();
        setSubmissionResult(data); // Set the submission result
    };
    
    

    return (
        <div className="resume-form">
            <h2>Resume Submission</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Phone:</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                <div>
                    <label>Experience:</label>
                    <textarea name="experience" value={formData.experience} onChange={handleChange} required />
                </div>
                <div>
                    <label>Skills:</label>
                    <textarea name="skills" value={formData.skills} onChange={handleChange} required />
                </div>
                <button type="submit">Submit Resume</button>
            </form>

            {/* Display submission result if available */}
            {submissionResult && (
                <div className="submission-result">
                    <h3>Submission Result:</h3>
                    <pre>{JSON.stringify(submissionResult, null, 2)}</pre> {/* Display the result in a readable format */}
                </div>
            )}
        </div>
    );
};

export default ResumeForm;

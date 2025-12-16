import React, { useState } from 'react';

const CategorySelector = ({ onCategorySelect, currentCategories }) => {
    // Category styles 
    const categoryStyles = {
        "Read Emails": { backgroundColor: "orange" },
        "Send Emails": { backgroundColor: "lightgreen" },
        "Web Parsing": { backgroundColor: "lightblue" },
        "default": { backgroundColor: "lightgray" }
    };
    
    // Category options
    const categories = ["Read Emails", "Web Parsing", "Send Emails"];

    return (
        <div style={{ padding: "10px", borderRadius: "5px" }}>
            <p>Select multiple job categories:</p>
            <div className="category-buttons" style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                {categories.map((category) => {
                    // Check if the current category is included in the array
                    const isSelected = currentCategories.includes(category);
                    const styleKey = isSelected ? category : "default";

                    return (
                        <button 
                            type="button" 
                            key={category}
                            onClick={() => onCategorySelect(category)} // Passes the category to the parent handler
                            style={{ 
                                padding: "8px 15px", 
                                borderRadius: "5px",
                                // Add a subtle border or bold text for better visual feedback when selected
                                border: isSelected ? '2px solid black' : '1px solid #ddd', 
                                ...categoryStyles[styleKey],
                                fontWeight: isSelected ? 'bold' : 'normal'
                            }}
                        >
                            {category}
                        </button>
                    );
                })}

                {/* Clears the entire array */}
                <button 
                    type="button"
                    style={{ padding: "8px 15px", backgroundColor: "lightgray" }}
                    onClick={() => onCategorySelect(null, true)} // Special flag to tell parent to clear all
                >
                    Clear All
                </button>
            </div>
            <p style={{ marginTop: "10px" }}>
                Selected: {currentCategories.length > 0 ? currentCategories.join(', ') : "None"}
            </p>
        </div>
    );
};

const JobForm = () => {
    const [jobDetails, setJobDetails] = useState({
        title: "",
        categories: [], // Change to an array for multi-select
        status: "To Start"
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [jobs, setJobs] = useState([]);

    const statuses = ["To Start", "In Progress", "Completed"];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setJobDetails(prev => ({ ...prev, [name]: value }));
        setError("");
        setSuccess("");
    };

    // Implement toggle logic for the categories array
    const handleCategorySelect = (category, clearAll = false) => {
        setError("");
        setSuccess("");
        
        if (clearAll) {
            setJobDetails(prev => ({ ...prev, categories: [] })); // Clear all logic
            return;
        }

        setJobDetails(prev => {
            const currentCategories = prev.categories;
            let newCategories;

            if (currentCategories.includes(category)) {
                // Remove category if it exists
                newCategories = currentCategories.filter(cat => cat !== category);
            } else {
                // Add category if it doesn't exist
                newCategories = [...currentCategories, category];
            }
            
            return { ...prev, categories: newCategories }; // Update the 'categories' property
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation check against array length
        if (!jobDetails.status || !jobDetails.title.trim() || jobDetails.categories.length === 0) {
            setError("Job Title, Category (at least one must be selected), and Status must all be filled.");
            setSuccess("");
            return;
        }

        if (jobDetails.title.trim().length < 3 ) {
            setError("Job title must be at least 3 characters long");
            setSuccess("");
            return;
        }

        console.log("New job added: ", jobDetails);

        setJobs((prev) => [
            ...prev,
            {
                id: Date.now(),
                ...jobDetails // jobDetails now includes the categories array
            }
        ]);

        setSuccess("Job added successfully");
        setError("");
        // Reset state correctly
        setJobDetails({
            title: "",
            categories: [], 
            status: "To Start"
        });
    };

    // Form validity check against array length
    const isFormInvalid =
        !jobDetails.title.trim() || jobDetails.categories.length === 0 || jobDetails.title.trim().length < 3;

    return (
        <div className="form-header">
            <h1>Job Form</h1>
            <p>Fill out the details and select one or more categories using the buttons below before submitting.</p>

            <form onSubmit={handleSubmit} className="job-form">
                
                {/* Input field */}
                <input
                    name="title"
                    type="text"
                    placeholder="Enter the job title"
                    value={jobDetails.title}
                    onChange={handleInputChange}
                />
                <br /><br />

                {/* Job status dropdown */}
                <select
                    name="status"
                    value={jobDetails.status}
                    onChange={handleInputChange}
                >
                    {statuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
                <br /><br />
                
                {/* Category Selector */}
                <CategorySelector 
                    onCategorySelect={handleCategorySelect} 
                    currentCategories={jobDetails.categories} // Pass the categories array
                />
                <br /><br />

                {/* Submit button */}
                <button
                    type="submit"
                    className="submit-data"
                    disabled={isFormInvalid}
                >
                    Add job
                </button>
            </form>

            {/* Messages and List */}
            {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}
            {success && <p className="success-message" style={{ color: "green" }}>{success}</p>}

            <div className="job-list-preview" style={{ marginTop: "20px", borderTop: "1px solid #ddd", paddingTop: "10px" }}>
                <h3>Added jobs</h3>
                {jobs.length === 0 ? (
                    <p>No jobs added yet.</p>
                ) : (
                    <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                        {jobs.map(job => (
                            <li key={job.id}>
                                {/* Access the categories array */}
                                <strong>{job.title}</strong> | Categories: {job.categories.join(', ')} | Status: {job.status}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default JobForm;
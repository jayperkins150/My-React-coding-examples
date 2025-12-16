import React, { useState } from 'react';

const AdvancedJobCounter = () => {
    const [jobCounts, setJobCounts] = useState({
        Production: 0,
        UAT: 0,
    });

    // Environment state
    const [environment, setEnvironment] = useState("Production");

    // Function to get the current job count for the active environment
    const currentJobCount = jobCounts[environment];

    // 3. Update Handler: Add job
    const handleAddJob = () => {
        // Use the functional form of setJobCounts to safely update the state
        setJobCounts(prevCounts => ({
            ...prevCounts, // Keep the count of the other environment
            [environment]: prevCounts[environment] + 1, // Only update the active environment's count
        }));
    };

    // Remove job
    const handleRemoveJob = () => {
        // Check if the current environment's count is greater than 0
        if (currentJobCount > 0) {
            setJobCounts(prevCounts => ({
                ...prevCounts,
                [environment]: prevCounts[environment] - 1, // Only update the active environment's count
            }));
        }
    };

    // Reset jobs
    const handleResetJobs = () => {
        // Reset only the job count for the current environment
        setJobCounts(prevCounts => ({
            ...prevCounts,
            [environment]: 0,
        }));
    };

    // Toggle environment
    const handleToggleEnvironment = () => {
        setEnvironment(prev =>
            prev === "Production" ? "UAT" : "Production"
        );
    };

    // Message based on job count
    let message = "";
    if (currentJobCount === 0) {
        message = "No jobs available in this environment";
    } else if (currentJobCount >= 1 && currentJobCount <= 5) {
        message = "A few jobs available";
    } else {
        message = "Many jobs available";
    }

    return (
        <div style={{ padding: '30px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h1>Advanced Job Counter</h1>
            <p>Add or remove jobs or toggle the environment below</p>

            {/* Display environment */}
            <p style={{ fontWeight: 'bold' }}>Environment: {environment}</p>

            {/* Display job count uses the active environment's count */}
            <p>Current jobs in {environment}: {currentJobCount}</p>

            {/* Buttons */}
            <div>
                <button onClick={handleAddJob} style={{ marginRight: '5px' }}>Add job</button>
                <button onClick={handleRemoveJob} style={{ marginRight: '5px' }}>Remove job</button>
                <button onClick={handleResetJobs} style={{ marginRight: '15px' }}>Reset {environment}</button>
                <button onClick={handleToggleEnvironment} style={{ backgroundColor: 'gold' }}>
                    Switch to {environment === "Production" ? "UAT" : "Production"}
                </button>
            </div>

            {/* Message based on job count */}
            <p style={{ marginTop: '10px', fontStyle: 'italic' }}><br />{message}</p>
        </div>
    );
};

export default AdvancedJobCounter;
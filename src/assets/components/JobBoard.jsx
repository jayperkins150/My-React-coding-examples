import React, { useState } from 'react';

const JobBoard = () => {
    const companyName = "Job Counter Bot";
    const [jobCount, setJobCount] = useState(16);

    const increaseCount = () => {
        setJobCount(prevCount => prevCount + 1);
    };

    const decreaseCount = () => {
        // Prevents count from going below zero
        setJobCount(prevCount => Math.max(0, prevCount - 1)); 
    };

    const resetCount = () => {
        setJobCount(0);
    };

    const getJobMessage = () => {
        const nextWeekJobs = Math.floor(jobCount * 1.5);

        if (jobCount === 0) {
            return "No jobs available";
        } else if (jobCount < 5) {
            return `Few jobs running today. Jobs running today from bot: ${jobCount}, 
            expected number of jobs next week: ${nextWeekJobs}`;
        } else if (jobCount > 5) {
            return `Plenty of jobs running today. Jobs running today from bot: ${jobCount}, 
            expected number of jobs next week: ${nextWeekJobs}`;
        }
    };

    return (
        <div>
            <h1>{companyName}</h1>
            <br />

            <p>This component updates with a description of how many jobs are available and expected job count for next week</p>
            <br />
            
            <p>{getJobMessage()}</p>
            <br />

            <button 
                onClick={increaseCount} 
                style={{ marginRight: '10px', padding: '20px', cursor: 'pointer' }}
            >
                Increase Job Count (+1)
            </button>
            <button 
                onClick={decreaseCount} 
                style={{ marginRight: '10px', padding: '20px', cursor: 'pointer' }}
            >
                Decrease Job Count (-1)
            </button>
            <button 
                onClick={resetCount} 
                style={{ padding: '20px', cursor: 'pointer' }}
            >
                Reset Count (0)
            </button>
        </div>
    );

};

export default JobBoard
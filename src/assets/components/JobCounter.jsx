import React, { useState } from 'react';

const JobCounter = () => {
    const [jobCount, setJobCount] = useState(0);

    const handleAddJob = () => {
        setJobCount(jobCount + 1);
        console.log("New job count: ", jobCount + 1);
    };

    return (
        <div>
            <h1>Job Counter</h1>
            <br />
            <p>Click "Add Job" below to increase the count</p>
            <br />
            <p>Current Jobs: {jobCount}</p>
            <button onClick={handleAddJob}>Add Job</button>
            <br></br>
            <br></br>
        </div>
    );

};

export default JobCounter;
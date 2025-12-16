import React, { useState, useEffect } from 'react';

function JobStatusColumn({ title, status, jobs, deleteJob }) {
    const filteredJobs = jobs.filter(job => job.status === status);

    return (
        <div className="job-column">
            <h2>{title}</h2>

            {filteredJobs.length === 0 && (
                <p className="no-jobs">No jobs in this category</p>
            )}

            {/* Pass deleteJob to each JobCard */}
            {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} deleteJob={deleteJob} />
            ))}
        </div>
    );
}

const JobManager = () => {
    // Load from local storage
    const [jobs, setJobs] = useState(() => {
        const savedJobs = localStorage.getItem("jobs");
        return savedJobs ? JSON.parse(savedJobs) : [];
    });

    const [activity, setActivity] = useState("");
    const [categories, setCategories] = useState([]);
    const [status, setStatus] = useState("Need to Complete");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const isSubmitDisabled = !activity.trim() || categories.length === 0;

    const categoryOptions = ["Read Emails", "Send Emails", "Web Parsing"];

    // Save jobs to local storage whenever jobs change
    useEffect(() => {
        localStorage.setItem("jobs", JSON.stringify(jobs));
    }, [jobs]);

    // Add new job
    const addJob = (e) => {
    e.preventDefault();
        setError(""); // Clear previous errors

        if (!activity.trim()) {
            setError("Please enter a job activity.");
            return;
        }
        if (categories.length === 0) {
            setError("Please select at least one category.");
            return;
        }

        const newJob = {
            id: Date.now(),
            activity,
            categories,
            status // Status is always present due to default/select value
        };

        setJobs(prevJobs => [...prevJobs, newJob]);
        setSuccessMessage(`Successfully added job: ${activity}!`);
        resetForm();
    };

    // Delete job
    const deleteJob = (jobId) => {
        setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
    };

    // Clear all jobs
    const clearAllJobs = () => {
        setJobs([]);
        localStorage.removeItem("jobs");
    };

    // Category toggle
    const handleCategoryToggle = (cat) => {
        if (categories.includes(cat)) {
            setCategories(categories.filter(c => c !== cat));
        } else {
            setCategories([...categories, cat]);
        }
    };

    // Reset form
    const resetForm = () => {
        setActivity("");
        setCategories([]);
        setStatus("Need to Complete");
    };

    return (
        <div className="job-manager">

            <h1>Job Manager</h1>
            <br />

            {/* Job form */}
            <form onSubmit={addJob} className="job-form">

                <p>Type: "Read Emails", "Send Emails", or "Web Parsing"</p>
                <p><b>Add new job:</b></p>

                {/* Activity input */}
                <input
                    type="text"
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                    placeholder="Enter job activity"
                />

                <p><br /><br />Click the corresponding category button</p>

                {/* Category toggles */}
                <div className="category-toggles">
                    <p><b>Categories:</b></p>
                    {categoryOptions.map((cat) => (
                        <button
                            type="button"
                            key={cat}
                            onClick={() => handleCategoryToggle(cat)}
                            className={categories.includes(cat) ? "selected" : ""}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <p><br /><br />Select the status of progress from the dropdown<br /><br />
                    then click "Add Job"
                </p>

                {/* Status select */}
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Need To Complete" status="Need to Complete">Need To Complete</option>
                    <option value="In Progress" status="In Progress">In Progress</option>
                    <option value="Completed" status="Completed">Completed</option>
                </select>

                <button type="submit" disabled={isSubmitDisabled}>Add Job</button>

                {/* Clear all jobs button */}
                <button
                    type="button"
                    className="clear-all"
                    onClick={clearAllJobs}
                >
                    Clear all jobs
                </button>
                <br /><br />
            </form>

            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

            <p>Your jobs will display below</p>
            <br />

            {/* Job columns */}
            <div className="job-columns">
                <JobStatusColumn title="Need To Complete" status="Need to Complete" jobs={jobs} deleteJob={deleteJob} />
                <br /><br />
                <JobStatusColumn title="In Progress" status="In Progress" jobs={jobs} deleteJob={deleteJob} />
                <br /><br />
                <JobStatusColumn title="Completed" status="Completed" jobs={jobs} deleteJob={deleteJob} />
                <br /><br />
            </div>
        </div>
    );
} 

function JobCard({ job, deleteJob }) {
    return (
        <div className="job-card">
            <h3>{job.activity}</h3>

            <div className="categories">
                {job.categories.map((cat, index) => (
                    <span key={index} className="category-tag">
                        {cat}
                    </span>
                ))}
            </div>

            {/* Delete button */}
            <button className="delete-button" onClick={() => deleteJob(job.id)}>
                Delete
            </button>
        </div>
    );
}

export default JobManager;
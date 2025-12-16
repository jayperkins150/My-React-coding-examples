import React, { useState } from "react";
import JobItem from "./JobItem";

const JobList = ({ jobs, onDeleteJob, onEditJob }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    // 1. Define the specific statuses that are allowed to be displayed
    const ALLOWED_STATUSES = ["Need to Start", "In Progress", "Completed"];

    // 2. Add "All" to the list of selectable statuses for the filter dropdown
    const filterOptions = ["All", ...ALLOWED_STATUSES];

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleStatusFilterChange = (e) => {
        setStatusFilter(e.target.value);
    };

    // Combined filtering logic
    const filteredJobs = jobs
        // Ensure only allowed statuses are included
        .filter(job => ALLOWED_STATUSES.includes(job.status))
        
        // Search bar and status filter
        .filter(job => {
            // Filter by search query
            const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase().trim());
            
            // Filter by selected status dropdown option
            const matchesStatus = statusFilter === "All" || job.status === statusFilter;
            
            return matchesSearch && matchesStatus;
        });

    return (
        <div className="job-list" style={{"maxWidth": "500px", "margin": "20px auto"}}>
            
            {/* Control Group for Filters */}
            <div style={{"display": "flex", "gap": "10px", "marginBottom": "20px"}}>
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Filter by title..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{"padding": "10px", "flexGrow": "1", "borderRadius": "4px", "border": "1px solid #ccc"}}
                />
                
                {/* Status Filter Dropdown */}
                <select
                    value={statusFilter}
                    onChange={handleStatusFilterChange}
                    style={{"padding": "10px", "borderRadius": "4px", "border": "1px solid #ccc"}}
                >
                    {/* Use filterOptions for the dropdown */}
                    {filterOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>

            </div>
            
            <br /><br />
            <h2>Current Jobs ({filteredJobs.length} visible)</h2>
            <br />

            <p>Use the filters above, or edit/delete below</p>
            <br />
            
            {filteredJobs.length === 0 && (
                <p style={{"fontStyle": "italic", "color": "#666", "marginTop": "20px"}}>
                    {"No jobs match your current criteria."}
                </p>
            )}

            {/* Render filtered jobs */}
            {filteredJobs.map((job) => (
                <JobItem 
                    key={job.id} 
                    job={job} 
                    onDelete={() => onDeleteJob(job.id)} 
                    onEdit={onEditJob}
                />
            ))}
            
        </div>
    );
};

export default JobList;
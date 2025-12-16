import React, { useState } from "react";

const JobItem = ({ job, onDelete, onEdit }) => {
    // State to manage the edit mode for this specific item
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(job.title);
    const [newStatus, setNewStatus] = useState(job.status);

    const statuses = ["Need To Start", "In Progress", "Completed"];

    const getStatusStyle = (status) => {
        switch (status.toLowerCase()) {
            case "completed":
                return {"backgroundColor": "#d1fae5", "color": "#065f46", "borderLeft": "5px solid #10b981"};
            case "in progress":
                return {"backgroundColor": "#fef3c7", "color": "#92400e", "borderLeft": "5px solid #f59e0b"};
            case "need to start":
            default:
                return {"backgroundColor": "#fee2e2", "color": "#991b1b", "borderLeft": "5px solid #ef4444"};
        }
    };

    const handleSave = () => {
        // Call the prop function passed from App.jsx to save changes
        onEdit(job.id, newTitle, newStatus);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="job-item editing" style={{"padding": "15px", "margin": "10px 0", "borderRadius": "4px", "border": "1px dashed #3b82f6"}}>
                <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    style={{"padding": "8px", "marginBottom": "10px", "width": "80%", "boxSizing": "border-box"}}
                />
                <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    style={{"padding": "8px", "marginBottom": "10px", "width": "80%", "boxSizing": "border-box"}}
                >
                    {statuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
                <button 
                    onClick={handleSave}
                    style={{"padding": "5px 10px", "backgroundColor": "#10b981", "color": "white", "border": "none", "borderRadius": "4px", "cursor": "pointer", "marginRight": "10px"}}
                >
                    Save
                </button>
                <button 
                    onClick={() => setIsEditing(false)}
                    style={{"padding": "5px 10px", "backgroundColor": "#6b7280", "color": "white", "border": "none", "borderRadius": "4px", "cursor": "pointer"}}
                >
                    Cancel
                </button>
            </div>
        );
    }

    return (
        <div 
            className="job-item" 
            style={{ 
                "padding": "10px", 
                "margin": "10px 0", 
                "borderRadius": "4px",
                "display": "flex",
                "justifyContent": "space-between",
                "alignItems": "center",
                "textAlign": "left",
                ...getStatusStyle(job.status)
            }}
        >
            <div>
                <h3>{job.title}</h3>
                <p style={{"fontSize": "0.9em", "fontStyle": "italic"}}>Status: {job.status}</p>
            </div>
            <div style={{"display": "flex", "gap": "10px"}}>
                {/* Edit Button */}
                <button 
                    onClick={() => setIsEditing(true)}
                    style={{"backgroundColor": "#3b82f6", "color": "white", "border": "none", "padding": "5px 10px", "borderRadius": "4px", "cursor": "pointer"}}
                >
                    Edit
                </button>
                {/* Delete Button */}
                <button 
                    onClick={onDelete}
                    style={{"backgroundColor": "#ef4444", "color": "white", "border": "none", "padding": "5px 10px", "borderRadius": "4px", "cursor": "pointer"}}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default JobItem;
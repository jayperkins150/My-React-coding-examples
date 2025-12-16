import React, { useState } from 'react';

const TicketForm = ({ onAddTicket }) => {
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("In Progress");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            onAddTicket(title.trim(), status);
            setTitle("");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{"maxWidth": "300px", "margin": "20px auto", "padding": "15px", "border": "1px solid #ddd", "borderRadius": "8px"}}>
            <h3>Add New Ticket</h3>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ticket Title"
                required
                style={{"width": "80%", "padding": "8px", "marginBottom": "10px"}}
            />
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{"width": "80%", "padding": "8px", "marginBottom": "15px"}}
            >
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Failed">Failed</option>
            </select>
            <button type="submit" style={{"padding": "10px 15px", "backgroundColor": "#2563eb", "color": "white", "border": "none", "borderRadius": "4px", "cursor": "pointer"}}>
                Add Ticket
            </button>
        </form>
    );
};

export default TicketForm;
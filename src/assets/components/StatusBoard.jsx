import React, { useState, useEffect } from "react";
import TicketInfo from "./TicketInfo";
import TicketForm from "./TicketForm";
import completedImage from "../images/completed.png";
import inProgressImage from "../images/in-progress.png";
import failedImage from "../images/failed.png";

const StatusBoard = () => {
    // State for tickets and detail view
    const [tickets, setTickets] = useState([
        {"id": 1, "title": "Setup database connection", "status": "Completed"},
        {"id": 2, "title": "Implement login screen", "status": "In Progress"},
        {"id": 3, "title": "Fix API authentication bug", "status": "Failed"},
        {"id": 4, "title": "Design new dashboard", "status": "In Progress"},
        {"id": 5, "title": "Write unit tests", "status": "Completed"},
        {"id": 6, "title": "Migrate cloud servers", "status": "In Progress"},
    ]);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [animatedId, setAnimatedId] = useState(null);

    // Dynamic Counts
    const statusCounts = tickets.reduce((acc, ticket) => {
        acc[ticket.status] = (acc[ticket.status] || 0) + 1;
        return acc;
    }, {"Completed": 0, "In Progress": 0, "Failed": 0});

    // Implement feature to add new tickets
    const handleAddTicket = (title, status) => {
        const newTicket = {"id": Date.now(), "title": title, "status": status};
        setTickets(prev => [...prev, newTicket]);
        setSelectedStatus(null);
    };

    // Status change simulation (with animation)
    const handleRandomStatusChange = () => {
        if (tickets.length === 0) return;

        // Find a ticket that is not yet completed
        const changeableTickets = tickets.filter(t => t.status !== "Completed");
        if (changeableTickets.length === 0) return;
        
        // Pick a random ticket and a random new status
        const randomIndex = Math.floor(Math.random() * changeableTickets.length);
        const ticketToChange = changeableTickets[randomIndex];
        const currentStatus = ticketToChange.status;
        
        let newStatus;
        if (currentStatus === "In Progress") {
            newStatus = Math.random() < 0.5 ? "Completed" : "Failed";
        } else if (currentStatus === "Failed") {
            newStatus = "In Progress"; // Retry
        } else {
            // Should not happen, but default to 'In Progress'
            newStatus = "In Progress"; 
        }

        setAnimatedId(ticketToChange.id); // Trigger animation on the changed ticket's row
        
        // Update the state
        setTickets(prev => prev.map(t => 
            t.id === ticketToChange.id ? {...t, "status": newStatus} : t
        ));

        // Clear animation trigger after 1 second
        setTimeout(() => setAnimatedId(null), 1000);
    };

    // Click handler to show more details
    const handleTicketInfoClick = (status) => {
        setSelectedStatus(prev => (prev === status ? null : status));
    };
    
    // Auto-change status every 5 seconds (for demo)
    useEffect(() => {
        const interval = setInterval(handleRandomStatusChange, 5000);
        return () => clearInterval(interval);
    }, [tickets]);

    const currentDetails = tickets.filter(t => t.status === selectedStatus);

    return (
        <div className="status-board" align="center" style={{"padding": "20px", "backgroundColor": "#f4f4f4"}}>
            <h1>Ticket Status Board</h1>
            <p>Click a box to see details, or use the form/button below to update.</p>
            <br />
            
            <div style={{"display": "flex", "justifyContent": "center"}}>
                <TicketInfo
                    result="Completed"
                    image={completedImage}
                    count={statusCounts["Completed"]}
                    onClick={() => handleTicketInfoClick("Completed")}
                    isAnimated={currentDetails.some(t => t.id === animatedId) && selectedStatus === "Completed"}
                >
                    <p>Tickets completed</p>
                </TicketInfo>

                <TicketInfo
                    result="In Progress"
                    image={inProgressImage}
                    count={statusCounts["In Progress"]}
                    onClick={() => handleTicketInfoClick("In Progress")}
                    isAnimated={currentDetails.some(t => t.id === animatedId) && selectedStatus === "In Progress"}
                >
                    <p>Tickets in progress</p>
                </TicketInfo>

                <TicketInfo
                    result="Failed"
                    image={failedImage}
                    count={statusCounts["Failed"]}
                    onClick={() => handleTicketInfoClick("Failed")}
                    isAnimated={currentDetails.some(t => t.id === animatedId) && selectedStatus === "Failed"}
                >
                    <p>Tickets failed</p>
                </TicketInfo>
            </div>

            {/* Ticket Details Panel */}
            {selectedStatus && (
                <div style={{"marginTop": "20px", "padding": "20px", "border": "1px solid #ddd", "maxWidth": "960px", "backgroundColor": "white", "borderRadius": "8px"}}>
                    <h2>Details for: {selectedStatus} ({currentDetails.length})</h2>
                    <ul style={{"listStyleType": "none", "padding": "0"}}>
                        {currentDetails.map(ticket => (
                            <li key={ticket.id} style={{"padding": "5px 0", "borderBottom": "1px dotted #eee", "textAlign": "left"}}>
                                Ticket #{ticket.id}: **{ticket.title}** {ticket.id === animatedId && <span style={{"marginLeft": "10px", "color": "blue"}}> (STATUS CHANGED!)</span>}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            
            <br />
            
            {/* Add Ticket Form */}
            <TicketForm onAddTicket={handleAddTicket} />

            <button 
                onClick={handleRandomStatusChange} 
                style={{"marginTop": "20px", "padding": "10px 20px", "backgroundColor": "#10b981", "color": "white", "border": "none", "borderRadius": "4px", "cursor": "pointer"}}
            >
                Simulate Random Status Change
            </button>
            <p style={{"marginTop": "10px", "fontSize": "0.8em", "color": "#666"}}>A ticket status changes randomly every 5 seconds (for demo purposes).</p>
        </div>
    );
};

export default StatusBoard;
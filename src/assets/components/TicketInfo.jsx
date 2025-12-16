import React from 'react';

// Added onClick and isAnimated props
const TicketInfo = ({ result, image, children, count, onClick, isAnimated }) => {
    const getBackgroundColor = () => {
        switch (result) {
            case "Completed":
                return "lightgreen";
            case "In Progress":
                return "yellow";
            case "Failed":
                return "darkorange";
            default:
                return "black";
        }
    };

    return (
        <div
            className={`ticket-info ${isAnimated ? "animate-status-change" : ""}`}
            onClick={onClick}
            style={{
                "border": "1px solid #ccc",
                "padding": "15px",
                "backgroundColor": getBackgroundColor(),
                "textAlign": "center",
                "width": "300px",
                "margin": "10px",
                "cursor": "pointer",
                "transition": "background-color 0.5s ease, transform 0.2s ease",
                "transform": isAnimated ? "scale(1.05)" : "scale(1)",
                "boxShadow": "0 4px 8px rgba(0,0,0,0.1)",
            }}
        >
            <br />
            <img
                src={image}
                alt={result}
                style={{"width": "50px"}}
            />

            <div className="ticket">
                {children}
            </div>

            {count !== undefined && (
                <p style={{"fontSize": "2em", "fontWeight": "bold", "marginTop": "10px"}}>{count}</p>
            )}
        </div>
    );
};

export default TicketInfo;
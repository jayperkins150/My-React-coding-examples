import React, { useState } from 'react';

const StyledButton = () => {
    // Toggleable button state
    const [isDisabled, setIsDisabled] = useState(false);
    const [isActive, setIsActive] = useState(true);
    
    // Base button style
    const baseButtonStyle = {
        padding: "20px",
        width: "300px",
        color: "white",
        cursor: "pointer",
        fontSize: "10pt",
        border: "none",
        borderRadius: "30px",
    };

    // Active button style
    const activeButtonStyle = {
        backgroundColor: "blue",
    };

    // Disabled button style
    const disabledButtonStyle = {
        backgroundColor: "gray",
    };

    // Dynamically combine styles
    const buttonStyle = 
        isDisabled
            ? { ...baseButtonStyle, ...disabledButtonStyle }
            : isActive
            ? { ...baseButtonStyle, ...activeButtonStyle }
            : { ...baseButtonStyle, backgroundColor: "gray" };
    
    // Function to toggle disabled and active state
    const handleClick = () => {
        if (isDisabled) {
            setIsDisabled(false);
            setIsActive(true);
        } else {
            setIsDisabled(true);
            setIsActive(false);
        }
    };

    // Button hover effects
    const handleMouseEnter = (e) => {
        if (isDisabled || isActive) e.target.style.backgroundColor = "black";
    };

    const handleMouseLeave = (e) => {
        if (isDisabled) {
            e.target.style.backgroundColor = "gray";
        } else {
            e.target.style.backgroundColor = "blue";
        }
    };

    return (
        <div>
            <h1>Reactive Button</h1>
            <br />
            <p>Click the button below to change its status</p>
            <br />

            <button
                style={buttonStyle}
                disabled={false}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {isDisabled ? "Click to activate this button" : "Click to disable this button"}
            </button>
            <br></br>
            <br></br>
        </div>
    );
};

export default StyledButton;
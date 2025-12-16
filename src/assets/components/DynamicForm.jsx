import React, { useState } from 'react';

const DynamicForm = () => {
    console.log("Component rendered");

    const [inputValue, setInputValue] = useState("");
    const [submittedItems, setSubmittedItems] = useState([]);
    const [error, setError] = useState("");

    const handleInputChange = (event) => {
        console.log("Input changed");
        const value = event.target.value;
        setInputValue(value);

        if (inputValue.length < 2) {
            setError("Input must be at least 2 characters");
        } else {
            setError("");
        }
    };

    const handleReset = () => {
        console.log("Input reset");
        setInputValue("");
        setError("");
    };

    const handleSubmit = () => {
        console.log("Form submitted");
        if (inputValue.length < 2) {
            setError("Input must be at least 2 characters");
            return;
        }
        setSubmittedItems([...submittedItems, inputValue]);
        setInputValue("");
    };

    return(
        <div>
            <h1>Dynamic Form</h1>
            <br />
            <p>Type anything and click "Submit" to add an item below</p>
            <br />

            <input
                name="input"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter input"
            />

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <br /><br />
            <button
                onClick={handleReset}
            >
                Reset
            </button>

            <button
                onClick={handleSubmit}
            >
                Submit
            </button>
            <br /><br />

            <div>
                <h2>Current input:</h2>
                <p>{inputValue}<br />Character count: {inputValue.length}</p>
            </div>
            <br /><br />

            <div>
                <h2>Submitted items:</h2>
                <ul className="list-disc ml-5">
                    {submittedItems.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
            <br />
        </div>
    );
};

export default DynamicForm;
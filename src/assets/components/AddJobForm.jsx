import React, { useState} from 'react';

const AddJobForm = ({ addNewJob }) => {
    const [title, setTitle] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        addNewJob(title);
        setTitle("");
    };

    return (
        <form onSubmit={handleSubmit} className="add-job-form">
            <br />
            <input
                type="text"
                value={title}
                placeholder="Enter job title"
                onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit">Add job</button>
        </form>
    );
};

export default AddJobForm;

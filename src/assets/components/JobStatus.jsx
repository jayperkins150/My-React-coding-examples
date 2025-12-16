import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

// Accept 'index' as a prop
const JobStatus = ({ job, deleteJob, updateJobStatus, index }) => {
    return (
        <Draggable draggableId={String(job.id)} index={index}>
            {(provided, snapshot) => (
                <div
                    className="job-status-item"
                    // Attach props to the root DOM element
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    // Attach drag handle props to the element the user grabs
                    {...provided.dragHandleProps} 
                    style={{
                        // Drag styles for visual feedback
                        backgroundColor: snapshot.isDragging ? '#e6f7ff' : 'white',
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        marginBottom: '8px',
                        ...provided.draggableProps.style, 
                    }}
                >
                    <p>{job.title}</p>
                    <select
                        value={job.status}
                        onChange={(e) => updateJobStatus(job.id, e.target.value)}
                    >
                        <option value="Need to Start">Need to start</option>
                        <option value="In Progress">In progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <button onClick={() => deleteJob(job.id)}>Delete</button>
                    <br /><br />
                </div>
            )}
        </Draggable>
    );
};

export default JobStatus;

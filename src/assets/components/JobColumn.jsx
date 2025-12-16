import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import JobStatus from './JobStatus';

const JobColumn = ({ title, image, alt, jobs, droppableId, deleteJob, updateJobStatus }) => {
    return (
        <div className="job-column">
            <div className="heading-status">
                <br />
                <img src={image} style={{ "width": 100 }} alt={alt} className="status-image" />
                <br />
                <h3>{title}: ({jobs.length})</h3>
                <br />
            </div>

            <Droppable 
                droppableId={droppableId}
                isDropDisabled={false}
                isCombineEnabled={false}
                ignoreContainerClipping={false}
            >
                {(provided, snapshot) => (
                    <div
                        className="job-items"
                        ref={provided.innerRef} // Attach innerRef to the list container
                        {...provided.droppableProps} // Attach droppableProps
                        style={{
                            "backgroundColor": snapshot.isDraggingOver ? "#e0e0e0" : "#f4f4f4",
                            "padding": "8px",
                            "minHeight": "200px"
                        }}
                    >
                        {jobs && jobs.length > 0 ? (
                            jobs.map((job, index) => (
                                // Render the Draggable component
                                <JobStatus
                                    key={job.id}
                                    job={job}
                                    index={index}
                                    deleteJob={deleteJob}
                                    updateJobStatus={updateJobStatus}
                                />
                            ))
                        ) : (
                            <p className="empty text">No jobs in this column.</p>
                        )}
                        {/* Placeholder */}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default JobColumn;
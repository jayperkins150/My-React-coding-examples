import React, { useState, useEffect } from 'react';
import './App.css';
import { DragDropContext } from 'react-beautiful-dnd'; 

import Header from './assets/components/Header';
import VariableDisplay from './assets/components/VariableDisplay';
import ProfileCard from './assets/components/ProfileCard';

import JobManager from './assets/components/JobManager';
import JobColumn from './assets/components/JobColumn';

import JobCounter from './assets/components/JobCounter';
import AdvancedJobCounter from './assets/components/AdvancedJobCounter';
import StyledButton from './assets/components/StyledButton';
import JobForm from './assets/components/JobForm';
import StatusBoard from './assets/components/StatusBoard';
import toDoImage from './assets/images/to-do.png';
import completedImage from './assets/images/completed.png';
import inProgressImage from './assets/images/in-progress.png';
import DynamicForm from './assets/components/DynamicForm';
import JobBoard from './assets/components/JobBoard';
import BotListManager from './assets/components/BotListManager';
import DynamicBotManager from './assets/components/DynamicBotManager';

import AddJobForm from './assets/components/AddJobForm';
import JobList from './assets/components/JobList';
import Footer from './assets/components/Footer';

// Local Storage Key
const STORAGE_KEY = "kanbanJobList";

// Initial Job Data (Used only if local storage is empty)
const initialJobs = [
    { id: 1, title: "Email Extractor", status: "Need to Start" }, // Set to a valid column status
    { id: 2, title: "Data Analyser", status: "Completed" },
    { id: 3, title: "Report Generator", status: "In Progress" }, // Set to a valid column status
    { id: 4, title: "Read Emails", status: "To Do" },
    { id: 5, title: "Web Parsing", status: "In Progress" },
    { id: 6, title: "Send Report", status: "Done" },
    { id: 7, title: "Parse Emails", status: "Need to Start" },
    { id: 8, title: "SAP Extraction", status: "In Progress" },
    { id: 9, title: "Generate Report", status: "Completed" }
];

// Helper function to load state from Local Storage
const loadJobsFromStorage = () => {
    try {
        const storedJobs = localStorage.getItem(STORAGE_KEY);
        // Correcting any legacy data that might be using "Running" if the new mapping is "In Progress"
        if (storedJobs) {
            const parsedJobs = JSON.parse(storedJobs);
            return parsedJobs.map(job => ({
                ...job,
                status: job.status === "Running" ? "In Progress" : job.status
            }));
        }
        return initialJobs;
    } catch (e) {
        console.error("Failed to load jobs from local storage:", e);
        return initialJobs;
    }
};

const App = () => {
    const profiles = [ 
        {
            image: "https://i.postimg.cc/CM7ZJ6qy/d1f4dcc1-0e03-4fe7-b08d-b4f1c6de35b2.jpg",
            name: "Jay Perkins",
            jobTitle: "Graphic Web Designer",
            bio: "Creating intuitive and stylish websites and user interfaces is what I do. My work combines my Front End Web Developer skills with over a decade of Graphic Design experience.",
            skills: ["React", "JavaScript", "Tailwind CSS", "HTML", "Graphic Design", "UI/UX"],
        },
    ];

    const [showList, setShowList] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Initialize state from Local Storage
    const [jobs, setJobs] = useState(loadJobsFromStorage);
    
    // Effect to save state to Local Storage whenever jobs change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
    }, [jobs]);


    // Define column status mappings for DND
    const columnMap = {
        // Renamed To Do -> column-need-to-start
        "column-need-to-start": ["Need to Start", "To Do"], 
        "column-in-progress": ["In Progress", "Running"],
        "column-done": ["Completed", "Done"],
    };

    // Drag-and-drop handler
    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        const newColumnId = destination.droppableId;
        const targetStatuses = columnMap[newColumnId];
        // Select the primary status for the new column (e.g., "Need to Start" for the first column)
        const newStatus = targetStatuses ? targetStatuses[0] : "Need to Start"; 
        
        const jobId = Number(draggableId);
        
        // Update the job status
        setJobs(prevJobs => prevJobs.map(job => 
            job.id === jobId 
                ? { ...job, status: newStatus } 
                : job
        ));
    };
    
    // Delete jobs
    const deleteJob = (id) => {
        setJobs(prev => prev.filter(job => job.id !== id));
    };
    
    const handleDeleteJob = (id) => {
        setJobs(prev => prev.filter(job => job.id !== id));
    };

    // Update job status
    const updateJobStatus = (id, newStatus) => {
        setJobs((prev) =>
            prev.map(job =>
                job.id === id
                    ? { ...job, status: newStatus }
                    : job
            )
        );
    };

    // Add new job
    const addNewJob = (title) => {
        const newJob = {
            id: Date.now(),
            title,
            status: "Need to Start"
        };
        setJobs(prev => [...prev, newJob]);
    };

    // Global Filter Logic (Used for the optional filter/search bar)
    const filteredJobs = jobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        job.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // DND STABILITY FIX: Function to filter jobs for DND (Status-only)
    const getJobsForColumnForDND = (statusList) => {
        // Uses the full 'jobs' list to maintain stability for DND
        return jobs.filter(job => 
            statusList.includes(job.status)
        );
    };

    // Function to filter jobs for each column (Status + Search Term) - NOT USED FOR DND
    const getJobsForColumn = (statusList) => {
        return filteredJobs.filter(job => 
            statusList.includes(job.status)
        );
    };

    return (
        <div className="App">
            <Header/>
            <VariableDisplay/>
            <br /><br />
            {/* Profile Cards */}
            {profiles.map((profile, index) => (
                <ProfileCard
                    key={index}
                    image={profile.image}
                    name={profile.name}
                    jobTitle={profile.jobTitle}
                    bio={profile.bio}
                    skills={profile.skills}
                />
            ))}
            <br /><br />
            <JobManager/>
            <br /><br />
            
            {/* Unified Kanban Board Section */}
            <h1>Edit Job Status</h1>
            <br />
            
            {/* Add New Jobs Form (Rendered once) */}
            <h2>Add New Job</h2>
            <p>Enter a job with at least 2 characters and it will be added to "Need to Start"</p>
            <AddJobForm addNewJob={addNewJob} /> 
            <br /><br />

            {/* Search Bar Implementation (Rendered once) */}
            <input
                type="text"
                placeholder="Search jobs by title or status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{"padding": "10px", "width": "80%", "marginBottom": "20px", "borderRadius": "4px", "border": "1px solid #ccc"}}
            />
            <p>Change the progress of a job below or delete it</p>
            <br />
            
            {/* DragDropContext wraps the column container */}
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="job-columns"> 
                    
                    {/* Need to start Column */}
                    <JobColumn 
                        title="Need to start" 
                        image={toDoImage} 
                        alt="To do image"
                        jobs={getJobsForColumnForDND(columnMap["column-need-to-start"])}
                        droppableId="column-need-to-start" 
                        deleteJob={deleteJob}
                        updateJobStatus={updateJobStatus}
                    />
                    <br />

                    {/* In progress Column */}
                    <JobColumn 
                        title="In progress" 
                        image={inProgressImage} 
                        alt="In progress image"
                        // *** FIX APPLIED HERE: Using correct status map key for DND ***
                        jobs={getJobsForColumnForDND(columnMap["column-in-progress"])}
                        droppableId="column-in-progress" 
                        deleteJob={deleteJob}
                        updateJobStatus={updateJobStatus}
                    />
                    <br />

                    {/* Done/Completed Column */}
                    <JobColumn 
                        title="Done" 
                        image={completedImage} 
                        alt="Done image"
                        // *** FIX APPLIED HERE: Using correct status map key for DND ***
                        jobs={getJobsForColumnForDND(columnMap["column-done"])}
                        droppableId="column-done" 
                        deleteJob={deleteJob}
                        updateJobStatus={updateJobStatus}
                    />
                    <br />
                </div>
            </DragDropContext>
            <br /><br />
            <StatusBoard/>
            <br /><br />
            <JobForm/>
            <br /><br />
            <JobBoard/>
            <br /><br />
            <JobCounter/>
            <br /><br />
            <AdvancedJobCounter/>
            <br /><br />
            <StyledButton/>
            <br /><br />
            <DynamicForm/>
            <br /><br />
            <BotListManager/>
            <br /><br />
            <DynamicBotManager/>
            <br /><br />

            {/* Job List section */}
            <h1>Post a Job</h1>
            <br />
            <p>Enter a job with at least 2 characters and it will be added to the bottom of the list below</p>
            <AddJobForm addNewJob={addNewJob} /> 
            <br /><br />
            
            {/* Show/hide jobs toggle */}
            <button 
                onClick={() => setShowList(!showList)}
                style={{"padding": "10px 20px", "backgroundColor": showList ? "#f59e0b" : "#10b981", "color": "white", "border": "none", "borderRadius": "4px", "cursor": "pointer", "marginBottom": "20px"}}
            >
                {showList ? "Hide Job List" : "Show Job List"}
            </button>
            
            {showList && (
                <JobList 
                    jobs={jobs} 
                    onDeleteJob={handleDeleteJob} 
                />
            )}
            <br /><br />
            <Footer/>
        </div>
    );
};

export default App;
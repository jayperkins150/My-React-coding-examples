import React, { useState } from 'react';

const BotListManager = () => {
    const [botList, setBots] = useState([
        { id: 1, name: "Email extractor", status: "Running", task: "Extracting emails" },
        { id: 2, name: "Notification sender", status: "Completed", task: "Sending notifications" },
        { id: 3, name: "Data analyser", status: "Stopped", task: "Analysing data" },
    ]);

    // State for the new bot form inputs
    const [newBotName, setNewBotName] = useState("");
    const [newBotTask, setNewBotTask] = useState("");

    // State for filtering
    const [statusFilter, setStatusFilter] = useState("All");

    // Add new bot
    const handleAddBot = (e) => {
        e.preventDefault(); // Prevent the default form submission (page reload)

        if (!newBotName.trim() || !newBotTask.trim()) {
            alert("Please enter both Bot Name and Task.");
            return;
        }

        const newBot = {
            id: Date.now(), // Unique ID based on timestamp
            name: newBotName,
            status: "Stopped", // New bots start as 'Stopped'
            task: newBotTask,
        };

        setBots((prevBots) => [...prevBots, newBot]);
        
        // Reset form fields
        setNewBotName("");
        setNewBotTask("");
    };
    
    // Delete bot
    const handleDeleteBot = (id) => {
        setBots((prevBots) => prevBots.filter((bot) => bot.id !== id));
    };

    const triggerJob = (id) => {
        setBots((prevBots) =>
            prevBots.map((bot) =>
                bot.id === id
                    ? {
                        ...bot,
                        status: bot.status === "Running" ? "Stopped" : "Running",
                      }
                    : bot
            )
        );
    };

    const hiddenClasses = "text-blue-500 text-green-500 text-red-500";

    const getStatusColor = (status) => {
        switch (status) {
            case "Running":
                return "text-blue-500 font-bold";
            case "Completed":
                return "text-green-500 font-bold";
            case "Stopped":
                return "text-red-500 font-bold";
            default:
                return "text-black-500";
        }
    };

    // Filtered bot list
    const filteredBotList = botList.filter((bot) => {
        if (statusFilter === "All") {
            return true;
        }
        return bot.status === statusFilter;
    });

    return (
        <div>
            <div className={`hidden ${hiddenClasses}`} />
            <h1>Bot List Manager</h1>
            <br />
            <p>Change the status of a task by clicking "Trigger Job" below</p>
            <br />
            
            {/* New bot form */}
            <h2>Add New Bot</h2>
            <form onSubmit={handleAddBot} style={{ marginBottom: "20px", padding: "15px", border: "1px solid #ccc", borderRadius: "5px" }}>
                <input
                    type="text"
                    placeholder="Bot Name (e.g., File Cleaner)"
                    value={newBotName}
                    onChange={(e) => setNewBotName(e.target.value)}
                    style={{ marginRight: "10px", padding: "8px", border: "1px solid #aaa" }}
                />
                <input
                    type="text"
                    placeholder="Task Description (e.g., Deleting old logs)"
                    value={newBotTask}
                    onChange={(e) => setNewBotTask(e.target.value)}
                    style={{ marginRight: "10px", padding: "8px", border: "1px solid #aaa" }}
                />
                <button type="submit" style={{ padding: "8px 15px", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                    Add Bot
                </button>
            </form>

            {/* Bot filter */}
            <h2>Filter Bots</h2>
            <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ marginBottom: "20px", padding: "8px", border: "1px solid #aaa" }}
            >
                <option value="All">Show All</option>
                <option value="Running">Running</option>
                <option value="Completed">Completed</option>
                <option value="Stopped">Stopped</option>
            </select>
            <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                Total Bots: {filteredBotList.length} / {botList.length}
            </p>

            {/* Bot list display */}
            <ul style={{ listStyle: "none", padding: 0 }}>
                {filteredBotList.map((bot) => ( // Render the filtered list
                    <li
                        key={bot.id}
                        style={{ border: "1px solid #eee", padding: "15px", marginBottom: "10px", borderRadius: "5px" }}
                    >
                        <div>
                            <p>
                                <b>Bot ID: {bot.id}</b>
                                <br />
                                Name: {bot.name}
                                <br />
                                Status: 
                                <span className={getStatusColor(bot.status)}> {bot.status}</span>
                                <br />
                                Task: {bot.task}
                                <br />
                            </p>
                        </div>
                        
                        <div style={{ marginTop: "10px" }}>
                            <button 
                                onClick={() => triggerJob(bot.id)}
                                style={{ marginRight: "10px", padding: "5px 10px", backgroundColor: "#4ade80", border: "none", cursor: "pointer" }}
                            >
                                Trigger Job
                            </button>
                            
                            {/* Delete bot button */}
                            <button 
                                onClick={() => handleDeleteBot(bot.id)}
                                style={{ padding: "5px 10px", backgroundColor: "#ef4444", color: "white", border: "none", cursor: "pointer" }}
                            >
                                Delete Bot
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BotListManager;
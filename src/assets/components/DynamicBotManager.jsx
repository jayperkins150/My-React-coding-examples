import React, { useState } from 'react';

const DynamicBotManager = () => {
    const [bots, setBots] = useState([
        { id: "1", name: "Email bot", status: "Active" },
        { id: "2", name: "Data bot", status: "Inactive" },
    ]);

    const [newBot, setNewBot] = useState({ id: "", name: "", status: "" });
    const [error, setError] = useState("");
    const [editingBotId, setEditingBotId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        
        if (editingBotId) {
            // If in EDIT mode, update the specific bot in the main bots array.
            setBots(prevBots => prevBots.map(bot => 
                bot.id === editingBotId 
                    ? { ...bot, [name]: value } // Update the field being typed
                    : bot
            ));
        } else {
            // If NOT in edit mode, update the 'newBot' form state.
            setNewBot((prev) => ({ ...prev, [name]: value }));
        }
    };
    // -------------------------

    const addBotToList = () => {
        if (!newBot.id || !newBot.name || !newBot.status) {
            setError("All fields must be filled");
            return;
        }

        // Prevent duplicate IDs
        if (bots.some(bot => bot.id === newBot.id)) {
            setError("Bot ID must be unique.");
            return;
        }

        setBots((prev) => [...prev, newBot]);
        setNewBot({ id: "", name: "", status: "" });
        setError("");
    };

    const deleteBot = (id) => {
        setBots((prev) => prev.filter((bot) => bot.id !== id));
    };

    const startEdit = (id) => {
        // Disable form input while editing is active
        setEditingBotId(id);
    };

    const stopEdit = () => {
        setEditingBotId(null);
        setError("");
    };

    const isEditing = (id) => editingBotId === id;

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter the bot list based on the search query
    const filteredBots = bots.filter(bot => {
        const query = searchQuery.toLowerCase().trim();
        
        if (query === "") {
            return true;
        }

        return (
            bot.id.toLowerCase().includes(query) ||
            bot.name.toLowerCase().includes(query) ||
            bot.status.toLowerCase().includes(query)
        );
    });

    return (
        <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <h1>Dynamic Bot Manager</h1>
            <p>Add, edit or delete a bot below</p>
            <br />

            {/* Add new bot form (Disabled during editing) */}
            <div style={{ opacity: editingBotId ? 0.5 : 1, pointerEvents: editingBotId ? "none" : "auto" }}>
                <h2>Add New Bot</h2>
                <input
                    type="text"
                    name="id"
                    value={newBot.id}
                    onChange={handleInputChange}
                    placeholder="Bot ID"
                    style={{ marginRight: "10px", padding: "5px" }}
                />
                <input
                    type="text"
                    name="name"
                    value={newBot.name}
                    onChange={handleInputChange}
                    placeholder="Bot name"
                    autoComplete="off"
                    style={{ marginRight: "10px", padding: "5px" }}
                />
                <input
                    type="text"
                    name="status"
                    value={newBot.status}
                    onChange={handleInputChange}
                    placeholder="Bot status"
                    style={{ marginRight: "10px", padding: "5px" }}
                />
                <br /><br />
                
                <button
                    onClick={addBotToList}
                    style={{ padding: "5px 10px", backgroundColor: "#4ade80", border: "none", cursor: "pointer" }}
                >
                    Add bot
                </button>
                <br /><br />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            <hr />

            {/* Search input */}
            <h2>Bot List ({filteredBots.length} visible)</h2>
            <input
                type="text"
                placeholder="Search bots by ID, Name, or Status..."
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ marginBottom: "20px", padding: "8px", width: "80%", border: "1px solid #aaa" }}
            />
            
            {/* Bot list display */}
            <ul style={{ listStyle: "none", padding: 0 }}>
                {filteredBots.map((bot) => ( // Render the filtered list
                    <li 
                        key={bot.id} 
                        style={{ border: isEditing(bot.id) ? "2px solid gold" : "1px solid #eee", padding: "15px", marginBottom: "10px", borderRadius: "5px" }}
                    >
                        {/* Conditional Rendering for Edit/Display */}
                        {isEditing(bot.id) ? (
                            // EDIT MODE: Display input fields
                            <div className="edit-mode">
                                <label>ID: {bot.id}</label> 
                                <br />
                                <label>Name: 
                                    <input 
                                        type="text" 
                                        name="name" 
                                        value={bot.name} 
                                        onChange={handleInputChange}
                                        style={{ marginLeft: "5px", padding: "3px" }}
                                    />
                                </label>
                                <br />
                                <label>Status: 
                                    <input 
                                        type="text" 
                                        name="status" 
                                        value={bot.status} 
                                        onChange={handleInputChange}
                                        style={{ marginLeft: "5px", padding: "3px" }}
                                    />
                                </label>
                            </div>
                        ) : (
                            // DISPLAY MODE: Display text
                            <div>
                                <p>
                                    ID: {bot.id}
                                    <br />
                                    Name: {bot.name}
                                    <br />
                                    Status: {bot.status}
                                </p>
                            </div>
                        )}

                        <div style={{ marginTop: "10px" }}>
                            {isEditing(bot.id) ? (
                                <button 
                                    onClick={stopEdit}
                                    style={{ padding: "5px 10px", backgroundColor: "#3b82f6", color: "white", border: "none", cursor: "pointer", marginRight: "10px" }}
                                >
                                    Save/Done
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={() => startEdit(bot.id)}
                                        style={{ padding: "5px 10px", backgroundColor: "gold", border: "none", cursor: "pointer", marginRight: "10px" }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteBot(bot.id)}
                                        style={{ padding: "5px 10px", backgroundColor: "#ef4444", color: "white", border: "none", cursor: "pointer" }}
                                    >
                                        Delete
                                    </button>
                                </>
                            )}
                        </div>
                        <br />
                    </li>
                ))}
                {filteredBots.length === 0 && <p style={{ fontStyle: "italic", color: "#666" }}>No bots match your search criteria.</p>}
            </ul>
        </div>
    );
};

export default DynamicBotManager;
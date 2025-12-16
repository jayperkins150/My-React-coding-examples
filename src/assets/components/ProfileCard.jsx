import React from 'react';

function ProfileCard({image, name, jobTitle, bio, skills}) {
    return (
        <div className="profile-card">
            <h1>My Profile Card</h1>
            <br />
            <p>This profile card is a reusable component that plugs data from App.jsx</p>
            <br /><br />

            <img src={image} alt={name} className="profile-image" />
            <div className="profile-info">
                <h2 className="name">{name}</h2>
                <h3 className="job-title">{jobTitle}</h3>
                <p className="bio">{bio}</p>
                <br />
                <div className="skills-container"> 
                    {/* Check if skills is an array before mapping */}
                    {Array.isArray(skills) && skills.map((skill, index) => (
                        <span key={index} className="skill-tag">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;


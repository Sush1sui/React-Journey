import React from "react";

export default function Skill({ skill, emoji, bgcolor }) {
    return (
        <div className="skill" style={{ backgroundColor: bgcolor }}>
            <span>{skill}</span>
            <span>{emoji}</span>
        </div>
    );
}

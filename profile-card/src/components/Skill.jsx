import React from "react";

export default function Skill({ skill, level, bgcolor }) {
    return (
        <div className="skill" style={{ backgroundColor: bgcolor }}>
            <span>{skill}</span>
            <span>
                {level === "advanced" && "💪"}
                {level === "intermediate" && "👍"}
                {level === "beginner" && "👶"}
            </span>
        </div>
    );
}

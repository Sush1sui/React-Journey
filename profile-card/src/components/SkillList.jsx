import React from "react";
import Skill from "./Skill";

const skills = [
    {
        skill: "HTML + CSS",
        level: "advanced",
        color: "cornflowerblue",
    },
    {
        skill: "JavaScript",
        level: "advanced",
        color: "darkorange",
    },
    {
        skill: "NodeJS",
        level: "intermediate",
        color: "MediumSeaGreen",
    },
    {
        skill: "ReactJS",
        level: "intermediate",
        color: "cyan",
    },
    {
        skill: "Python",
        level: "beginner",
        color: "royalblue",
    },
    {
        skill: "PHP",
        level: "beginner",
        color: "slateblue",
    },
    {
        skill: "MySQL",
        level: "intermediate",
        color: "darkcyan",
    },
    {
        skill: "MongoDB",
        level: "intermediate",
        color: "forestgreen",
    },
    {
        skill: "Git and GitHub",
        level: "beginner",
        color: "tomato",
    },
];

export default function SkillList() {
    return (
        <div className="skill-list">
            {skills.map((skill) => (
                <Skill
                    skill={skill.skill}
                    level={skill.level}
                    bgcolor={skill.color}
                />
            ))}
        </div>
    );
}

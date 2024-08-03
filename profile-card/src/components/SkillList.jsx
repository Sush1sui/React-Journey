import React from "react";
import Skill from "./Skill";

export default function SkillList() {
    return (
        <div className="skill-list">
            <Skill skill="HTML + CSS" emoji="💪" bgcolor="CornflowerBlue" />
            <Skill skill="JavaScript" emoji="💪" bgcolor="darkorange" />
            <Skill skill="NodeJS" emoji="👍" bgcolor="MediumSeaGreen" />
            <Skill skill="ReactJS" emoji="👍" bgcolor="cyan" />
            <Skill skill="Python" emoji="👶" bgcolor="royalblue" />
            <Skill skill="PHP" emoji="👶" bgcolor="slateblue" />
            <Skill skill="MySQL" emoji="👍" bgcolor="DarkCyan" />
            <Skill skill="MongoDB" emoji="👍" bgcolor="forestgreen" />
            <Skill skill="Git and Github" emoji="👶" bgcolor="tomato" />
        </div>
    );
}

import React from "react";

export default function FlashCard({
    id,
    question,
    answer,
    setActiveCard,
    activeCard,
}) {
    const handleClick = () => {
        if (id === activeCard) {
            setActiveCard(null);
        } else {
            setActiveCard(id);
        }
    };
    return (
        <div
            className={id === activeCard ? "selected" : ""}
            onClick={handleClick}
        >
            {id === activeCard ? answer : question}
        </div>
    );
}

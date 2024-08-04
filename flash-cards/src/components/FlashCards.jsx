import React from "react";
import FlashCard from "./FlashCard";

export default function FlashCards({ questions, setActiveCard, activeCard }) {
    return (
        <div className="flashcards">
            {questions.map((q) => (
                <FlashCard
                    key={q.id}
                    id={q.id}
                    question={q.question}
                    answer={q.answer}
                    setActiveCard={setActiveCard}
                    activeCard={activeCard}
                />
            ))}
        </div>
    );
}

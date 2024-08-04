import React from "react";

export default function Message({ count, date, handleReset }) {
    return (
        <p>
            <span>
                {count === 0
                    ? "Today is "
                    : count > 0
                    ? `${count} days from today is `
                    : `${Math.abs(count)} days ago was `}
            </span>
            <span>{date.toDateString()}</span>
            <br />
            <br />
            {count !== 0 && <button onClick={handleReset}>Reset</button>}
        </p>
    );
}

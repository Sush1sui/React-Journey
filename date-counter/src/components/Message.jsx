import React from "react";

export default function Message({ count, date }) {
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
        </p>
    );
}

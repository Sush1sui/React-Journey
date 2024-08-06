import React from "react";

export default function Bill({ bill, handleChange }) {
    return (
        <>
            <input
                type="text"
                value={isNaN(bill) || bill === "" ? 0 : bill}
                onChange={handleChange}
            />
        </>
    );
}

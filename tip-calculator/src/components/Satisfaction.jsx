import React from "react";

export default function Satisfaction({ tip, handleChange }) {
    return (
        <>
            <select value={tip} onChange={handleChange}>
                <option value={0}>Dissatisfied (0%)</option>
                <option value={0.05}>It was okay (5%)</option>
                <option value={0.1}>It was good (10%)</option>
                <option value={0.2}>Absolutely amazing! (20%)</option>
            </select>
        </>
    );
}

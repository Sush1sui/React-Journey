import React from "react";

export default function Navbar({ movies, query, handleSetQuery }) {
    const handleChange = (e) => handleSetQuery(e.target.value);
    return (
        <nav className="nav-bar">
            <div className="logo">
                <span role="img">🍿</span>
                <h1>usePopcorn</h1>
            </div>
            <input
                className="search"
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={handleChange}
            />
            <p className="num-results">
                Found <strong>{movies.length}</strong> results
            </p>
        </nav>
    );
}

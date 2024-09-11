import React, { useEffect, useRef, useState } from "react";
import { MovieData } from "../models/models";
import { useKey } from "../hooks/useKey";

type Props = {
    movies: MovieData[];
    query: string;
    handleSetQuery: React.Dispatch<React.SetStateAction<string>>;
};

export default function Navbar({ movies, query, handleSetQuery }: Props) {
    const inputEl = useRef<HTMLInputElement>(null);

    useKey("Enter", function () {
        if (document.activeElement === inputEl.current) return;
        inputEl.current?.focus();
        handleSetQuery("");
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        handleSetQuery(e.target.value);

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
                ref={inputEl}
            />
            <p className="num-results">
                Found <strong>{movies.length}</strong> results
            </p>
        </nav>
    );
}

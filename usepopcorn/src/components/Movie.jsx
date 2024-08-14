import React from "react";

export default function Movie({ movie, children }) {
    return (
        <li key={movie.imdbID}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>{children}</p>
            </div>
        </li>
    );
}

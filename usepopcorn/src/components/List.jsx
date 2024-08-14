import React from "react";
import Movie from "./Movie";

export default function List({ isWatchedList, movies }) {
    return (
        <ul className="list">
            {movies?.map((movie) => (
                <Movie movie={movie}>
                    {!isWatchedList ? (
                        <>
                            <span>🗓</span>
                            <span>{movie.Year}</span>
                        </>
                    ) : (
                        <>
                            <p>
                                <span>⭐️</span>
                                <span>{movie.imdbRating}</span>
                            </p>
                            <p>
                                <span>🌟</span>
                                <span>{movie.userRating}</span>
                            </p>
                            <p>
                                <span>⏳</span>
                                <span>{movie.runtime} min</span>
                            </p>
                        </>
                    )}
                </Movie>
            ))}
        </ul>
    );
}

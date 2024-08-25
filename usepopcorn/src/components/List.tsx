import React from "react";
import Movie from "./Movie";
import { MovieData, WatchedData } from "../models/models";

type Props = {
    movies: MovieData[] | WatchedData[];
};

export default function List({ movies }: Props) {
    function isWatchedData(
        movie: MovieData | WatchedData
    ): movie is WatchedData {
        return (movie as WatchedData).runtime !== undefined;
    }
    return (
        <ul className="list">
            {movies &&
                movies.map((movie: MovieData | WatchedData, i: number) => (
                    <Movie movie={movie} key={i}>
                        {!isWatchedData(movie) ? (
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

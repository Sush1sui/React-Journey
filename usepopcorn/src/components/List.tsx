import React from "react";
import Movie from "./Movie";
import { MovieDetailsType, WatchedData } from "../models/models";

type Props = {
    movies: MovieDetailsType[] | WatchedData[];
    onSelectMovie: (id: string) => void;
    onDeleteWatched?: (id: string) => void;
};

export default function List({
    movies,
    onSelectMovie,
    onDeleteWatched,
}: Props) {
    function isWatchedData(
        movie: MovieDetailsType | WatchedData
    ): movie is WatchedData {
        return (movie as WatchedData).userRating !== undefined;
    }

    return (
        <ul className="list list-movies">
            {movies &&
                movies.map((movie: MovieDetailsType | WatchedData, i: number) =>
                    !isWatchedData(movie) ? (
                        <Movie
                            movie={movie}
                            onSelectMovie={onSelectMovie}
                            key={i}
                        >
                            <>
                                <span>🗓</span>
                                <span>{movie.Year}</span>
                            </>
                        </Movie>
                    ) : (
                        <Movie
                            movie={movie}
                            onSelectMovie={onSelectMovie}
                            key={i}
                        >
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
                                    <span>{movie.Runtime} min</span>
                                </p>

                                {onDeleteWatched && (
                                    <button
                                        className="btn-delete"
                                        onClick={(
                                            e: React.MouseEvent<
                                                HTMLButtonElement,
                                                MouseEvent
                                            >
                                        ) => {
                                            e.stopPropagation();
                                            onDeleteWatched(movie.imdbID);
                                        }}
                                    >
                                        X
                                    </button>
                                )}
                            </>
                        </Movie>
                    )
                )}
        </ul>
    );
}

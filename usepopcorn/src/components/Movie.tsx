import React from "react";
import { MovieData } from "../models/models";

type Props = {
    movie: MovieData;
    children: React.ReactNode;
    onSelectMovie: (id: string) => void;
};

export default function Movie({ movie, onSelectMovie, children }: Props) {
    return (
        <li onClick={() => onSelectMovie(movie.imdbID)} key={movie.imdbID}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <div>{children}</div>
            </div>
        </li>
    );
}

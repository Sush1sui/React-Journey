import React from "react";
import { MovieData } from "../models/models";

type Props = {
    movie: MovieData;
    children: React.ReactNode;
};

export default function Movie({ movie, children }: Props) {
    return (
        <li key={movie.imdbID}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <div>{children}</div>
            </div>
        </li>
    );
}

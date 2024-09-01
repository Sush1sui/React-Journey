import React, { useEffect, useState } from "react";
import { MovieDetailsType, WatchedData } from "../models/models";
import Loader from "./Loader";
import StarRating from "./StarRating";
import ErrorMessage from "./ErrorMessage";

type Props = {
    selectedId: string;
    onCloseMovie: () => void;
    onAddWatched: (movie: WatchedData) => void;
    watchedMovies: WatchedData[];
};

const key = import.meta.env.VITE_OMDB_API_KEY as string;

export default function MovieDetails({
    selectedId,
    onCloseMovie,
    onAddWatched,
    watchedMovies,
}: Props) {
    const [movie, setMovie] = useState<MovieDetailsType | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [rating, setRating] = useState<number>(0);

    useEffect(() => {
        async function getMovieDetails() {
            try {
                setIsLoading(true);
                setMovie(null);
                setRating(0);
                setError("");

                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`
                );

                if (!res.ok)
                    throw new Error(
                        "Something went wrong with fetching movie details"
                    );

                const data = await res.json();
                setMovie(data);
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error);
                    setError(error.message);
                } else {
                    setError("An unknown error has occured");
                }
            } finally {
                setIsLoading(false);
            }
        }

        getMovieDetails();
    }, [selectedId]);

    useEffect(() => {
        const watched = watchedMovies.find((m) => selectedId === m.imdbID);
        if (watched) {
            setRating(watched.userRating);
        }
    }, [selectedId, watchedMovies]);

    if (error.length) return <ErrorMessage message="Failed to fetch movie" />;

    if (isLoading || !movie) return <Loader />;

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie;

    const handleAdd = () => {
        const newWatchedMovie: WatchedData = {
            ...movie,
            userRating: rating,
            imdbRating: Number(movie.imdbRating),
            Runtime: Number(movie.Runtime.split(" ").at(0)),
        };
        onAddWatched(newWatchedMovie);
        onCloseMovie();
    };

    return (
        <div className="details">
            <header>
                <button className="btn-back" onClick={onCloseMovie}>
                    &larr;
                </button>
                <img src={poster} alt={`Poster of ${movie} movie`} />
                <div className="details-overview">
                    <h2>{title}</h2>
                    <p>
                        {released} &bull; {runtime}
                    </p>
                    <p>{genre}</p>
                    <p>
                        <span>⭐</span> {imdbRating} IMDb rating
                    </p>
                </div>
            </header>

            <section>
                <div className="rating">
                    <StarRating
                        maxRating={10}
                        size={24}
                        onSetRating={setRating}
                        defaultRating={rating}
                    />

                    {rating > 0 && (
                        <button className="btn-add" onClick={handleAdd}>
                            + Add to list
                        </button>
                    )}
                </div>
                <p>
                    <em>{plot}</em>
                </p>
                <p>Starring {actors}</p>
                <p>Directed by {director}</p>
            </section>
        </div>
    );
}

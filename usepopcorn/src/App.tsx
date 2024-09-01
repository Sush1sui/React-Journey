import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Box from "./components/Box";
import List from "./components/List";
import Summary from "./components/Summary";
import { MovieDetailsType, WatchedData } from "./models/models";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";

const key = import.meta.env.VITE_OMDB_API_KEY as string;

const average = (arr: number[]) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
    const [query, setQuery] = useState<string>("");
    const [movies, setMovies] = useState<MovieDetailsType[]>([]);
    const [watched, setWatched] = useState<WatchedData[]>([]);
    const [isOpen1, setIsOpen1] = useState<boolean>(true);
    const [isOpen2, setIsOpen2] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [selectedId, setSelectedId] = useState<string>("");

    const handleSelectMovie = (id: string) => {
        setSelectedId((selectedId) => (id === selectedId ? "" : id));
    };

    const handleCloseMovie = () => setSelectedId("");

    const handleAddWatched = (movie: WatchedData) => {
        setWatched((w) => {
            // find if movie existed in watched list
            const existingMovieIndex = w.findIndex(
                (m) => m.imdbID === movie.imdbID
            );

            // if movie existed in watched list
            if (existingMovieIndex !== -1) {
                // make new copy of watched list
                const updatedWatched = [...w];

                // updated the watched movie
                // using index of the existing movie
                updatedWatched[existingMovieIndex] = {
                    ...updatedWatched[existingMovieIndex],
                    userRating: movie.userRating,
                };
                return updatedWatched;
            }

            return [...w, movie];
        });
    };

    const handleDeleteWatched = (id: string) => {
        setWatched((w) => w.filter((m) => m.imdbID !== id));
    };

    useEffect(() => {
        const controller = new AbortController();
        let timeoutId: ReturnType<typeof setTimeout>;

        async function fetchMovies() {
            try {
                setIsLoading(true);
                setError("");
                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
                    { signal: controller.signal }
                );

                if (!res.ok)
                    throw new Error(
                        "Something went wrong with fetching movies"
                    );

                const data = await res.json();

                if (!data.Search) throw new Error("No movies found");

                setMovies(data.Search);
            } catch (error) {
                if (error instanceof Error && error.name !== "AbortError") {
                    console.log(error);
                    setError(error.message);
                } else {
                    setError("An unknown error has occured");
                }
            } finally {
                setIsLoading(false);
            }
        }

        if (query.length < 3) {
            setMovies([]);
            setError("");
            return;
        }

        timeoutId = setTimeout(() => {
            fetchMovies();
        }, 1000);

        return function () {
            clearTimeout(timeoutId);
            controller.abort();
        };
    }, [query]);

    const avgImdbRating: number = parseFloat(
        average(watched.map((movie) => movie.imdbRating)).toFixed(2)
    );

    const avgUserRating: number = parseFloat(
        average(watched.map((movie) => movie.userRating)).toFixed(2)
    );
    const avgRuntime: number = Math.ceil(
        average(watched.map((movie) => movie.Runtime))
    );

    return (
        <>
            <Navbar movies={movies} query={query} handleSetQuery={setQuery} />

            <main className="main">
                <Box isOpen={isOpen1} toggleOpen={setIsOpen1}>
                    {isLoading && <Loader />}
                    {!isLoading && !error && isOpen1 && (
                        <List
                            movies={movies}
                            onSelectMovie={handleSelectMovie}
                        />
                    )}
                    {error && <ErrorMessage message={error} />}
                </Box>

                <Box isOpen={isOpen2} toggleOpen={setIsOpen2}>
                    {selectedId.length ? (
                        <MovieDetails
                            selectedId={selectedId}
                            onCloseMovie={handleCloseMovie}
                            onAddWatched={handleAddWatched}
                            watchedMovies={watched}
                        />
                    ) : (
                        isOpen2 && (
                            <>
                                <Summary
                                    watchLength={watched.length}
                                    avgImdbRating={avgImdbRating}
                                    avgRuntime={avgRuntime}
                                    avgUserRating={avgUserRating}
                                />

                                <List
                                    movies={watched}
                                    onSelectMovie={handleSelectMovie}
                                    onDeleteWatched={handleDeleteWatched}
                                />
                            </>
                        )
                    )}
                </Box>
            </main>
        </>
    );
}

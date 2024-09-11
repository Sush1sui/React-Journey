import { useEffect, useState } from "react";
import { MovieDetailsType } from "../models/models";

const key = import.meta.env.VITE_OMDB_API_KEY as string;

export function useMovies(query: string) {
    const [movies, setMovies] = useState<MovieDetailsType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        // callback?.();
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

    return { movies, isLoading, error };
}

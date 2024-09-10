export type MovieData = {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
};

export type MovieDetailsType = {
    Actors: string;
    Awards: string;
    BoxOffice: string;
    Country: string;
    DVD: string;
    Director: string;
    Genre: string;
    Language: string;
    Metascore: string;
    Plot: string;
    Poster: string;
    Production: string;
    Rated: string;
    Ratings: Array<{
        Source: string;
        Value: string;
    }>;
    Released: string;
    Response: string;
    Runtime: string;
    Title: string;
    Type: string;
    Website: string;
    Writer: string;
    Year: string;
    imdbID: string;
    imdbRating: string;
    imdbVotes: string;
};

export interface WatchedData
    extends Omit<MovieDetailsType, "imdbRating" | "Runtime"> {
    userRating: number;
    imdbRating: number;
    Runtime: number;
    countRatinggDecisions: number;
}

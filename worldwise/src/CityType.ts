export type TYPE_CITY_POSITION = {
    lat: number;
    lng: number;
};

export type TYPE_CITY = {
    cityName: string;
    country: string;
    emoji: string;
    date: string; // This can be a string representing an ISO date format
    notes: string;
    position: TYPE_CITY_POSITION;
    id: number;
};

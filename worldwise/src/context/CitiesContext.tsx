import React, { createContext, useContext, useEffect, useReducer } from "react";
import { TYPE_CITY } from "../CityType";

const BASE_URL = "http://localhost:9000";

interface CitiesContextType {
  cities: TYPE_CITY[];
  isLoading: boolean;
  currentCity: TYPE_CITY | null;
  getCity: (id: number) => Promise<void>;
  createCity: (newCity: NewCityType) => Promise<void>;
  deleteCity: (id: number) => Promise<void>;
}

interface NewCityType {
  cityName: string;
  country: string;
  emoji: string;
  date: Date;
  notes: string;
  position: { lat: string | null; lng: string | null };
}

export const CitiesContext = createContext<CitiesContextType | null>(null);

type ReducerStateType = {
  cities: TYPE_CITY[];
  isLoading: boolean;
  currentCity: TYPE_CITY | null;
  error: string;
};

const initialState: ReducerStateType = {
  cities: [],
  isLoading: false,
  currentCity: null,
  error: "",
};

type ReducerActionType =
  | { type: "loading" }
  | { type: "cities/loaded"; payload: TYPE_CITY[] }
  | { type: "city/loaded"; payload: TYPE_CITY }
  | { type: "city/created"; payload: TYPE_CITY }
  | { type: "city/deleted"; payload: number }
  | { type: "rejected"; payload: string };

function reducer(
  state: ReducerStateType,
  action: ReducerActionType
): ReducerStateType {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unknown action type");
  }
}

export function CitiesProvider({ children }: { children: React.ReactNode }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const [cities, setCities] = useState<TYPE_CITY[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [currentCity, setCurrentCity] = useState<TYPE_CITY | {}}>({});

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities...",
        });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id: number) {
    if (currentCity && id === currentCity.id) return;

    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error loading city...",
      });
    }
  }

  async function createCity(newCity: NewCityType) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "post",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error creating city...",
      });
    }
  }

  async function deleteCity(id: number) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "delete",
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting city...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error("CitiesContext was used outside of the PostProvider");

  if (!context) throw new Error("CitiesContext not found");

  return context;
}

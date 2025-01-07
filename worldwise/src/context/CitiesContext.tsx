import React, { createContext, useContext, useEffect, useState } from "react";
import { TYPE_CITY } from "../CityType";

const BASE_URL = "http://localhost:9000";

interface CitiesContextType {
  cities: TYPE_CITY[];
  isLoading: boolean;
  currentCity: TYPE_CITY | null;
  getCity: (id: number) => Promise<void>;
  createCity: (newCity: NewCityType) => Promise<void>;
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

export function CitiesProvider({ children }: { children: React.ReactNode }) {
  const [cities, setCities] = useState<TYPE_CITY[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCity, setCurrentCity] = useState<TYPE_CITY | null>(null);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        alert("There was an error loading data...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id: number) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      if (res.ok) {
        setCurrentCity(data);
      }
    } catch (error) {
      alert("There was an error loading data...");
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity: NewCityType) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "post",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      setCities((cities) => [...cities, data]);
    } catch (error) {
      alert("There was an error loading data...");
    } finally {
      setIsLoading(false);
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

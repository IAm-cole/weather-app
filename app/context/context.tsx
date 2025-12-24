'use client';
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import {
  WeatherData,
  ForecastData,
  fetchWeatherByCity,
  fetchWeatherByCoordinates,
  fetchWeatherForecast,
  WeatherContextType,
} from "@/lib/weather-api";

interface RecentSearch {
  location: string;
  country: string;
  timestamp: number;
}

const WeatherContext = React.createContext<WeatherContextType | null>(null);
export const WeatherProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
    const [city, setCity] = useState("");


   
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse recent searches");
      }
    }
  }, []);

  const saveToRecentSearches = (weatherData: WeatherData) => {
    const newSearch: RecentSearch = {
      location: weatherData.location,
      country: weatherData.country,
      timestamp: Date.now(),
    };

    const updated = [
      newSearch,
      ...recentSearches.filter(
        (s) => s.location.toLowerCase() !== weatherData.location.toLowerCase()
      ),
    ].slice(0, 5);

    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const handleForecastSearch = async (city: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherForecast(city);
      setForecast(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Cannot fetch forecast data. Please try again."
      );
      setForecast(null);
    } finally {
      setIsLoading(false);
    }
  };


  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchWeatherByCity(city);
      setWeather(data);
      saveToRecentSearches(data);
      // await saveToDatabase(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch weather data. Please try again."
      );
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };


  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const data = await fetchWeatherByCoordinates(
            position.coords.latitude,
            position.coords.longitude
          );
          setWeather(data);
          saveToRecentSearches(data);
          // await saveToDatabase(data);
        } catch (err) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to fetch weather data for your location."
          );
          setWeather(null);
        } finally {
          setIsLoading(false);
        }
      },
      // (err) => {
      //   setIsLoading(false);
      //   setError(
      //     "Unable to retrieve your location. Please check your browser permissions."
      //   );
      // }
    );
  };

  const handleClearSearch = (index: number) => {
    const updated = recentSearches.filter((_, i) => i !== index);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const value: WeatherContextType = {
    weather,
    setError,
   setIsLoading,
    description: forecast?.day.condition.text || null,
    isLoading,
    error,
    recentSearches,
  forecast,
    handleSearch,
    handleGetLocation,
    handleClearSearch,
   handleForecastSearch,
   city,
   setCity
  };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === null) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};

"use client";

import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWeather } from "@/app/context/context";


interface SearchInputProps {
  onSearch: (city: string) => void;
  onGetLocation: () => void;
  isLoading: boolean;
  //  fetchWeatherForecast ?: (city: string) => Promise<void>;
}

export function SearchInput({
  onSearch,
  onGetLocation,
  isLoading,
}: // fetchWeatherForecast
SearchInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSearch(value.trim());
    console.log("Search data:", value)
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (city.trim()) {
  //     onSearch(city.trim());
  //     setCity("");
  //   }
  // };

  // const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (debouncedCity) {

  //     setCity(debouncedCity);
  //   }
  // };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          {/* <Input
            type="text"
            placeholder="Enter city name (e.g., London, Tokyo, New York)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={isLoading}
            className="pl-10 h-12 text-base border-2 focus:border-blue-500 transition-all"
     
          /> 
          */}
          <input
            type="text"
            placeholder="Enter city name (e.g., Lagos, Ogun, Kano)"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            disabled={isLoading}
            className="flex h-10 w-full rounded-md border   px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 pl-10  transition-all"
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading || !value.trim()}
          className="h-10 px-6"
        >
          Search
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onGetLocation}
          disabled={isLoading}
          className="h-10 px-4"
          title="Use my location"
        >
          <MapPin className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
}

"use client";
import { useState } from "react";

import { useWeather } from "../context/context";

import HeaderText from "@/components/ui/headerText";

import { SearchInput } from "@/components/SearchInput";
import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingState } from "@/components/LoadingState";

import { ForecastPage } from "@/components/ForecastDisplay";
import { Cloud } from "lucide-react";
import { RecentSearches } from "@/components/RecentSearches";

function WeatherForecastPage() {
  const {
    isLoading,
    handleForecastSearch,
    error,
    setError,
    forecast,
    handleGetLocation,
  } = useWeather();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-cyan-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="mx-auto px-4 py-12">
        <header className="text-center">
          <HeaderText paragraphText="Get detailed forecast information for any city" />
        </header>



        <div className="space-y-8">
          <SearchInput
            onSearch={handleForecastSearch}
            isLoading={isLoading}
            onGetLocation={handleGetLocation}
          />

          {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}
          {isLoading && <LoadingState />}
          {/* Pass the entire forecast object */}
          {/* {forecast && !isLoading && <ForecastPage forecast={forecast} />} */}
          {forecast && !isLoading && (  
            <ForecastPage forecast={forecast} />
          )}

          {
            !forecast && !isLoading && !error && (
              <div className="text-center py-16">
                <Cloud className="h-24 w-24 mx-auto text-gray-300 dark:text-gray-700 mb-4" />
                <p className="text-xl text-gray-500 dark:text-400">
                  Search for a location to see forecast weather
                </p>
              </div>
            )
          }
          {/* {
            RecentSearches.length > 0 && !isLoading && (
              <RecentSearches searches={recentSearches}
              onSelectSearch={handleForecastSearch}
              />
            )
          } */}
        </div>
      </div>
    </div>
  );
}

export default WeatherForecastPage;

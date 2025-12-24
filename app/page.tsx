"use client";
import { SearchInput } from "@/components/SearchInput";

import { LoadingState } from "@/components/LoadingState";
import { ErrorMessage } from "@/components/ErrorMessage";
import { RecentSearches } from "@/components/RecentSearches";

// import { supabase } from '@/lib/supabase';
import { Cloud, Heading } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HeaderText from "@/components/ui/headerText";
import { WeatherDisplay } from "@/components/WeatherDisplay";
import { useWeather } from "./context/context";

import Navbar from "./ClientNav";

export default function Home() {
  const {
    weather,
    setError,
    handleSearch,
    isLoading,
    error,
    recentSearches,
    handleGetLocation,
    handleClearSearch,
  } = useWeather();
  // const [weather, setWeather] = useState<WeatherData | null>(null);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  // const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  // const [forecastData, setForecastData] = useState<ForecastData | null>(null);

  // const currentPath = usePathname();

  // const pages = [
  //   {
  //     name: "Current Temperature",
  //     path: "/",
  //   },
  //   { name: "Forecast", path: "/forecast" },
  //   { name: "History", path: "/history" },
  //   { name: "Alert", path: "/alert" },
  // ];

  // useEffect(() => {
  //   const saved = localStorage.getItem('recentSearches');
  //   if (saved) {
  //     try {
  //       setRecentSearches(JSON.parse(saved));
  //     } catch (e) {
  //       console.error('Failed to parse recent searches');
  //     }
  //   }
  // }, []);

  // const saveToRecentSearches = (weatherData: WeatherData) => {
  //   const newSearch: RecentSearch = {
  //     location: weatherData.location,
  //     country: weatherData.country,
  //     timestamp: Date.now(),
  //   };

  //   const updated = [
  //     newSearch,
  //     ...recentSearches.filter(
  //       (s) =>
  //         s.location.toLowerCase() !== weatherData.location.toLowerCase()
  //     ),
  //   ].slice(0, 5);

  //   setRecentSearches(updated);
  //   localStorage.setItem('recentSearches', JSON.stringify(updated));
  // };

  // const saveToDatabase = async (weatherData: WeatherData) => {
  //   try {
  //     await supabase.from('weather_searches').insert({
  //       location: weatherData.location,
  //       country: weatherData.country,
  //       temperature: weatherData.temperature,
  //       condition: weatherData.condition,
  //       lat: weatherData.lat,
  //       lon: weatherData.lon,
  //     });
  //   } catch (err) {
  //     console.error('Failed to save to database:', err);
  //   }
  // };

  // const handleFetchSearch = async(city : string) => {
  //   setIsLoading(true);
  //   setError(null);
  //    try {

  //     const data = await fetchWeatherForecast(city);
  //     setForecastData(data);
  //     saveToRecentSearches(data);

  //    } catch (err) {
  //     setError(
  //       err instanceof Error
  //         ? err.message
  //         : 'Cannot fetch forecast data. Please try again.'
  //     );
  //     setForecastData(null);
  //    }

  //    }
  // };

  // const handleSearch = async (city: string) => {
  //   setIsLoading(true);
  //   setError(null);

  //   try {
  //     const data = await fetchWeatherByCity(city);
  //     setWeather(data);
  //     saveToRecentSearches(data);
  //     // await saveToDatabase(data);
  //   } catch (err) {
  //     setError(
  //       err instanceof Error
  //         ? err.message
  //         : 'Failed to fetch weather data. Please try again.'
  //     );
  //     setWeather(null);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const handleGetLocation = () => {
  //   if (!navigator.geolocation) {
  //     setError('Geolocation is not supported by your browser.');
  //     return;
  //   }

  //   setIsLoading(true);
  //   setError(null);

  //   navigator.geolocation.getCurrentPosition(
  //     async (position) => {
  //       try {
  //         const data = await fetchWeatherByCoordinates(
  //           position.coords.latitude,
  //           position.coords.longitude
  //         );
  //         setWeather(data);
  //         saveToRecentSearches(data);
  //         // await saveToDatabase(data);
  //       } catch (err) {
  //         setError(
  //           err instanceof Error
  //             ? err.message
  //             : 'Failed to fetch weather data for your location.'
  //         );
  //         setWeather(null);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     },
  //     (err) => {
  //       setIsLoading(false);
  //       setError(
  //         'Unable to retrieve your location. Please check your browser permissions.'
  //       );
  //     }
  //   );
  // };

  // const handleClearSearch = (index: number) => {
  //   const updated = recentSearches.filter((_, i) => i !== index);
  //   setRecentSearches(updated);
  //   localStorage.setItem('recentSearches', JSON.stringify(updated));
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-cyan-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        <HeaderText paragraphText=" Real-time weather updates for any location worldwide" />
      

        <div className="space-y-8  ">
          <SearchInput
            onSearch={handleSearch}
            onGetLocation={handleGetLocation}
            isLoading={isLoading}
            // fetchWeatherForecast={handleFetchSearch}
          />

          {error && (
            <ErrorMessage message={error} onDismiss={() => setError(null)} />
          )}

          {isLoading && <LoadingState />}

          {weather && !isLoading && <WeatherDisplay weather={weather} />}

          {!weather && !isLoading && !error && (
            <div className="text-center py-16">
              <Cloud className="h-24 w-24 mx-auto text-gray-300 dark:text-gray-700 mb-4" />
              <p className="text-xl text-gray-500 dark:text-gray-400">
                Search for a location to see current weather
              </p>
            </div>
          )}

          {recentSearches.length > 0 && !isLoading && (
            <RecentSearches
              searches={recentSearches}
              onSelectSearch={handleSearch}
              onClearSearch={handleClearSearch}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export interface WeatherData {
  location: string;
  country: string;
  region: string;
  last_updated: number;

  localtime: number;

  feelsLike: number;

  description: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  icon: string;
  // lat: number;
  // lon: number;
  timestamp: number;
  temperature: number;
  // date: string;
  // date_epoch: number;
}
export interface WeatherByCoordinates {
  location: string,
  country: string,
  region: string,
  date: string,
  last_updated: number;
  date_epoch: number,
  localtime: number,
  feelsLike: number,
  description: string,
  humidity: number,
  windSpeed: number,
  pressure: number,
  icon: string,
  temperature: number,
  lat: number,
  lon: number,
  timestamp: number,


}

export interface ForecastData {
  // 📍 Location
  location: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  timezone: string;

  // 🕒 Time
  date: string;
  date_epoch: number;
  localtime: number;
  currentTime: number;
  timestamp: number;

  // 🌡️ Current weather
  currentTemp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  icon: string;
  description: string;
  last_updated: string;
  last_updated_epoch: number;

  // ☀️ Daily summary
  temperature: number;
  precip: number;

  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    avghumidity: number;
    condition: {
      text: string;
      icon: string;
    };
  };

  // 🌙 Astronomy
  astro: {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
  };

  // ⏱️ Hourly forecast
  hour: {
    time: string;
    time_epoch: number;
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
    humidity: number;
    chance_of_rain: number;
  }[];
}


export interface RecentSearch {
  location: string;
  country: string;
  timestamp: number;
}

export interface WeatherContextType {
  weather: WeatherData | null;
  isLoading: boolean;
  setIsLoading: any;
  error: string | null;
  setError: (error: string | null) => void;
  recentSearches: RecentSearch[];
  handleSearch: (city: string) => Promise<void>;
  handleGetLocation: () => void;
  handleClearSearch: (index: number) => void;
  description: string | null;
  forecast: ForecastData | null;
  handleForecastSearch: (city: string) => Promise<void>
  city: string;
  setCity: (city: string) => void;  
}

// export interface ForecastContextType {

//   isLoading: boolean;
//   setIsLoading: any;
//   error: string | null;
//   recentSearches: RecentSearch[];
//   setError: (error: string | null) => void;
//   handleGetLocation: () => void;
//   handleClearSearch: (index: number) => void;



// }

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

const BASE_URL = `http://api.weatherapi.com/v1/current.json`;



export async function fetchWeatherByCity(city: string): Promise<WeatherData> {
  const response = await fetch(
    `${BASE_URL}?key=${API_KEY}&query=${encodeURIComponent(city)}`
  );

  if (!response.ok) {
    throw new Error('Unable to fetch weather data. Please check the location name.');

  }



  const data = await response.json();
  console.log("Fetched weather data:", data);

  return {

    location: data.location.name,

    country: data.location.country,

    region: data.location.region,

    last_updated: new Date(data.current.last_updated).getTime(),

    temperature: data.current.temp_c,
    localtime: new Date(data.location.localtime).getTime(),


    feelsLike: data.current.feelslike_c,

    description: data.current.condition.text,

    humidity: data.current.humidity,
    windSpeed: data.current.wind_kph,
    pressure: data.current.pressure_mb,
    icon: data.current.condition.icon,
    // date: data.location.localtime,
    // date_epoch: data.location.localtime_epoch,
    // lat: data.location.lat,
    // lon: data.location.lon,
    timestamp: Date.now(),
  };
}

export async function fetchWeatherByCoordinates(
  lat: number,
  lon: number
): Promise<WeatherByCoordinates> {
  const response = await fetch(`${BASE_URL}&q=${lat},${lon}&aqi=no`);

  if (!response.ok) {
    throw new Error('Unable to fetch weather data for your location.');
  }

  const data = await response.json();

  return {
    location: data.location.name,
    country: data.location.country,

    feelsLike: data.current.feelslike_c,
    region: data.location.region,
    date: data.location.localtime,
    last_updated: new Date(data.current.last_updated).getTime(),
    localtime: new Date(data.location.localtime).getTime(),
    date_epoch: data.location.localtime_epoch,

    description: data.current.text,

    humidity: data.current.humidity,

    windSpeed: data.current.wind_kph,

    pressure: data.current.pressure_mb,

    icon: data.current.icon,

    temperature: data.current.temp_c,



    lat: data.location.lat,

    lon: data.location.lon,

    timestamp: Date.now(),
  };
}



const FORECASTBASE_URL = `https://api.weatherapi.com/v1/forecast.json`;


export async function fetchWeatherForecast(value: string): Promise<ForecastData> {
  const response = await fetch(
    `${FORECASTBASE_URL}?key=${API_KEY}&query=${encodeURIComponent(value)}&days=1&aqi=no&alerts=no`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch weather forecast data.");
  }

  const data = await response.json();
  console.log("Fetched forecast data:", data);
  const forecastDay = data.forecast.forecastday[0];

  return {
    // 📍 Location
    location: data.location.name,
    region: data.location.region,
    country: data.location.country,
    lat: data.location.lat,
    lon: data.location.lon,
    timezone: data.location.tz_id,
    localtime: new Date(data.location.localtime).getTime(),

    // 🕒 Time
    date: forecastDay.date,
    date_epoch: forecastDay.date_epoch,
   
    currentTime: Date.now(),

    // 🌡️ Current
    currentTemp: data.current.temp_c,
    feelsLike: data.current.feelslike_c,
    humidity: data.current.humidity,
    windSpeed: data.current.wind_kph,
    pressure: data.current.pressure_mb,
    icon: data.current.condition.icon,
    description: data.current.condition.text,
    last_updated: data.current.last_updated,
    last_updated_epoch: data.current.last_updated_epoch,

    // ☀️ Day summary
    day: {
      maxtemp_c: forecastDay.day.maxtemp_c,
      mintemp_c: forecastDay.day.mintemp_c,
      avgtemp_c: forecastDay.day.avgtemp_c,
      maxwind_kph: forecastDay.day.maxwind_kph,
      totalprecip_mm: forecastDay.day.totalprecip_mm,
      avghumidity: forecastDay.day.avghumidity,
      condition: {
        text: forecastDay.day.condition.text,
        icon: forecastDay.day.condition.icon,
      },
    },

    // 🌙 Astronomy
    astro: {
      sunrise: forecastDay.astro.sunrise,
      sunset: forecastDay.astro.sunset,
      moonrise: forecastDay.astro.moonrise,
      moonset: forecastDay.astro.moonset,
      moon_phase: forecastDay.astro.moon_phase,
    },

    // ⏱️ Hourly
    hour: forecastDay.hour.map((h: any) => ({
      time: h.time,
      time_epoch: h.time_epoch,
      temp_c: h.temp_c,
      condition: {
        text: h.condition.text,
        icon: h.condition.icon,
      },
      wind_kph: h.wind_kph,
      humidity: h.humidity,
      chance_of_rain: h.chance_of_rain,
    })),

    // 📊 Extras
    temperature: forecastDay.day.maxtemp_c,
    precip: forecastDay.day.totalprecip_mm,
    timestamp: Date.now(),
  };
};



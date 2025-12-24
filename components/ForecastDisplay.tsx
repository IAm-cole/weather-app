"use client";
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Cloud,
  Droplets,
  Wind,
  Sunrise,
  Sunset,
  Moon,
} from "lucide-react";
import Image from "next/image";
import { HourlyForecast } from "./HourlyForecast";
import { ForecastData } from "@/lib/weather-api";

interface ForecastPageProps {
  forecast: ForecastData;
}

export function ForecastPage({ forecast }: ForecastPageProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { day, astro, hour, date } = forecast;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  const dayIcon = day.condition?.icon?.startsWith("//")
    ? `https:${day.condition.icon}`
    : day.condition.icon;

  const forecastSections = {
    daystats: [
      {
        label: "Avg Temp",
        value: `${Math.round(day.avgtemp_c)}°C`,
        icon: <Cloud className="w-8 h-8 text-blue-600" />,
      },
      {
        label: "Wind",

        value: `${Math.round(day.maxwind_kph)} km/h`,
        icon: <Wind className="w-8 h-8 text-blue-600" />,
      },
      {
        label: "Humidity",
        value: `${day.avghumidity}%`,
        icon: <Droplets className="w-8 h-8 text-blue-600" />,
      },
    ],
    astronomy: [
      {
        label: "Sunrise",
        value: astro.sunrise,
        icon: <Sunrise className="w-5 h-5 text-orange-500" />,
      },
      {
        label: "Sunset",
        value: astro.sunset,
        icon: <Sunset className="w-5 h-5 text-orange-600" />,
      },
      {
        label: "Moonrise",
        value: astro.moonrise,
        icon: <Moon className="w-5 h-5 text-purple-500" />,
      },
      {
        label: "Moon Phase",
        value: astro.moon_phase,
        icon: <Moon className="w-5 h-5 text-indigo-500" />,
      },
    ],
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all hover:shadow-xl mt-4">
      {/* Day Summary */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 flex items-center justify-between  hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-6  flex-1 ">
          <Image
            src={dayIcon}
            alt={day.condition.text}
            width={50}
            height={50}
          />
          <div className="flex-1 text-left">
            <h3 className="text-xl font-bold text-gray-900">{formattedDate}</h3>
            <p className="text-gray-600">{day.condition.text}</p>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">
              {Math.round(day.maxtemp_c)}°
            </span>
            <span className="text-xl text-gray-500">
              {Math.round(day.mintemp_c)}°
            </span>
          </div>
        </div>

        {isExpanded ? (
          <ChevronUp className="w-6 h-6 text-gray-400 ml-4" />
        ) : (
          <ChevronDown className="w-6 h-6 text-gray-400 ml-4" />
        )}
      </button>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-gray-100 ">
          <div className="p-6 space-y-6">
            {/* Day Stats */}
            <div className="grid grid-cols-3 gap-4">
              {forecastSections.daystats.map((stat, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl"
                >
                  {stat.icon}
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-lg font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* <Cloud className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Avg Temp</p>
                  <p className="text-lg font-bold text-gray-900">{Math.round(day.avgtemp_c)}°C</p>
                </div> */}
          </div>

          {/* <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                <Wind className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Wind</p>
                  <p className="text-lg font-bold text-gray-900">{Math.round(day.maxwind_kph)} km/h</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                <Droplets className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Humidity</p>
                  <p className="text-lg font-bold text-gray-900">{day.avghumidity}%</p>
                </div>
              </div>
            </div> */}

          {/* Astronomy */}
           <h4 className="text-lg font-bold text-gray-900 m-4 flex items-center gap-2">
              <Moon className="w-5 h-5" />
                Astronomy
              </h4>
               <div className="grid grid-cols-2 mx-4 gap-4">
          {forecastSections.astronomy.map((astrostat, index) => (
            
            <div
              key={index}
              className="p-6 bg-gradient-to-br from-orange-50 to-purple-50 rounded-xl"
            >
             
             
                <div className="flex items-center gap-2">
                  {astrostat.icon}
                  <div>
                    <p className="text-xs text-gray-600">{astrostat.label}</p>
                    <p className="font-semibold text-gray-900">
                      {astrostat.value}
                    </p>
                  </div>
                </div>
              </div>
          
          ))}
            </div>
          {/* <div className="p-6 bg-gradient-to-br from-orange-50 to-purple-50 rounded-xl">
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Moon className="w-5 h-5" />
                Astronomy
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Sunrise className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-xs text-gray-600">Sunrise</p>
                    <p className="font-semibold text-gray-900">{astro.sunrise}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Sunset className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-xs text-gray-600">Sunset</p>
                    <p className="font-semibold text-gray-900">{astro.sunset}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Moon className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-xs text-gray-600">Moonrise</p>
                    <p className="font-semibold text-gray-900">{astro.moonrise}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Moon className="w-5 h-5 text-indigo-500" />
                  <div>
                    <p className="text-xs text-gray-600">Moon Phase</p>
                    <p className="font-semibold text-gray-900">{astro.moon_phase}</p>
                  </div>
                </div>
              </div>
            </div> */}

          {/* Hourly Forecast */}
          {hour && hour.length > 0 && (
            <div>
              <h4 className="text-lg font-bold text-gray-900 m-4">
                Hourly Forecast
              </h4>
              <HourlyForecast hours={hour} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

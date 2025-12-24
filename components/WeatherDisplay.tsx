import { WeatherData } from '@/lib/weather-api';
import { Droplets, Wind, Gauge, MapPin } from 'lucide-react';
import Image from 'next/image';


// interface WeatherCardProps {
//   weather: WeatherData;
// }

export function WeatherDisplay( { weather} : { weather: WeatherData}) {

  const formatTime = (timestamp: number) => {

    return new Date(timestamp).toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const src = typeof weather.icon === 'string' && weather.icon.startsWith('//') ? `https:${weather.icon}` : weather.icon;



  return (
    <div className="w-full   bg-white rounded-3xl shadow-xl p-8 animate-fade-in">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <MapPin size={18} />
            <span className="text-sm">{weather.region}, {weather.country}</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{weather.location}</h2>
          <p className="text-sm text-gray-500 mt-1">
            {formatTime(weather.localtime)}
          </p>
        </div>
        <Image
          src={src}
          alt={weather.description }
          className='bg-gray-50 border-gray-500 '
          
        //   className="w-20 h-20"
          width={70}
          height={50}
          quality={100}
         
        />
      </div>

      <div className="mb-8">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-800">
            {Math.round(weather.temperature)}°
          </span>
          <span className="text-2xl text-gray-600">C</span>
        </div>
        <p className="text-xl text-gray-600 mt-2">{weather.description}</p>
        <p className="text-sm text-gray-500 mt-1">
          Feels like {Math.round(weather.feelsLike)}°C
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <Droplets size={20} />
            <span className="text-sm font-medium">Humidity</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{weather.humidity}%</p>
        </div>

        <div className="bg-green-50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-green-600 mb-2">
            <Wind size={20} />
            <span className="text-sm font-medium">Wind</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{weather.windSpeed}</p>
          <p className="text-xs text-gray-500">km/h</p>
        </div>

        <div className="bg-orange-50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-orange-600 mb-2">
            <Gauge size={20} />
            <span className="text-sm font-medium">Pressure</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{weather.pressure}</p>
          <p className="text-xs text-gray-500">mb</p>
        </div>
      </div>

      <div className="mt-6 text-xs text-gray-400 text-center">
        Last updated: {formatTime(weather.last_updated)}
      </div>
    </div>
  );
}

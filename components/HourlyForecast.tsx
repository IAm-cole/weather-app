import { Droplets, Wind } from 'lucide-react';
import Image from 'next/image';

interface Hour {
  time: string;
  time_epoch: number;
  temp_c: number;
  condition: {
    text: string;
    icon: string;
  };
  wind_kph: number;
  // humidity: number;
  chance_of_rain: number;
}

interface HourlyForecastProps {
  hours: Hour[];
}

export function HourlyForecast({ hours }: HourlyForecastProps) {
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-4 pb-4">
        {hours.map((hour) => {
          const time = new Date(hour.time).toLocaleTimeString('en-US', {
            hour: 'numeric',
            hour12: true,
          });
      


          return (
            <div
              key={hour.time_epoch}
              className="flex-shrink-0 w-32 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <p className="text-sm font-semibold text-gray-900 mb-3 text-center">{time}</p>

              <div className="flex flex-col items-center gap-2">
                <Image width={50} height={50} src={hour.condition.icon} alt={hour.condition.text} className="w-12 h-12" />
                <p className="text-2xl font-bold text-gray-900">{Math.round(hour.temp_c)}°</p>
              </div>

              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <Droplets className="w-3 h-3 text-blue-500" />
                    <span className="text-gray-600">{hour.chance_of_rain}%</span>
                  </div>
                  {/* <span className="text-gray-500">{hour.humidity}%</span> */}
                </div>

                <div className="flex items-center gap-1 text-xs">
                  <Wind className="w-3 h-3 text-gray-500" />
                  <span className="text-gray-600">{Math.round(hour.wind_kph)} km/h</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

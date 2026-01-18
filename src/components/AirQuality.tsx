import type { AirQualityInfo } from '@/src/lib/weather/types';

interface AirQualityProps {
  airQuality: AirQualityInfo;
}

export default function AirQuality({ airQuality }: AirQualityProps) {
  const { aqi, label, description, color, components } = airQuality;

  const pollutants = [
    {
      name: 'PM2.5',
      value: components.pm2_5,
      unit: 'μg/m³',
      key: 'pm2_5',
      icon: '🔴',
    },
    {
      name: 'PM10',
      value: components.pm10,
      unit: 'μg/m³',
      key: 'pm10',
      icon: '🟠',
    },
    { name: 'O₃', value: components.o3, unit: 'μg/m³', key: 'o3', icon: '🔵' },
    {
      name: 'NO₂',
      value: components.no2,
      unit: 'μg/m³',
      key: 'no2',
      icon: '🟡',
    },
    {
      name: 'SO₂',
      value: components.so2,
      unit: 'μg/m³',
      key: 'so2',
      icon: '🟣',
    },
    { name: 'CO', value: components.co, unit: 'μg/m³', key: 'co', icon: '⚫' },
  ];

  return (
    <div className="mt-6 mb-6 sm:mt-8 sm:mb-8">
      <div className="rounded-2xl bg-white/95 p-4 shadow-2xl backdrop-blur-md sm:rounded-4xl sm:p-6 md:p-8 dark:bg-gray-900/95 dark:shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between sm:mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-800 sm:text-2xl md:text-3xl dark:text-white">
              Air Quality
            </h3>
            <p className="mt-1 text-sm text-gray-600 sm:text-base dark:text-gray-400">
              {description}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <div
              className={`rounded-lg px-3 py-1 text-sm font-bold shadow-lg sm:px-4 sm:py-2 sm:text-base ${color}`}
            >
              {label}
            </div>
            <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
              AQI: {aqi}
            </div>
          </div>
        </div>

        {/* Pollutants Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
          {pollutants.map((pollutant) => (
            <div
              key={pollutant.key}
              className="flex transform cursor-pointer flex-col items-center rounded-xl bg-gradient-to-br from-white to-indigo-50 p-3 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-4 dark:from-gray-800 dark:to-gray-700"
            >
              <p className="mb-2 text-xs font-bold text-gray-900 sm:text-sm dark:text-white">
                {pollutant.name}
              </p>
              <p className="my-1 text-3xl">{pollutant.icon}</p>
              <p className="my-2 text-2xl font-extrabold text-indigo-600 sm:text-3xl dark:text-indigo-400">
                {pollutant.value.toFixed(1)}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {pollutant.unit}
              </p>
            </div>
          ))}
        </div>

        {/* Info Footer */}
        <div className="mt-4 rounded-xl bg-blue-50 p-3 sm:mt-6 sm:p-4 dark:bg-gray-800">
          <p className="text-xs text-gray-700 sm:text-sm dark:text-gray-300">
            💡 <span className="font-semibold">Tip:</span> Air quality data is
            based on the Air Quality Index (AQI) scale from 1 (Good) to 5 (Very
            Poor).
          </p>
        </div>
      </div>
    </div>
  );
}

'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Droplets, Wind, ChevronRight } from 'lucide-react';
import { DailyForecast as DailyForecastType } from '@/src/lib/weather';
import { fetchWeatherIconUrl } from '@/src/lib/weather';

interface DailyForecastProps {
  forecast: DailyForecastType[];
}

export default function DailyForecast({ forecast }: DailyForecastProps) {
  return (
    <div id="daily" className="group mb-8 w-full">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/70 p-6 shadow-2xl backdrop-blur-2xl dark:border-gray-800 dark:bg-gray-900/80">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-blue-500/10 p-2.5 text-blue-600 dark:text-blue-400">
              <Calendar size={22} />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-gray-800 dark:text-white">
              7-Day Forecast
            </h3>
          </div>
        </div>

        {/* Forecast List/Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {forecast.slice(0, 7).map((day, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group/card relative flex flex-col overflow-hidden rounded-4xl border border-white/60 bg-white/40 p-5 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-xl dark:border-gray-700/50 dark:bg-gray-800/30 dark:hover:bg-gray-800"
            >
              {/* Day & Date */}
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className="text-lg leading-none font-black text-gray-900 transition-colors group-hover/card:text-blue-500 dark:text-white">
                    {day.day}
                  </p>
                  <p className="mt-1 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                    {day.date.split(',')[0]} {/* Ambil bagian tanggal saja */}
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 scale-0 rounded-full bg-blue-400/20 blur-lg transition-transform group-hover/card:scale-110" />
                  <Image
                    src={fetchWeatherIconUrl(day.icon)}
                    alt={day.description}
                    width={48}
                    height={48}
                    className="relative z-10 drop-shadow-md"
                  />
                </div>
              </div>

              {/* Temperature Range Bar Visual */}
              <div className="mb-4">
                <div className="mb-1.5 flex justify-between text-xs font-bold">
                  <span className="text-blue-500">{day.temp_min}°</span>
                  <span className="text-red-500">{day.temp_max}°</span>
                </div>
                <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                  <div
                    className="absolute h-full rounded-full bg-linear-to-r from-blue-400 to-red-400"
                    style={{
                      left: '20%',
                      right: '20%',
                    }}
                  />
                </div>
              </div>

              <p className="mb-4 line-clamp-1 text-xs font-medium text-gray-500 capitalize dark:text-gray-400">
                {day.description}
              </p>

              {/* Stats Bottom */}
              <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-700/50">
                <div className="flex items-center gap-1.5">
                  <Droplets size={14} className="text-blue-400" />
                  <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
                    {day.humidity}%
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Wind size={14} className="text-teal-400" />
                  <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
                    {Math.round(day.wind_speed)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Background Decoration */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-500/5 blur-[100px]" />
      </div>
    </div>
  );
}

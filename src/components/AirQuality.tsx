'use client';

import { motion } from 'framer-motion';
import { Wind, Info, AlertCircle } from 'lucide-react';
import type { AirQualityInfo } from '@/src/lib/weather/types';

interface AirQualityProps {
  airQuality: AirQualityInfo;
}

export default function AirQuality({ airQuality }: AirQualityProps) {
  const { aqi, label, description, color } = airQuality;

  // Kalkulasi persentase untuk progress bar (skala 1-5)
  const progressWidth = (aqi / 5) * 100;

  return (
    <motion.div 
      id="air-quality"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative overflow-hidden rounded-[2rem] bg-white/80 p-1 shadow-2xl backdrop-blur-xl dark:bg-gray-900/80"
    >
      {/* Glow Effect Background */}
      <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl opacity-20 transition-colors duration-500 ${color.split(' ')[0]}`} />
      
      <div className="relative z-10 p-6 sm:p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Wind size={24} />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-gray-800 dark:text-white">
              Air Quality Index
            </h3>
          </div>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500">
            Live Updates
          </span>
        </div>

        <div className="grid gap-8 md:grid-cols-[1fr_auto]">
          <div className="space-y-6">
            <div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-6xl font-black tracking-tighter text-gray-900 dark:text-white">
                  {aqi}
                </span>
                <span className={`text-lg font-bold uppercase tracking-wider ${color.replace('bg-', 'text-')}`}>
                  • {label}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-md">
                {description}
              </p>
            </div>

            {/* Visual Meter */}
            <div className="space-y-2">
              <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressWidth}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full rounded-full shadow-[0_0_12px_rgba(0,0,0,0.1)] ${color}`}
                />
              </div>
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
                <span>Good</span>
                <span>Moderate</span>
                <span>Unhealthy</span>
              </div>
            </div>
          </div>

          {/* Side Badge/Metric */}
          <div className="hidden md:flex flex-col items-center justify-center border-l border-gray-100 dark:border-gray-800 pl-8">
            <div className="text-center">
              <div className="text-xs font-bold text-gray-400 uppercase mb-1">Scale</div>
              <div className="relative h-16 w-16 flex items-center justify-center rounded-full border-4 border-indigo-500/20">
                <span className="text-xl font-bold text-indigo-500">1-5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Tip Section */}
        <div className="mt-8 flex gap-3 rounded-2xl bg-indigo-50/50 p-4 border border-indigo-100/50 dark:bg-indigo-500/5 dark:border-indigo-500/10">
          <div className="text-indigo-600 dark:text-indigo-400 shrink-0">
            <Info size={18} />
          </div>
          <p className="text-sm leading-snug text-gray-600 dark:text-gray-300">
            <span className="font-bold text-indigo-900 dark:text-indigo-200">Health Tip:</span> {
              aqi <= 2 
              ? "A perfect day for outdoor activities. Enjoy the fresh air!" 
              : "Sensitive groups should reduce prolonged outdoor exertion."
            }
          </p>
        </div>
      </div>
    </motion.div>
  );
}

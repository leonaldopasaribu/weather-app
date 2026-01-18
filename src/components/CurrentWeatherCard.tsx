'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Wind, Droplets, Thermometer, Gauge, ArrowDown, ArrowUp } from 'lucide-react';
import { WeatherData, fetchWeatherIconUrl } from '@/src/lib/weather';

interface CurrentWeatherCardProps {
  weather: WeatherData;
}

export default function CurrentWeatherCard({ weather }: CurrentWeatherCardProps) {
  // Format waktu lokal (bisa disesuaikan dengan timezone dari data weather jika ada)
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative mb-8 w-full overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-700 p-1 shadow-[0_20px_50px_rgba(79,70,229,0.4)] transition-all duration-500 hover:shadow-indigo-500/60"
    >
      {/* Decorative Animated Glows */}
      <div className="absolute -top-24 -left-24 h-64 w-64 animate-pulse rounded-full bg-white/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-64 w-64 animate-bounce rounded-full bg-indigo-400/20 blur-3xl duration-[5000ms]" />

      <div className="relative z-10 flex flex-col p-6 sm:p-10 md:p-12">
        
        {/* Header: Location & Time */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-md border border-white/20">
              <MapPin size={16} className="text-blue-200" />
              <span className="text-sm font-bold tracking-wider text-white uppercase">
                {weather.name}, {weather.sys.country}
              </span>
            </div>
            <p className="text-xs font-medium text-blue-100/70 tracking-widest uppercase mt-1">
              {currentTime} • Today
            </p>
          </div>
          <div className="text-center md:text-right">
            <h2 className="text-lg font-bold capitalize text-white drop-shadow-sm">
              {weather.weather[0].description}
            </h2>
          </div>
        </div>

        {/* Main Temperature Display */}
        <div className="my-8 flex flex-col items-center justify-center gap-2 sm:my-12 sm:flex-row sm:gap-10">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full" />
            <Image
              src={fetchWeatherIconUrl(weather.weather[0].icon)}
              alt={weather.weather[0].description}
              width={180}
              height={180}
              className="relative z-10 drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)] sm:h-[180px] sm:w-[180px]"
              priority
            />
          </motion.div>
          
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-start">
              <span className="text-8xl font-black tracking-tighter text-white sm:text-9xl">
                {Math.round(weather.main.temp)}
              </span>
              <span className="mt-4 text-4xl font-light text-blue-200">°C</span>
            </div>
            <div className="flex gap-4 mt-[-10px]">
              <div className="flex items-center gap-1 text-blue-100/80">
                <ArrowDown size={14} />
                <span className="text-sm font-bold">{Math.round(weather.main.temp_min)}°</span>
              </div>
              <div className="flex items-center gap-1 text-blue-100/80">
                <ArrowUp size={14} />
                <span className="text-sm font-bold">{Math.round(weather.main.temp_max)}°</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid: Metrics */}
        <div className="grid grid-cols-2 gap-4 rounded-[2rem] bg-white/10 p-6 backdrop-blur-xl border border-white/10 shadow-inner md:grid-cols-4">
          <MetricItem 
            icon={<Thermometer size={18} />} 
            label="Feels Like" 
            value={`${Math.round(weather.main.feels_like)}°`} 
          />
          <MetricItem 
            icon={<Droplets size={18} />} 
            label="Humidity" 
            value={`${weather.main.humidity}%`} 
          />
          <MetricItem 
            icon={<Wind size={18} />} 
            label="Wind" 
            value={`${Math.round(weather.wind.speed)} m/s`} 
          />
          <MetricItem 
            icon={<Gauge size={18} />} 
            label="Pressure" 
            value={`${weather.main.pressure} hPa`} 
          />
        </div>
      </div>
    </motion.div>
  );
}

function MetricItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1 text-center group">
      <div className="mb-1 text-blue-200 transition-transform group-hover:scale-110 group-hover:text-white">
        {icon}
      </div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-blue-100/60">
        {label}
      </p>
      <p className="text-lg font-black text-white sm:text-xl">
        {value}
      </p>
    </div>
  );
}
'use client';

import { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cloud,
  CloudRain,
  Thermometer,
  Wind,
  Layers,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { env } from '@/src/lib/env';

function getCustomIcon() {
  if (typeof window === 'undefined') return undefined;

  return new L.Icon({
    iconUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    iconRetinaUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
}

// --- Sub-Components ---
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

function ZoomControls() {
  const map = useMap();

  const controls = [
    { icon: ZoomIn, action: () => map.zoomIn(), label: 'Zoom In' },
    { icon: ZoomOut, action: () => map.zoomOut(), label: 'Zoom Out' },
  ];

  return (
    <div className="absolute top-24 left-3 z-1000 flex flex-col gap-3 sm:left-6">
      {controls.map((btn, i) => (
        <button
          key={i}
          onClick={btn.action}
          title={btn.label}
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-[1.08] active:scale-95 sm:h-12 sm:w-12 dark:bg-gray-800/80"
        >
          <btn.icon className="h-5 w-5 text-indigo-600 sm:h-6 sm:w-6 dark:text-indigo-400" />
        </button>
      ))}
    </div>
  );
}

interface WeatherMapProps {
  lat: number;
  lon: number;
  cityName: string;
  temperature: number;
  description: string;
}

type WeatherLayer =
  | 'clouds_new'
  | 'precipitation_new'
  | 'temp_new'
  | 'wind_new'
  | 'none';

const weatherLayers = [
  { id: 'clouds_new', name: 'Clouds', icon: Cloud, color: 'text-blue-400' },
  {
    id: 'precipitation_new',
    name: 'Rain',
    icon: CloudRain,
    color: 'text-indigo-400',
  },
  { id: 'temp_new', name: 'Temp', icon: Thermometer, color: 'text-orange-400' },
  { id: 'wind_new', name: 'Wind', icon: Wind, color: 'text-teal-400' },
] as const;

export function WeatherMap({
  lat,
  lon,
  cityName,
  temperature,
  description,
}: WeatherMapProps) {
  const [selectedLayer, setSelectedLayer] = useState<WeatherLayer>('none');
  const [mounted, setMounted] = useState(false);
  const [layerOpacity, setLayerOpacity] = useState(0.8);

  useEffect(() => {
    setMounted(true);
  }, []);

  const position: [number, number] = useMemo(() => [lat, lon], [lat, lon]);
  const API_KEY = env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  if (!mounted)
    return (
      <div className="h-[550px] w-full animate-pulse rounded-[2.5rem] bg-gray-100 dark:bg-gray-800" />
    );

  return (
    <motion.div
      id="weather-map"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative mb-8 overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/70 p-2 shadow-2xl backdrop-blur-2xl dark:border-gray-800 dark:bg-gray-900/80"
    >
      {/* 1. Header Overlay (Top Left) */}
      <div className="pointer-events-none absolute top-8 left-24 z-1000 sm:left-24 lg:left-8">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-5 py-2.5 shadow-2xl backdrop-blur-xl">
          <div className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"></span>
          </div>
          <h3 className="text-xs font-black tracking-[0.2em] text-white uppercase">
            {selectedLayer === 'none'
              ? 'Live Satellite'
              : `${weatherLayers.find((l) => l.id === selectedLayer)?.name} Vision`}
          </h3>
        </div>
      </div>

      {/* 2. Control Panel (Bottom Center) */}
      <div className="absolute bottom-8 left-1/2 z-1000 w-[94%] -translate-x-1/2 sm:w-auto">
        <div className="flex flex-wrap items-center justify-center gap-1.5 rounded-[2.2rem] border border-white/40 bg-white/80 p-2 shadow-2xl backdrop-blur-2xl dark:border-gray-700/50 dark:bg-gray-900/90">
          <button
            onClick={() => setSelectedLayer('none')}
            className={`rounded-full px-6 py-2.5 text-[10px] font-black tracking-widest uppercase transition-all duration-300 ${
              selectedLayer === 'none'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/40'
                : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            Base Map
          </button>
          <div className="mx-1 hidden h-6 w-px bg-gray-200 sm:block dark:bg-gray-700" />
          {weatherLayers.map((layer) => (
            <button
              key={layer.id}
              onClick={() => setSelectedLayer(layer.id)}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-[10px] font-black tracking-widest uppercase transition-all duration-300 ${
                selectedLayer === layer.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/40'
                  : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <layer.icon
                size={14}
                className={
                  selectedLayer === layer.id ? 'text-white' : layer.color
                }
              />
              <span className="hidden md:inline">{layer.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Map Content */}
      <div className="h-[600px] w-full overflow-hidden rounded-[2.2rem]">
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <MapUpdater center={position} />
          <ZoomControls />

          <TileLayer
            key={selectedLayer === 'none' ? 'voyager' : 'dark'}
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url={
              selectedLayer !== 'none'
                ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
            }
          />

          {selectedLayer !== 'none' && (
            <TileLayer
              key={selectedLayer}
              url={`https://tile.openweathermap.org/map/${selectedLayer}/{z}/{x}/{y}.png?appid=${API_KEY}`}
              opacity={layerOpacity}
            />
          )}

          <Marker position={position} icon={getCustomIcon()}>
            <Popup minWidth={220} className="weather-popup">
              <div className="p-2 text-center">
                <p className="mb-1 text-[10px] font-bold tracking-[0.2em] text-indigo-600 uppercase">
                  {cityName}
                </p>
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-black text-gray-900">
                    {Math.round(temperature)}°C
                  </span>
                  <span className="mt-1 text-xs leading-tight font-bold text-gray-400 uppercase italic">
                    {description}
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* 4. Filter Card (Right Side) */}
      <AnimatePresence>
        {selectedLayer !== 'none' && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="absolute top-8 right-8 z-1000 hidden lg:block"
          >
            <div className="w-56 rounded-4xl border border-white/20 bg-white/90 p-6 shadow-2xl backdrop-blur-xl dark:bg-gray-800/95">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers size={14} className="text-indigo-500" />
                  <span className="text-[10px] font-black tracking-widest text-gray-800 uppercase dark:text-white">
                    Adjust View
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="mb-2 flex items-end justify-between">
                    <span className="text-[9px] font-bold text-gray-400 uppercase">
                      Layer Opacity
                    </span>
                    <span className="text-[10px] font-black text-indigo-600">
                      {Math.round(layerOpacity * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="1"
                    step="0.01"
                    value={layerOpacity}
                    onChange={(e) =>
                      setLayerOpacity(parseFloat(e.target.value))
                    }
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-indigo-600 dark:bg-gray-700"
                  />
                </div>

                <div className="border-t border-gray-100 pt-4 dark:border-gray-700">
                  <span className="text-[9px] font-bold text-gray-400 uppercase">
                    Intensity Scale
                  </span>
                  <div className="mt-2 h-3 w-full rounded-full bg-linear-to-r from-blue-200 via-indigo-500 to-purple-900 shadow-inner" />
                  <div className="mt-1 flex justify-between text-[8px] font-bold text-gray-500 uppercase">
                    <span>Clear</span>
                    <span>Heavy</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

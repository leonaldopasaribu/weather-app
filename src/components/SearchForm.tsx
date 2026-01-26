'use client';

import { useState, useEffect } from 'react';
import { Loader2, MapPin, Search, Navigation } from 'lucide-react';
import { useDebounce } from '@/src/hooks';
import { fetchLocationSuggestions } from '@/src/lib/weather/api';
import type { LocationSuggestion } from '@/src/lib/weather/types';
import LocationAutocomplete from './LocationAutocomplete';

interface SearchFormProps {
  city: string;
  isLoading: boolean;
  onCityChange: (city: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onGetCurrentLocation: () => void;
  onLocationSelect?: (lat: number, lon: number, name: string) => void;
}

export default function SearchForm({
  city,
  isLoading,
  onCityChange,
  onSubmit,
  onGetCurrentLocation,
  onLocationSelect,
}: SearchFormProps) {
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedCity = useDebounce(city, 300);

  // Fetch suggestions when debounced city changes
  useEffect(() => {
    const loadSuggestions = async () => {
      if (!debouncedCity || debouncedCity.length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setIsLoadingSuggestions(true);
      setShowSuggestions(true);
      try {
        const results = await fetchLocationSuggestions(debouncedCity, 8);
        setSuggestions(results);
      } catch (error) {
        console.error('Error loading suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoadingSuggestions(false);
      }
    };

    loadSuggestions();
  }, [debouncedCity]);

  const handleLocationSelect = (location: LocationSuggestion) => {
    onCityChange(location.displayName);
    setShowSuggestions(false);
    setSuggestions([]);

    if (onLocationSelect) {
      onLocationSelect(location.lat, location.lon, location.name);
    }
  };

  const handleInputChange = (value: string) => {
    onCityChange(value);
    if (value.length >= 2) {
      setShowSuggestions(true);
    }
  };

  const handleInputFocus = () => {
    if (city.length >= 2 && suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // Delay to allow click on suggestion
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };
  return (
    <div className="mx-auto mb-10 w-full max-w-2xl px-2">
      <form
        onSubmit={onSubmit}
        className="relative z-50"
        style={{ isolation: 'isolate' }}
      >
        <div className="group relative flex items-center transition-all duration-500">
          {/* Label Floating / Icon Decor */}
          <div className="absolute left-6 z-10 text-gray-400 transition-colors duration-300 group-focus-within:text-indigo-500">
            <MapPin size={22} strokeWidth={2.5} />
          </div>

          <input
            id="city-search"
            type="text"
            value={city}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="Search city, district, or location..."
            autoComplete="off"
            className="w-full rounded-[2.5rem] border-0 bg-white/40 py-5 pr-32 pl-16 text-xl font-medium tracking-tight text-gray-800 ring-1 ring-gray-200/50 backdrop-blur-3xl transition-all placeholder:text-gray-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:bg-gray-900/40 dark:text-white dark:ring-gray-700/50 dark:focus:bg-gray-900 dark:focus:ring-indigo-500/20"
          />

          {/* Action Group: Buttons inside Input */}
          <div className="absolute right-2.5 flex items-center gap-1.5">
            <button
              type="button"
              onClick={onGetCurrentLocation}
              disabled={isLoading}
              className="flex h-12 w-12 items-center justify-center rounded-full text-gray-400 transition-all hover:bg-gray-100 hover:text-indigo-600 dark:hover:bg-gray-800"
              title="Locate me"
            >
              <Navigation
                size={20}
                className={isLoading ? 'animate-pulse' : ''}
              />
            </button>

            <button
              type="submit"
              disabled={isLoading || !city}
              className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 transition-all hover:bg-indigo-700 active:scale-95 disabled:grayscale"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Search size={20} strokeWidth={3} />
              )}
            </button>
          </div>
        </div>

        {/* Location Autocomplete Dropdown */}
        <LocationAutocomplete
          suggestions={suggestions}
          isLoading={isLoadingSuggestions}
          onSelect={handleLocationSelect}
          isVisible={showSuggestions}
        />

        {/* Subtle Decorative Hint */}
        <div className="mt-4 flex justify-center gap-6 opacity-40">
          {['London', 'New York', 'Tokyo', 'Paris'].map((fav) => (
            <button
              key={fav}
              type="button"
              onClick={() => onCityChange(fav)}
              className="text-[10px] font-bold tracking-[0.2em] uppercase transition-colors hover:text-indigo-500"
            >
              {fav}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}

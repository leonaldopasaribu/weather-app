'use client';

import { useRef } from 'react';
import { MapPin } from 'lucide-react';
import type { LocationSuggestion } from '@/src/lib/weather/types';

interface LocationAutocompleteProps {
  suggestions: LocationSuggestion[];
  isLoading: boolean;
  onSelect: (location: LocationSuggestion) => void;
  isVisible: boolean;
}

export default function LocationAutocomplete({
  suggestions,
  isLoading,
  onSelect,
  isVisible,
}: LocationAutocompleteProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  if (!isVisible || (suggestions.length === 0 && !isLoading)) {
    return null;
  }

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full right-0 left-0 z-9999 mt-2 max-h-[300px] overflow-y-auto rounded-2xl border border-gray-200/50 bg-white shadow-xl backdrop-blur-xl dark:border-gray-700/50 dark:bg-gray-900"
      style={{ boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)' }}
    >
      {isLoading ? (
        <div className="flex items-center justify-center py-4">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>

          <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
            Searching locations...
          </span>
        </div>
      ) : (
        <ul className="py-2">
          {suggestions.map((location, index) => (
            <li key={`${location.lat}-${location.lon}-${index}`}>
              <button
                type="button"
                onClick={() => onSelect(location)}
                className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-indigo-50 dark:hover:bg-gray-800"
              >
                <div className="mt-0.5 shrink-0">
                  <MapPin
                    size={18}
                    className="text-indigo-500 dark:text-indigo-400"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {location.name}
                  </div>

                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {location.state && `${location.state}, `}

                    {location.country}
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

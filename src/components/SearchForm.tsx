import { Loader2, LocateFixed, Search } from 'lucide-react';

interface SearchFormProps {
  city: string;
  isLoading: boolean;
  onCityChange: (city: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onGetCurrentLocation: () => void;
}

export default function SearchForm({
  city,
  isLoading,
  onCityChange,
  onSubmit,
  onGetCurrentLocation,
}: SearchFormProps) {
  return (
    <>
      <form onSubmit={onSubmit} className="mb-4 sm:mb-6">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
            placeholder="Search for a city..."
            className="flex-1 rounded-xl border border-gray-300 px-4 py-2.5 text-base text-gray-800 shadow-inner focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 focus:outline-none sm:px-5 sm:py-3 sm:text-lg dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-6 py-2.5 font-semibold whitespace-nowrap text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 sm:py-3"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Search className="h-5 w-5" />
            )}
            {isLoading ? 'Fetching...' : 'Search'}
          </button>
        </div>
      </form>

      <button
        onClick={onGetCurrentLocation}
        disabled={isLoading}
        className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-indigo-500 px-4 py-2.5 text-base font-semibold text-indigo-600 transition-all duration-300 hover:scale-[1.01] hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-50 sm:mb-6 sm:px-6 sm:py-3 sm:text-lg dark:text-indigo-400 dark:hover:border-indigo-400 dark:hover:bg-gray-800/50"
      >
        <LocateFixed className="h-5 w-5" />
        <span className="text-sm sm:text-base">Use Current Location</span>
      </button>
    </>
  );
}

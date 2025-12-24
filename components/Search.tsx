import { useState, useEffect, useRef } from 'react';
import { Search, X, Clock } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onHistorySelect?: (city: string) => void;
  isLoading: boolean;
}

interface SearchSuggestion {
  id: string;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (input.trim().length > 1) {
        fetchSuggestions(input);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [input]);

  // useEffect(() => {
  //   function handleClickOutside(event: MouseEvent) {
  //     if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
  //       setIsOpen(false);
  //     }
  //   }

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => document.removeEventListener('mousedown', handleClickOutside);
  // }, []);

  const fetchSuggestions = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=8bade6f713ab4c32a29234616253011&q=${encodeURIComponent(query)}&aqi=no`
      );

      if (!response.ok) {
        setSuggestions([]);
        return;
      }

      const data = await response.json();
      const location = data.location;

      setSuggestions([
        {
          id: `${location.lat}-${location.lon}`,
          name: location.name,
          region: location.region || '',
          country: location.country,
          lat: location.lat,
          lon: location.lon,
        },
      ]);
    } catch (error) {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (suggestion: SearchSuggestion) => {
    onSearch(suggestion.name);
    setInput('');
    setSuggestions([]);
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput('');
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8" >
      <div className="relative">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              
              onChange={(e) => {
                setInput(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder="Search for a city..."
              className="w-full px-6 py-4 pr-12 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors shadow-sm"
            />
            {input && (
              <button
                type="button"
                onClick={() => {
                  setInput('');
                  setSuggestions([]);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="p-4 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-colors shadow-sm"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {isOpen && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border-2 border-gray-200 shadow-lg z-50">
            <div className="max-h-64 overflow-y-auto">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  type="button"
                  onClick={() => handleSelect(suggestion)}
                  className="w-full px-6 py-4 text-left hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0 flex items-center gap-3"
                >
                  <Search className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="font-semibold text-gray-900">{suggestion.name}</p>
                    <p className="text-sm text-gray-600">
                      {suggestion.region && `${suggestion.region}, `}
                      {suggestion.country}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border-2 border-gray-200 shadow-lg z-50 p-4 text-center">
            <p className="text-gray-600 flex items-center justify-center gap-2">
              <span className="animate-spin">⏳</span> Searching...
            </p>
          </div>
        )}
      </div>
    </form>
  );
}

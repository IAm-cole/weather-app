'use client';

import { Clock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RecentSearch {
  location: string;
  country: string;
  timestamp: number;
}

interface RecentSearchesProps {
  searches: RecentSearch[];
  onSelectSearch: (location: string) => void;
  onClearSearch: (index: number) => void;
}

export function RecentSearches({
  searches,
  onSelectSearch,
  onClearSearch,
}: RecentSearchesProps) {
  if (searches.length === 0) {
    return null;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5" />
          Recent Searches
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {searches.map((search, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 group hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <button
                onClick={() => onSelectSearch(search.location)}
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {search.location}, {search.country}
              </button>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onClearSearch(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

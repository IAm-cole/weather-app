'use client';

import { Loader2 } from 'lucide-react';

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-in fade-in duration-300">
      <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
      <p className="text-lg text-gray-600 dark:text-gray-400">
        Fetching weather data...
      </p>
    </div>
  );
}

import React from 'react';

interface MapPreviewProps {
  center: [number, number];
  zoom?: number;
  marker?: { lat: number; lng: number; name: string };
  className?: string;
}

export default function MapPreview({ center, zoom, marker, className }: MapPreviewProps) {
  const [lng, lat] = center;
  return (
    <div className={`w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center ${className}`}>
      <span className="text-gray-400">
        Map Preview ({lat}, {lng})
        {marker && ` - Marker: ${marker.name}`}
      </span>
    </div>
  );
}

import React from 'react';

export default function ClipGrid({ spotId, limit }: { spotId: string; limit?: number }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="aspect-video bg-gray-800 rounded-lg"></div>
      <div className="aspect-video bg-gray-800 rounded-lg"></div>
      <div className="aspect-video bg-gray-800 rounded-lg"></div>
    </div>
  );
}

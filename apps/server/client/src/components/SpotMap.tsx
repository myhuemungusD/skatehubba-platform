import { useEffect, useRef } from "react";

interface Spot {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

interface SpotMapProps {
  spots: Spot[];
  userLocation: { lat: number; lng: number } | null;
  onSpotClick?: (spot: Spot) => void;
  onMapClick?: (lat: number, lng: number) => void;
}

export function SpotMap({
  spots,
  userLocation,
  onSpotClick,
  onMapClick,
}: SpotMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Simple placeholder map - replace with real map library (Mapbox, Google Maps, etc.)
    // For now, just showing a grid with spots
    const canvas = document.createElement("canvas");
    canvas.width = mapRef.current.clientWidth;
    canvas.height = mapRef.current.clientHeight;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // Draw background
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = "#333";
      for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 50) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Draw user location
      if (userLocation) {
        ctx.fillStyle = "#3b82f6";
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 8, 0, 2 * Math.PI);
        ctx.fill();
      }

      // Draw spots (simplified positioning)
      spots.forEach((spot, i) => {
        const x = (canvas.width / (spots.length + 1)) * (i + 1);
        const y = canvas.height / 2 + (Math.random() - 0.5) * 200;

        ctx.fillStyle = "#f97316";
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, 2 * Math.PI);
        ctx.fill();
      });
    }

    mapRef.current.appendChild(canvas);

    return () => {
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, [spots, userLocation]);

  return (
    <div
      ref={mapRef}
      className="w-full h-full bg-zinc-900 rounded-lg relative overflow-hidden"
      onClick={(e) => {
        if (onMapClick && mapRef.current) {
          const rect = mapRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          onMapClick(y, x); // Simplified coordinates
        }
      }}
    >
      <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-2 rounded text-sm">
        {spots.length} spots •{" "}
        {userLocation ? "Location active" : "Enable location"}
      </div>
    </div>
  );
}

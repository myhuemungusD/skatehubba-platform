import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navigation from '../components/Navigation';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { MapPin, Navigation as NavigationIcon, X, AlertCircle, Plus } from 'lucide-react';
import { useGeolocation } from '../hooks/useGeolocation';
import { calculateDistance, formatDistance, getProximity } from '../lib/distance';
import { ARCheckInButton } from '../components/ARCheckInButton';
import { ARTrickViewer } from '../components/ARTrickViewer';
import { SpotMap } from '../components/SpotMap';
import { AddSpotDialog } from '../components/AddSpotDialog';
import { useToast } from '../hooks/use-toast';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../components/ui/sheet';

interface SkateSpot {
  id: string;
  name: string;
  address: string;
  type: string;
  difficulty: string;
  checkins: number;
  recentUsers: string[];
  lat: number;
  lng: number;
  description: string;
}

export default function MapPage() {
  const { toast } = useToast();
  const [selectedSpot, setSelectedSpot] = useState<SkateSpot | null>(null);
  const [addSpotMode, setAddSpotMode] = useState(false);
  const [newSpotLocation, setNewSpotLocation] = useState<{ lat: number; lng: number } | null>(null);
  const geolocation = useGeolocation(true);

  // Fetch spots from database
  const { data: dbSpots = [] } = useQuery({
    queryKey: ['/api/spots'],
  });

  const spots: SkateSpot[] = [
    {
      id: 'spot-1',
      name: 'Downtown Rails',
      address: '123 Main St, Downtown',
      type: 'Rails',
      difficulty: 'Intermediate',
      checkins: 247,
      recentUsers: ['Mike', 'Sarah', 'Tony'],
      lat: 40.7128,
      lng: -74.0060,
      description: 'Perfect flat rails with smooth run-up. Popular spot for technical tricks.',
    },
    {
      id: 'spot-2',
      name: 'City Plaza Stairs',
      address: '456 Plaza Blvd',
      type: 'Stairs',
      difficulty: 'Advanced',
      checkins: 189,
      recentUsers: ['Jake', 'Emma'],
      lat: 40.7589,
      lng: -73.9851,
      description: '12-stair set with handrails on both sides. Requires commitment.',
    },
    {
      id: 'spot-3',
      name: 'Riverside Park',
      address: '789 River Rd',
      type: 'Park',
      difficulty: 'Beginner',
      checkins: 512,
      recentUsers: ['Alex', 'Chris', 'Jordan', 'Pat'],
      lat: 40.7829,
      lng: -73.9654,
      description: 'Smooth concrete park with multiple features. Great for beginners and practice.',
    },
    {
      id: 'spot-4',
      name: 'Industrial Ledges',
      address: '321 Warehouse Ave',
      type: 'Ledges',
      difficulty: 'Intermediate',
      checkins: 156,
      recentUsers: ['Riley', 'Sam'],
      lat: 40.7489,
      lng: -73.9680,
      description: 'Variety of ledge heights with perfect wax. Watch for security.',
    },
  ];

  // Calculate distances and add to spots
  const spotsWithDistance = spots.map(spot => {
    if (geolocation.latitude !== null && geolocation.longitude !== null) {
      const distance = calculateDistance(
        geolocation.latitude,
        geolocation.longitude,
        spot.lat,
        spot.lng
      );
      return { ...spot, distance, proximity: getProximity(distance) };
    }
    return { ...spot, distance: null, proximity: null as any };
  });

  // Show toast for geolocation errors
  useEffect(() => {
    if (geolocation.status === 'denied') {
      toast({
        title: 'Location Access Denied',
        description: 'Enable location permissions to see nearby spots and check in.',
        variant: 'destructive',
        duration: 8000,
      });
    } else if (geolocation.status === 'error' && geolocation.error) {
      toast({
        title: 'Location Error',
        description: geolocation.error,
        variant: 'destructive',
        duration: 5000,
      });
    }
  }, [geolocation.status, geolocation.error, toast]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-success/20 text-success border-success/30';
      case 'Intermediate':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Advanced':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getProximityBadge = (proximity: 'here' | 'nearby' | 'far' | null, distance: number | null) => {
    if (!proximity || distance === null) return null;
    
    if (proximity === 'here') {
      return <Badge className="bg-success/20 text-success border-success/30">✓ Check-in Available</Badge>;
    } else if (proximity === 'nearby') {
      return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">{formatDistance(distance)} away</Badge>;
    } else {
      return <Badge variant="outline" className="text-gray-400">{formatDistance(distance)} away</Badge>;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#181818]">
      <Navigation />
      
      {/* Full-screen map */}
      <div className="flex-1 relative">
        <SpotMap
          spots={spotsWithDistance}
          userLocation={
            geolocation.latitude !== null && geolocation.longitude !== null
              ? { lat: geolocation.latitude, lng: geolocation.longitude, accuracy: geolocation.accuracy }
              : null
          }
          selectedSpotId={selectedSpot?.id || null}
          onSelectSpot={(spotId) => {
            const spot = spots.find(s => s.id === spotId);
            setSelectedSpot(spot || null);
          }}
          addSpotMode={addSpotMode}
          onMapClick={(lat, lng) => {
            setNewSpotLocation({ lat, lng });
          }}
        />

        {/* Add Spot Button */}
        <div className="absolute bottom-24 right-4 z-[1000]">
          <Button
            onClick={() => setAddSpotMode(!addSpotMode)}
            className={`shadow-lg ${
              addSpotMode 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-[#ff6a00] hover:bg-[#ff6a00]/90'
            } text-white font-semibold h-14 px-6`}
            data-testid="button-add-spot-mode"
          >
            {addSpotMode ? (
              <>
                <X className="w-5 h-5 mr-2" />
                Cancel
              </>
            ) : (
              <>
                <Plus className="w-5 h-5 mr-2" />
                Add Spot
              </>
            )}
          </Button>
        </div>

        {/* Add Spot Dialog */}
        <AddSpotDialog
          isOpen={newSpotLocation !== null}
          onClose={() => {
            setNewSpotLocation(null);
            setAddSpotMode(false);
          }}
          lat={newSpotLocation?.lat || 0}
          lng={newSpotLocation?.lng || 0}
        />

        {/* Floating header */}
        <div className="absolute top-4 left-4 right-4 z-[1000] pointer-events-none">
          <Card className="bg-black/80 border-gray-600 backdrop-blur-md pointer-events-auto">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-[#fafafa] flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-[#ff6a00]" />
                    Skate Spots
                  </h1>
                  {geolocation.status === 'ready' && (
                    <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                      <NavigationIcon className="w-3 h-3" />
                      {spotsWithDistance.filter(s => s.proximity === 'here').length} spots in check-in range
                    </p>
                  )}
                  {geolocation.status === 'locating' && (
                    <p className="text-sm text-gray-400">Finding your location...</p>
                  )}
                  {(geolocation.status === 'denied' || geolocation.status === 'error') && (
                    <p className="text-sm text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      Location unavailable
                    </p>
                  )}
                </div>
                {(geolocation.status === 'denied' || geolocation.status === 'error') && (
                  <Button
                    onClick={geolocation.retry}
                    variant="outline"
                    size="sm"
                    className="border-[#ff6a00] text-[#ff6a00] hover:bg-[#ff6a00] hover:text-white"
                    data-testid="button-retry-location"
                  >
                    Enable Location
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom sheet for spot details */}
      <Sheet open={selectedSpot !== null} onOpenChange={(open) => !open && setSelectedSpot(null)}>
        <SheetContent side="bottom" className="bg-black/95 border-gray-600 backdrop-blur-md h-[70vh]">
          {selectedSpot && (
            <>
              <SheetHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <SheetTitle className="text-[#fafafa] text-2xl flex items-center gap-2">
                      <MapPin className="w-6 h-6 text-[#ff6a00]" />
                      {selectedSpot.name}
                    </SheetTitle>
                    <SheetDescription className="text-gray-300 mt-1">
                      {selectedSpot.address}
                    </SheetDescription>
                    <div className="flex gap-2 mt-3">
                      <Badge variant="outline" className={getDifficultyColor(selectedSpot.difficulty)}>
                        {selectedSpot.difficulty}
                      </Badge>
                      <Badge variant="outline" className="bg-neutral-800/50 text-gray-300 border-gray-600">
                        {selectedSpot.type}
                      </Badge>
                      {(() => {
                        const spotWithDistance = spotsWithDistance.find(s => s.id === selectedSpot.id);
                        return getProximityBadge(spotWithDistance?.proximity || null, spotWithDistance?.distance || null);
                      })()}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedSpot(null)}
                    className="text-gray-400 hover:text-white"
                    data-testid="button-close-spot-details"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </SheetHeader>

              <div className="mt-6 space-y-6 overflow-y-auto max-h-[calc(70vh-200px)]">
                <div>
                  <h3 className="text-[#fafafa] font-semibold mb-2">Description</h3>
                  <p className="text-gray-300">{selectedSpot.description}</p>
                </div>

                <div>
                  <h3 className="text-[#fafafa] font-semibold mb-2">Stats</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Total Check-ins</p>
                      <p className="text-[#fafafa] font-semibold text-lg">{selectedSpot.checkins}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Recently Active</p>
                      <p className="text-[#fafafa] font-semibold text-lg">{selectedSpot.recentUsers.length} skaters</p>
                    </div>
                  </div>
                </div>

                <ARCheckInButton
                  spotId={selectedSpot.id}
                  spotName={selectedSpot.name}
                  spotLat={selectedSpot.lat}
                  spotLng={selectedSpot.lng}
                  className="w-full"
                />

                <ARTrickViewer
                  spotId={selectedSpot.id}
                  spotName={selectedSpot.name}
                />
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

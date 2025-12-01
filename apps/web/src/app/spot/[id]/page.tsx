import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import { GrittyButton } from '@skatehubba/ui';
import { getSpotById, getSpotCheckIns } from '@/lib/firebase/spots';
import MapPreview from '@/components/MapPreview';
import ClipGrid from '@/components/ClipGrid';

interface SpotPageProps {
  params: { id: string };
}

// SSR metadata for SEO — skatehubba.com/spot/el-toro ranks #1
export async function generateMetadata({ params }: SpotPageProps): Promise<Metadata> {
  const spot = await getSpotById(params.id);
  if (!spot) return { title: 'Spot Not Found' };

  return {
    title: `${spot.name} – SkateHubba™`,
    description: `${spot.checkIns || 0} check-ins • ${spot.difficulty || 'Unknown'} • ${spot.city || 'Worldwide'}`,
    openGraph: {
      images: [spot.photoUrl || '/og-default.jpg'],
    },
  };
}

export default async function SpotPage({ params }: SpotPageProps) {
  const spot = await getSpotById(params.id);
  const checkIns = await getSpotCheckIns(params.id);

  if (!spot) notFound();

  return (
    <div className="min-h-screen bg-ink text-paper">
      {/* Hero */}
      <div className="relative h-96 overflow-hidden">
        <Image
          src={spot.photoUrl || '/spots/placeholder.jpg'}
          alt={spot.name}
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent" />
        <div className="absolute bottom-8 left-8">
          <h1 className="text-6xl font-black text-neon drop-shadow-lg">{spot.name}</h1>
          <p className="text-2xl text-gold mt-2">
            {spot.city} • {spot.difficulty || 'Unknown'} • {checkIns.length} check-ins
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Map + Check-in Button */}
          <div>
            <h2 className="text-3xl font-bold text-neon mb-6">Location</h2>
            <MapPreview
              center={[spot.lng, spot.lat]}
              zoom={15}
              marker={{ lat: spot.lat, lng: spot.lng, name: spot.name }}
              className="h-96 rounded-2xl border-4 border-neon shadow-grit"
            />
            <GrittyButton className="w-full mt-6" size="lg">
              CHECK IN NOW
            </GrittyButton>
          </div>

          {/* Stats + Latest Clips */}
          <div>
            <h2 className="text-3xl font-bold text-blood mb-6">Latest Heat</h2>
            <div className="grid grid-cols-3 gap-4 text-center mb-8">
              <div className="bg-grime rounded-xl p-4 border-4 border-gold">
                <p className="text-4xl font-black text-gold">{checkIns.length}</p>
                <p className="text-sm">Check-ins</p>
              </div>
              <div className="bg-grime rounded-xl p-4 border-4 border-neon">
                <p className="text-4xl font-black text-neon">127</p>
                <p className="text-sm">Clips</p>
              </div>
              <div className="bg-grime rounded-xl p-4 border-4 border-blood">
                <p className="text-4xl font-black text-blood">8.7</p>
                <p className="text-sm">Vibe Score</p>
              </div>
            </div>

            <ClipGrid spotId={params.id} limit={6} />
          </div>
        </div>
      </div>
    </div>
  );
}

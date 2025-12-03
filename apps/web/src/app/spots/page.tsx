import { spots } from '@skatehubba/api-sdk';

export default async function SpotsPage() {
  const allSpots = await spots.list();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Skate Spots</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {allSpots.map((spot: any) => (
          <div key={spot.id} className="border p-4 rounded">
            <h2 className="font-bold">{spot.name}</h2>
            <p>{spot.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

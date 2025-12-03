import { challenges } from '@skatehubba/api-sdk';

export default async function ChallengePage({ params }: { params: { id: string } }) {
  const challenge = await challenges.get(params.id);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Challenge Details</h1>
      <pre>{JSON.stringify(challenge, null, 2)}</pre>
    </div>
  );
}

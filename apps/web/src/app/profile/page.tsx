import { users } from '@skatehubba/api-sdk';

export default async function ProfilePage() {
  // TODO: Get current user ID from auth context
  const user = await users.get('current-user-id');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}

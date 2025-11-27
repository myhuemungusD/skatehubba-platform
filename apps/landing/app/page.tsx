export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-10">
      <h1 className="text-5xl font-bold">SkateHubba™</h1>
      <p className="mt-4 text-lg opacity-75">
        Play S.K.A.T.E. anywhere. Discover spots. Join the movement.
      </p>

      <a
        href="https://skatehubba.com"
        className="mt-8 px-6 py-3 bg-white text-black rounded-lg font-semibold"
      >
        Enter App
      </a>
    </main>
  );
}

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

function App() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    onAuthStateChanged(auth, setUser)
  }, [])

  const signIn = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-black text-white p-4 text-center">
        <h1 className="text-4xl font-bold">SkateHubba</h1>
        {user ? (
          <div className="flex items-center gap-4 justify-center mt-2">
            <img src={user.photoURL} alt="" className="w-10 h-10 rounded-full" />
            <span className="font-semibold">{user.displayName}</span>
          </div>
        ) : (
          <button onClick={signIn} className="mt-4 bg-red-600 px-6 py-3 rounded-full font-bold hover:bg-red-700">
            Sign in with Google
          </button>
        )}
      </header>

      {/* Map */}
      <div className="flex-1">
        <MapContainer center={[37.7749, -122.4194]} zoom={10} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          <Marker position={[37.7749, -122.4194]}>
            <Popup>San Francisco – the birthplace of modern street skating 🛹</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  )
}

export default App
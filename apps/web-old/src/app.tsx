import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { AvatarScreenPreview } from "./screens/AvatarScreenPreview";

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  const [user, setUser] = useState<any>(null);
  const [view, setView] = useState<"map" | "avatar">("map");

  useEffect(() => {
    onAuthStateChanged(auth, setUser);
  }, []);

  const signIn = () => {
    signInWithPopup(auth, new GoogleAuthProvider());
  };

  if (view === "avatar") {
    return (
      <div>
        <button
          onClick={() => setView("map")}
          style={{
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: 1000,
            padding: "8px 16px",
            background: "#FFD700",
            border: "2px solid #000",
            fontWeight: "bold",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          ← Back to Map
        </button>
        <AvatarScreenPreview />
      </div>
    );
  }

  return (
    <>
      <header className="header">
        <h1>SkateHubba</h1>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <button
            onClick={() => setView("avatar")}
            style={{
              padding: "8px 16px",
              background: "#FFD700",
              border: "2px solid #000",
              fontWeight: "bold",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            Preview Avatar
          </button>
          {user ? (
            <div className="user-info">
              <img src={user.photoURL} alt="" />
              <span>{user.displayName}</span>
            </div>
          ) : (
            <button onClick={signIn} className="sign-in-btn">
              Sign in with Google
            </button>
          )}
        </div>
      </header>

      <div className="map-container">
        <MapContainer
          center={[37.7749, -122.4194]}
          zoom={10}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker position={[37.7749, -122.4194]}>
            <Popup>
              San Francisco – the birthplace of modern street skating 🛹
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  );
}

export default App;

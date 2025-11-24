import { collection, doc, setDoc, writeBatch } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { SkateSpot, UserProfile } from '../types/schema';

// --- 1. THE DATA TO UPLOAD ---
const SEED_SPOTS: SkateSpot[] = [
  {
    id: 'spot_el_toro',
    name: 'El Toro High School',
    description: 'The legendary 20 stair. Huge rails, massive impact. Enter through the side gate.',
    location: { latitude: 33.6189, longitude: -117.6749 },
    type: 'Street',
    difficulty: 'Gnarly',
    checkedInUsers: [],
    imageUrl: 'https://skatespotter.com/images/eltoro.jpg'
  },
  {
    id: 'spot_venice',
    name: 'Venice Beach Skatepark',
    description: 'Iconic beachfront concrete. Snake runs, bowls, and a street plaza. Crowded on weekends.',
    location: { latitude: 33.9850, longitude: -118.4695 },
    type: 'Park',
    difficulty: 'Medium',
    checkedInUsers: [],
    imageUrl: 'https://skatespotter.com/images/venice.jpg'
  },
  {
    id: 'spot_burnside',
    name: 'Burnside DIY',
    description: 'The godfather of DIY parks. Fast, tight transitions under the bridge. Respect the locals.',
    location: { latitude: 45.5226, longitude: -122.6653 },
    type: 'DIY',
    difficulty: 'Pro',
    checkedInUsers: [],
    imageUrl: 'https://skatespotter.com/images/burnside.jpg'
  },
  {
    id: 'spot_macba',
    name: 'MACBA',
    description: 'The ledge capital of the world. Smooth ground, long ledges, and good vibes.',
    location: { latitude: 41.3833, longitude: 2.1669 }, // Barcelona
    type: 'Street',
    difficulty: 'Medium',
    checkedInUsers: [],
    imageUrl: 'https://skatespotter.com/images/macba.jpg'
  },
  {
    id: 'spot_stoner',
    name: 'Stoner Plaza',
    description: 'Perfect ledges and manual pads. A local favorite in LA.',
    location: { latitude: 34.0441, longitude: -118.4526 },
    type: 'Park',
    difficulty: 'Easy',
    checkedInUsers: [],
    imageUrl: 'https://skatespotter.com/images/stoner.jpg'
  }
];

const SEED_USER: UserProfile = {
  uid: 'u_hesher_92',
  username: 'Hesher_92',
  stance: 'Goofy',
  avatarUrl: 'https://api.dicebear.com/9.x/avataaars/png?seed=skater123&backgroundColor=b6e3f4',
  level: 42,
  xp: 8450,
  stats: { skateWins: 14, spotsOwned: 3, dayStreak: 8 },
  badges: ['Kickflip', 'Heelflip', 'Tre Flip', 'Boardslide'],
  gear: { deck: 'Blind Reaper', trucks: 'Independent 149', wheels: 'Spitfire F4' }
};

// --- 2. THE UPLOAD FUNCTION ---
export const seedDatabase = async () => {
  const batch = writeBatch(db);

  console.log('🌱 Starting Seed Process...');

  // A. Add Spots
  SEED_SPOTS.forEach((spot) => {
    const spotRef = doc(db, 'spots', spot.id);
    batch.set(spotRef, spot);
  });

  // B. Add User
  const userRef = doc(db, 'users', SEED_USER.uid);
  batch.set(userRef, SEED_USER);

  // C. Commit the Batch
  try {
    await batch.commit();
    console.log('✅ Database Seeded Successfully!');
    alert('Database Seeded! Restart the app to see live data.');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    alert('Error seeding database. Check console.');
  }
};

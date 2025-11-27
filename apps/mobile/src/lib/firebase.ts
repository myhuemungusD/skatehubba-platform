import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

// Initialize Firebase instances (Native SDK)
// Configuration is handled automatically via google-services.json / GoogleService-Info.plist
const authInstance = auth();
const dbInstance = firestore();
const storageInstance = storage();

export { authInstance as auth, dbInstance as db, storageInstance as storage };


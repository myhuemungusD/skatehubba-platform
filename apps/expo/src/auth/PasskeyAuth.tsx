import { NativeModules, Platform } from "react-native";

// import { Passkey } from 'react-native-passkey'; // Commented out until native module is linked

// Mock Passkey for now to avoid runtime errors in dev client without native code
const Passkey = {
  create: async (options: any) => {
    console.log("Passkey.create called with:", options);
    return {
      id: "mock-credential-id",
      rawId: "mock-raw-id",
      response: {},
      type: "public-key",
    };
  },
  get: async (options: any) => {
    console.log("Passkey.get called with:", options);
    return {
      id: "mock-credential-id",
      rawId: "mock-raw-id",
      response: {},
      type: "public-key",
    };
  },
};

export const signInWithPasskey = async (uid: string, handle: string) => {
  if (Platform.OS === "web") {
    console.warn("Passkey auth not supported on web yet");
    return;
  }

  try {
    const credential = await Passkey.create({
      challenge: "mock-challenge-uuid", // In real app, fetch from server
      rp: { name: "SkateHubba", id: "skatehubba.com" },
      user: { id: uid, name: handle, displayName: handle },
      pubKeyCredParams: [
        { alg: -7, type: "public-key" },
        { alg: -257, type: "public-key" },
      ],
      timeout: 60000,
      attestation: "direct",
    });

    console.log("Passkey created:", credential);
    // Send credential to backend for verification
    return credential;
  } catch (error) {
    console.error("Passkey creation failed:", error);
    throw error;
  }
};

import { createClient } from "@skatehubba/api-sdk";
import { auth } from "./firebase"; // Assuming firebase auth is used for tokens

// Replace with your actual API URL
const API_URL = "http://localhost:8000/api";

export const getClient = async () => {
  const token = await auth.currentUser?.getIdToken();
  return createClient(API_URL, token);
};

import { createClient } from "@skatehubba/api-sdk";
import { functions } from "./firebase";

export const getClient = async () => {
  return createClient(functions);
};

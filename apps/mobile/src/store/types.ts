import type { AuthSlice } from "./slices/authSlice";
import type { SessionSlice } from "./slices/sessionSlice";

export interface GlobalState extends AuthSlice, SessionSlice {
  // Add other slices here if needed
}

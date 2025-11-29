
import { Redirect } from "expo-router";
import { useAuthStore } from "../lib/auth";

export default function Index() {
  const { user } = useAuthStore();

  if (user) {
    return <Redirect href="/dashboard" />;
  }

  return <Redirect href="/sign-in" />;
}

import React, { createContext, useContext, useMemo } from "react";
import { getFunctions } from "firebase/functions";
import { getApp } from "firebase/app";
import { SkateHubbaClient, createClient } from "./index";

const SkateHubbaContext = createContext<SkateHubbaClient | null>(null);

export const SkateHubbaProvider = ({ children }: { children: React.ReactNode }) => {
  const client = useMemo(() => {
    const app = getApp();
    // Initialize functions with the default app
    const functions = getFunctions(app);
    return createClient(functions);
  }, []);

  return (
    <SkateHubbaContext.Provider value={client}>
      {children}
    </SkateHubbaContext.Provider>
  );
};

export const useSkateHubba = () => {
  const client = useContext(SkateHubbaContext);
  if (!client) {
    throw new Error(
      "Truck Bolt Missing: useSkateHubba must be used within a SkateHubbaProvider. The chassis is falling apart!"
    );
  }
  return client;
};

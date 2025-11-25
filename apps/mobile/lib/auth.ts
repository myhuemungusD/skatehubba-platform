import { useAuth } from '../src/store/useStore';

// Re-export the hook from the new store location for backward compatibility
export const useAuthStore = useAuth;

export function useAuthListener() {
  const { init } = useAuth();
  
  return () => {
    const unsub = init();
    return unsub;
  };
}

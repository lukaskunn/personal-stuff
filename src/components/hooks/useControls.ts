import { useState, useCallback } from "react";

export function useControls<T>(defaults: T): [T, (patch: Partial<T>) => void] {
  const [state, setState] = useState<T>(defaults);
  const update = useCallback((patch: Partial<T>) => {
    setState((prev) => ({ ...prev, ...patch }));
  }, []);
  return [state, update];
}

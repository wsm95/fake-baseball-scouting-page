import { useCallback, useRef } from "react";

export const useDebounce = () => {
  const timeout = useRef<number>(-1);

  return useCallback(async (debouncedFunction: Function) => {
    window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(async () => {
      debouncedFunction();
    }, 300);
  }, []);
};

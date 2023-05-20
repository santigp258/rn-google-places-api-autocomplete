import { useState, useEffect, useCallback } from 'react';

const useDebounceCallback = <T extends any[]>(
  callback: (...args: T) => void,
  delay: number
): ((...args: T) => void) => {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const debounceCallback = useCallback(
    (...args: T) => {
      if (timer) {
        clearTimeout(timer);
      }
      setTimer(
        setTimeout(() => {
          callback(...args);
        }, delay)
      );
    },
    [callback, delay, timer]
  );

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  return debounceCallback;
};

export default useDebounceCallback;

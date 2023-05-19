import { useEffect, useState } from 'react';

const useDebounce = (value: string | number, timeout = 200) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, timeout);

    return () => clearTimeout(timeoutId);
  }, [value, timeout]);

  return debouncedValue;
};

export default useDebounce;

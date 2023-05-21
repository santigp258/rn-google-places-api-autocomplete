import { useEffect, useState } from 'react';

const useDebounce = <V = string>(value: V, timeout = 200) => {
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

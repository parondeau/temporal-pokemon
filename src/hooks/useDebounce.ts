import { useEffect, useState } from 'react';

type UseDebounceOptions = {
  delay: number;
};

export const useDebounce = <T>(
  value: T,
  { delay }: UseDebounceOptions = { delay: 1000 },
) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
};

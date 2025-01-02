import { useEffect, useState } from "react";

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    const item = window.localStorage.getItem(key);

    if (!item) {
      window.localStorage.setItem(key, JSON.stringify(initialValue));
      return;
    }

    if (item) {
      setStoredValue(JSON.parse(item));
    }
  }, [key]);

  const setValue = (value: T) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
};

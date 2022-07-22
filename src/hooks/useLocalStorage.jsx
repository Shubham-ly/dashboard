import { useEffect, useState } from "react";

const keyPrefix = "Dashboard-";

const useLocalStorage = (key, initialValue) => {
  const _key = `${keyPrefix}-${key}`;
  const [value, setValue] = useState(
    () => JSON.parse(localStorage.getItem(_key)) || initialValue
  );

  useEffect(() => {
    localStorage.setItem(_key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;

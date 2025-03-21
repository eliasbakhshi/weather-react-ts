import { useState, useEffect } from "react";
import { StorageType } from "../components/Types";

export const useLocalStorage = <T>(key: string, initialValue?: T): StorageType<T> => {
  const [state, setState] = useState<T | []>(() => {
    if (!initialValue) return [];
    try {
      let value = localStorage.getItem(key);
      return value ?JSON.parse(value).filter((info : any)=> info !== null) : initialValue;
    } catch (err) {
      return initialValue;
    }
  });

  useEffect(() => {
    if (state) {
      try {
        localStorage.setItem(key, JSON.stringify(state));
      } catch (err) {
        console.log(err);
      }
    }
  }, [state, key]);

  return [state, setState];
};

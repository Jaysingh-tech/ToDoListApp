import { useState } from "react";

export const useLocalStorage = (key: string, initialValue: string) => {
  const [state, setState] = useState(() => {
    try {
      const value = window.localStorage.getItem(key);
      return value
        ? typeof value === "object"
          ? JSON.parse(value)
          : value
        : initialValue;
    } catch (error) {
      console.log(error);
    }
  });

  console.log("state -->", state);

  return [state, setState];
};

import { useState } from "react";

export const useStateInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);
  const handleChange = async (e: any) => {
    const tempValue = await e.currentTarget.value;
    setValue(tempValue);
  };
  return {
    value,
    reset: (newValue: any) => setValue(newValue),
    onIonChange: handleChange,
    onKeyUp: handleChange,
  };
};

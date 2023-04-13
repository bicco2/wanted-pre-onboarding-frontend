import { useState, useEffect, ChangeEvent } from "react";

type useInputValidationType = {
  value: string;
  isValid: boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const UseInputValidation = (regex: RegExp): useInputValidationType => {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(regex.test(value));
  }, [value, regex]);

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setValue(event.target.value);
  }

  return {
    value,
    isValid,
    handleChange,
  };
};

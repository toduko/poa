import { useState } from "react";

export const useToggleState = () => {
  const [showOptions, setShowOptions] = useState(false);
  const toggleOptions = () => setShowOptions(!showOptions);

  return [showOptions, toggleOptions];
};

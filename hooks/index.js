import { useState } from 'react';

const useStateCustomHook = (initialState) => {
  const [value, setValue] = useState(initialState);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return [value, handleChange];
};

export default useStateCustomHook;

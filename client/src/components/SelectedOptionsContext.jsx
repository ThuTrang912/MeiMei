import React, { createContext, useContext, useState } from 'react';

const SelectedOptionsContext = createContext();

export const SelectedOptionsProvider = ({ children }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');

  return (
    <SelectedOptionsContext.Provider value={{ selectedOptions, setSelectedOptions, inputValue, setInputValue }}>
      {children}
    </SelectedOptionsContext.Provider>
  );
};

export const useSelectedOptions = () => {
  return useContext(SelectedOptionsContext);
};

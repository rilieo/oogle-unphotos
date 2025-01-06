import { useContext, createContext, useState } from 'react';

const PuzzleContext = createContext();

export const usePuzzle = () => {
  return useContext(PuzzleContext);
};

export const PuzzleProvider = ({ children }) => {
  const [solvedPuzzles, setSolvedPuzzles] = useState(JSON.parse(localStorage.getItem('solvedPuzzles')) || []);
    return <PuzzleContext.Provider value={{solvedPuzzles, setSolvedPuzzles}}>{children}</PuzzleContext.Provider>;
};
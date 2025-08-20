'use client'
import { createContext, useContext, useState, ReactNode } from 'react';

type ThemeContextType = {
  isGlass: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isGlass: true,
  toggleTheme: () => {}
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isGlass, setIsGlass] = useState(true);
  const toggleTheme = () => setIsGlass(!isGlass);

  return (
    <ThemeContext.Provider value={{ isGlass, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within a ThemeProvider')
  return context
}

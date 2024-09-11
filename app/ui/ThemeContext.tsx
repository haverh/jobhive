'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of the context
interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
  isThemeLoaded: boolean;
}

// Create the context with default values
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Provider component that wraps your app and manages the theme state
export const ThemeProvider = ({ children, className }: { children: ReactNode; className?: string }) => {
  const [theme, setTheme] = useState<string>('light');
  const [isThemeLoaded, setIsThemeLoaded] = useState(false); // Track when theme is loaded

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
    setIsThemeLoaded(true); // Once theme is read from localStorage, mark it as loaded
  }, []);

  useEffect(() => {
    if (isThemeLoaded) {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    }
  }, [theme, isThemeLoaded]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={className}>
      <ThemeContext.Provider value={{ theme, toggleTheme, isThemeLoaded }}>
      {isThemeLoaded ? children : null} {/* Prevent rendering until theme is loaded */}
    </ThemeContext.Provider>
    </div>
  );
};

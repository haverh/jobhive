'use client';
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    typeof window !== 'undefined' && localStorage.getItem('theme') 
    ? localStorage.getItem('theme') 
    : localStorage.getItem('light')
  )

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  },[theme])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  };

  return (
    <div className="flex items-center justify-center">
      <label className="relative flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={toggleTheme}
          className="sr-only"
        />
        <div className="w-8 h-14 md:w-16 md:h-9 bg-gray-300 dark:bg-gray-700 rounded-full p-1 transition-colors duration-300">
          <div
            className={`bg-white dark:bg-gray-800 size-6 md:size-7 rounded-full transition-transform duration-300 ${
              theme === 'dark' ? 'transform translate-y-6 md:translate-x-7 md:translate-y-0' : ''
            }`}
          >
            {theme === 'dark' ? <MoonIcon className="size-full" /> : <SunIcon className="size-full" />}
          </div>
        </div>
      </label>
    </div>
  );
};

export default ThemeToggle;
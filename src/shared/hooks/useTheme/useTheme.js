/* eslint-disable no-underscore-dangle */
'use client';

import { useEffect, useState } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState(global.window?.__theme || 'light');
  const isDark = theme === 'dark';
  const toggleTheme = () => {
    global.window?.__setPreferredTheme(isDark ? 'light' : 'dark');
  };
  useEffect(() => {
    global.window.__onThemeChange = setTheme;
  }, []);
  return {
    theme,
    isDark,
    toggleTheme,
  };
};

export const getTheme = () => {
  return global.window?.__theme || 'light';
};

import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const ThemeProvider = ({ children }) => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  return <>{children}</>;
};

export default ThemeProvider;

import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode } from '../redux/themeSlice';
import { logout } from '../redux/authSlice';
import styles from '../styles/Navbar.module.css';
import { useEffect, useState } from 'react';

const NavBar = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/activity">Activity</Link>
        </li>
        <li>
          <Link href="/promo">Promo</Link>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <button onClick={handleLogout} className={styles.button}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
      <button onClick={handleToggle} className={styles.button}>
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
    </nav>
  );
};

export default NavBar;

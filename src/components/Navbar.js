import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../styles/Navbar.module.css';
import { logout, setUser } from '../redux/slices/authSlice';
import useAuth from '../useApi/useAuth';

const Navbar = () => {
  const { userLog } = useAuth();
  const router = useRouter();
  const [navStyle, setNavStyle] = useState('');
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const { pathname } = router;

  console.log('User:', user);


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logout());
    router.push('/');
  };

  const handleScroll = () => {
    if (window.scrollY >= 100 && window.scrollY < 500) {
      setNavStyle('hide');
    } else if (window.scrollY >= 500) {
      setNavStyle('scrolled');
    } else {
      setNavStyle('show');
    }
  };

  return (
    <nav className={`${styles.navbar} ${navStyle}`}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Link href="/" passHref>
            <div className={styles.logo}>
              <Image src={'/Logo.png'} alt="Logo" width={50} height={50} />
              <span className={styles.brandName}>Travel Journal</span>
            </div>
          </Link>
        </div>
        <div className={styles.navLinks}>
          <Link href="/" className={`nav-link ${styles.navLink} ${pathname === '/' && styles.active}`} aria-current="page">
            Home
          </Link>
          <Link href="/activity" className={`nav-link ${styles.navLink} ${pathname === '/activity' && styles.active}`}>
            Activity
          </Link>
          <Link href="/promo" className={`nav-link ${styles.navLink} ${pathname === '/promo' && styles.active}`} aria-disabled="true">
            Promo
          </Link>
          {user?.role === 'admin' && (
            <Link href="/dashboarded" className={`nav-link ${styles.navLink} ${pathname.startsWith('/dashboard') && styles.active}`}>
              Dashboard
            </Link>
          )}
        </div>
        <div className={styles.authLinks}>
          {user ? (
            <div className={styles.profileDropdown}>
              <div className={styles.profileLink}>
                <img src={user.profilePictureUrl || '/default-avatar.png'} alt={user.name} className={styles.profilePicture} />
                <span className={styles.profileName}>{user.name}</span>
              </div>
              <ul className={styles.dropdownMenu}>
                <li>
                  <Link href="/Profile" passHref>
                    <div className={styles.dropdownItem}>Profile</div>
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className={styles.dropdownItem}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link href="/login" passHref>
              <div className={styles.loginButton}>Login</div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

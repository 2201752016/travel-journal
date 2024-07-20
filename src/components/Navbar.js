import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import useAuth from '../api/useAuth';
import styles from '../styles/Navbar.module.css';
import { clearUser, setUser } from '../redux/slice/userLoggedSlice';

const Navbar = () => {
  const { Auth, userLog } = useAuth();
  const router = useRouter();
  const [navStyle, setNavStyle] = useState('');
  const user = useSelector((state) => state?.userLogged?.user);
  const dispatch = useDispatch();
  const { pathname } = router;

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    if (localStorage.getItem('token')) {
      getUserLogged();
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const logout = async () => {
    await Auth('logout');
    dispatch(clearUser());
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

  const getUserLogged = () => {
    if (localStorage.getItem('token')) {
      userLog('user', (res) => dispatch(setUser(res)));
    }
  };

  return (
    <nav className={`${styles.navbar} ${navStyle}`}>
      <div className={`${styles.container}`}>
        <div className={styles.logoContainer}>
          <Link href="/" passHref>
            <div className={styles.logo}>
              <Image src={'/Logo.png'} alt="Logo" width={50} height={50} />
              <span className={styles.brandName}>Travel Journal</span>
            </div>
          </Link>
        </div>
        <div className={styles.navLinks}>
          <Link href="/" className={`nav-link orange-dark ${pathname === "/" && "on"}`} aria-current="page">
            Home
          </Link>
          <Link href="/activity" className={`nav-link orange-dark ${pathname === "/activity" && "on"}`}>
            Activity
          </Link>
          <Link href="/promo" className={`nav-link orange-dark ${pathname === "/promo" && "on"}`} aria-disabled="true">
            Promo
          </Link>
          {user?.role === "admin" && (
            <Link href="/dashboard/user" className={`nav-link orange-dark ${pathname.startsWith("/dashboard") && "on"}`}>
              Dashboard
            </Link>
          )}
        </div>
        <div className={styles.authLinks}>
          {user?.name ? (
            <div className={styles.profileDropdown}>
              <div className={styles.profileLink}>
                <img src={user.profilePictureUrl || '/default-avatar.png'} alt={user.name} className={styles.profilePicture} />
                <span className={styles.profileName}>{user.name}</span>
              </div>
              <ul className={styles.dropdownMenu}>
                <li>
                  <Link href="/profile" passHref>
                    <div className={styles.dropdownItem}>Profile</div>
                  </Link>
                </li>
                <li>
                  <button onClick={logout} className={styles.dropdownItem}>
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

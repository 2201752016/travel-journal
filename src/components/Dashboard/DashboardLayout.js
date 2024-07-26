import React from 'react';
import Link from 'next/link';
import styles from '../../styles/DashboardLayout.module.css';
import Navbar from '../Navbar';

const DashboardLayout = ({ children }) => {
  return (
    <div className={styles.dashboardContainer}>
      <Navbar />
      <div className={styles.sidebar}>
        <Link href="/dashboarded" passHref>
          <div className={styles.navItem}>User</div>
        </Link>
        <Link href="/dashboarded/banner" passHref>
          <div className={styles.navItem}>Banner</div>
        </Link>
        <Link href="/dashboarded/promo" passHref>
          <div className={styles.navItem}>Promo</div>
        </Link>
        <Link href="/dashboarded/category" passHref>
          <div className={styles.navItem}>Category</div>
        </Link>
        <Link href="/dashboarded/activity" passHref>
          <div className={styles.navItem}>Activity</div>
        </Link>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;

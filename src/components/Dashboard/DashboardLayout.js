import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../../styles/DashboardLayout.module.css';
import Navbar from '../Navbar';

const DashboardLayout = ({ children }) => {
  return (
    <div className={styles.dashboardContainer}>
      <Navbar />
      <div className={styles.sidebar}>
        <Link href="/dashboard/user" passHref>
          <div className={styles.navItem}>User</div>
        </Link>
        <Link href="/dashboard/banner" passHref>
          <div className={styles.navItem}>Banner</div>
        </Link>
        <Link href="/dashboard/promo" passHref>
          <div className={styles.navItem}>Promo</div>
        </Link>
        <Link href="/dashboard/category" passHref>
          <div className={styles.navItem}>Category</div>
        </Link>
        <Link href="/dashboard/activity" passHref>
          <div className={styles.navItem}>Activity</div>
        </Link>
        <Link href="/dashboard/create-banner" passHref>
          <div className={styles.navItem}>Create Banner</div>
        </Link>
        <Link href="/dashboard/create-promo" passHref>
          <div className={styles.navItem}>Create Promo</div>
        </Link>
        <Link href="/dashboard/create-category" passHref>
          <div className={styles.navItem}>Create Category</div>
        </Link>
        <Link href="/dashboard/create-activity" passHref>
          <div className={styles.navItem}>Create Activity</div>
        </Link>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;

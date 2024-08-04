import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/Profile.module.css';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.profileContainer}>
      <h1>My Profile</h1>
      {user ? (
        <div className={styles.profileContent}>
          <div className={styles.profileDetails}>
            <img src={user.profilePictureUrl || '/default-avatar.png'} alt={user.name} className={styles.profilePicture} />
            <h2>{user.name}</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone || 'Not provided'}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <button className={styles.editButton}>Edit Profile</button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </motion.div>
  );
};

export default Profile;

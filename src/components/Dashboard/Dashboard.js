import { useEffect, useState } from 'react';
import useGetData from '../../useApi/useGetData';
import styles from '../styles/Dashboard.module.css';

const Dashboard = () => {
  const { getData } = useGetData();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData('all-user');
      if (result && Array.isArray(result.data)) {
        setUsers(result.data);
      }
      setLoading(false);
    };
    fetchData();
  }, [getData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.title}>User Data</h1>
      <div className={styles.cardGrid}>
        {users.map((user) => (
          <div className={styles.card} key={user.id}>
            <div className={styles.cardHeader}>
              <img src={user.profilePictureUrl || '/default-avatar.png'} alt={user.name} />
              <button onClick={() => {/* JANGAN LUPA ini ngehadle update harusnya.....*/}}>Update</button>
            </div>
            <div className={styles.cardBody}>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <p>{user.phoneNumber}</p>
            </div>
            <div className={styles.cardFooter}>
              <span className={`${styles.role} ${user.role === 'admin' ? styles.admin : styles.user}`}>
                {user.role}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

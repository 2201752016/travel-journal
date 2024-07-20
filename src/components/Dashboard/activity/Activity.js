import { useEffect, useState } from 'react';
import useGetData from '../api/useGetData';
import styles from '../styles/Activity.module.css';

const Activity = () => {
  const { getData } = useGetData();
  const [activitys, setActivitys] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData('activitys');
      if (result && Array.isArray(result.data)) {
        setActivitys(result.data);
      }
    };
    fetchData();
  }, [getData]);

  return (
    <div className={styles.activityContainer}>
      <h1 className={styles.title}>Activity Data</h1>
      <button className={styles.createButton}>Create Activity</button>
      <div className={styles.cardGrid}>
        {activitys.map((activity) => (
          <div className={styles.card} key={activity.id}>
            <img src={activity.imageUrl || '/default-activity.png'} alt={activity.title} className={styles.cardImage} />
            <div className={styles.cardContent}>
              <h2>{activity.title}</h2>
              <p>Created At: {activity.createdAt}</p>
              <p>Last Update: {activity.updatedAt}</p>
            </div>
            <div className={styles.cardActions}>
              <button className={styles.editButton}>Edit</button>
              <button className={styles.deleteButton}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;

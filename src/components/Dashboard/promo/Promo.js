import { useEffect, useState } from 'react';
import useGetData from '../api/useGetData';
import styles from '../styles/Promo.module.css';

const Promo = () => {
  const { getData } = useGetData();
  const [promos, setPromos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData('promos');
      if (result && Array.isArray(result.data)) {
        setPromos(result.data);
      }
    };
    fetchData();
  }, [getData]);

  return (
    <div className={styles.promosContainer}>
      <h1 className={styles.title}>Promo Data</h1>
      <button className={styles.createButton}>Create Promo</button>
      <div className={styles.cardGrid}>
        {promos.map((promo) => (
          <div className={styles.card} key={promo.id}>
            <img src={promo.imageUrl || '/default-promo.png'} alt={promo.title} className={styles.cardImage} />
            <div className={styles.cardContent}>
              <h2>{promo.title}</h2>
              <p>Created At: {promo.createdAt}</p>
              <p>Last Update: {promo.updatedAt}</p>
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

export default Promo;

import { useEffect, useState } from 'react';
import useGetData from '../api/useGetData';
import styles from '../styles/Banner.module.css';

const Banner = () => {
  const { getData } = useGetData();
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData('banners');
      if (result && Array.isArray(result.data)) {
        setBanners(result.data);
      }
    };
    fetchData();
  }, [getData]);

  return (
    <div className={styles.bannerContainer}>
      <h1 className={styles.title}>Banner Data</h1>
      <button className={styles.createButton}>Create Banner</button>
      <div className={styles.cardGrid}>
        {banners.map((banner) => (
          <div className={styles.card} key={banner.id}>
            <img src={banner.imageUrl || '/default-banner.png'} alt={banner.title} className={styles.cardImage} />
            <div className={styles.cardContent}>
              <h2>{banner.title}</h2>
              <p>Created At: {banner.createdAt}</p>
              <p>Last Update: {banner.updatedAt}</p>
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

export default Banner;

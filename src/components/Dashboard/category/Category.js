import { useEffect, useState } from 'react';
import useGetData from '../api/useGetData';
import styles from '../styles/Category.module.css';

const Category = () => {
  const { getData } = useGetData();
  const [categorys, setCategorys] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData('categorys');
      if (result && Array.isArray(result.data)) {
        setCategorys(result.data);
      }
    };
    fetchData();
  }, [getData]);

  return (
    <div className={styles.categoryContainer}>
      <h1 className={styles.title}>category Data</h1>
      <button className={styles.createButton}>Create category</button>
      <div className={styles.cardGrid}>
        {categorys.map((category) => (
          <div className={styles.card} key={category.id}>
            <img src={category.imageUrl || '/default-category.png'} alt={category.title} className={styles.cardImage} />
            <div className={styles.cardContent}>
              <h2>{category.title}</h2>
              <p>Created At: {category.createdAt}</p>
              <p>Last Update: {category.updatedAt}</p>
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

export default Category;

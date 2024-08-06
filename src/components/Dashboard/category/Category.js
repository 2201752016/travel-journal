"use client";
import Layout from "@components/Layout";
import useDelete from "@/useApi/useDelete";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useGetData from "@/useApi/useGetData";
import styles from "@/styles/Category.module.css";

export default function Category() {
  const [categories, setCategory] = useState([]);
  const { deleteData } = useDelete();
  const { getData } = useGetData();
  const route = useRouter();

  useEffect(() => {
    getData("categories").then((res) => setCategory(res.data.data));
  }, []);

  const handleDelete = async (id) => {
    try {
      const resp = await deleteData('delete-category', id);
      if (resp && resp.status === 200) {
        setCategory(categories.filter((catego) => catego.id !== id));
        console.log('Category deleted successfully!');
      } else {
        console.error('Delete failed:', resp ? resp.data : 'No response data');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <Layout>
      <div className={styles.categoryContainer}>
        <button className={styles.createButton} onClick={() => route.push("/dashboarded/create-category")}>
          Add Category
        </button>
        <div className={styles.cardGrid}>
          {categories.length > 0 &&
            categories.map((catego) => (
              <div key={catego.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <img src={catego.imageUrl} alt={catego.name} className={styles.cardImage} />
                </div>
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>{catego.name}</h2>
                  <p className={styles.cardDates}>Created At: {catego.createdAt}</p>
                  <p className={styles.cardDates}>Last Update: {catego.updatedAt}</p>
                </div>
                <div className={styles.cardActions}>
                  <button className={styles.editButton} onClick={() => route.push(`/dashboarded/category/${catego.id}`)}>Update</button>
                  <button className={styles.deleteButton} onClick={() => handleDelete(catego.id)}>Delete</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
}

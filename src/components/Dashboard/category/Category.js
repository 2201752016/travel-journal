"use client";
import Layout from "@components/Layout";
import useDelete from "@/useApi/useDelete";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useGetData from "@/useApi/useGetData";
import styles from "@/styles/Card.module.css";

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
      const resp = await deleteData(`delete-category/${id}`);
      if (resp.status === 200) {
        setCategory(categories.filter((catego) => catego.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className={styles.cardContainer}>
        <button className={styles.addButton} onClick={() => route.push("/dashboarded/create-category")}>
          Add
        </button>
        {categories.length > 0 &&
          categories.map((catego) => (
            <div key={catego.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <img src={catego.imageUrl} alt={catego.name} />
              </div>
              <div className={styles.cardBody}>
                <h2 className={styles.cardTitle}>{catego.name}</h2>
                <p className={styles.cardDates}>Created At: {catego.createdAt}</p>
                <p>Last Update: {catego.updatedAt}</p>
              </div>
              <div className={styles.cardActions}>
                <button onClick={() => route.push(`/dashboarded/category/${catego.id}`)}>Update</button>
                <button onClick={() => handleDelete(catego.id)}>Delete</button>
              </div>
            </div>
          ))}
      </div>
    </Layout>
  );
}

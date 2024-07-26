"use client";
import Layout from "@components/Layout";
import useDelete from "@useApi/useDelete";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useGetData from "@useApi/useGetData";
import styles from "@/styles/Card.module.css";

export default function Promo() {
  const { deleteData } = useDelete();
  const { getData } = useGetData();
  const [promo, setPromo] = useState([]);
  const route = useRouter();

  useEffect(() => {
    getData("promos").then((res) => setPromo(res.data.data));
  }, []);

  const handleDelete = async (id) => {
    try {
      const resp = await deleteData(`delete-promo/${id}`);
      if (resp.status === 200) {
        setPromo(promo.filter((promon) => promon.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className={styles.cardContainer}>
        <button className={styles.addButton} onClick={() => route.push("/dashboarded/create-promo")}>
          Add
        </button>
        {promo.length > 0 &&
          promo.map((promon) => (
            <div key={promon.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <img src={promon.imageUrl} alt={promon.title} />
              </div>
              <div className={styles.cardBody}>
                <h2 className={styles.cardTitle}>{promon.title}</h2>
                <p className={styles.cardDates}>Created At: {promon.createdAt}</p>
                <p>Last Update: {promon.updatedAt}</p>
              </div>
              <div className={styles.cardActions}>
                <button onClick={() => route.push(`/dashboarded/promo/${promon.id}`)}>Update</button>
                <button onClick={() => handleDelete(promon.id)}>Delete</button>
              </div>
            </div>
          ))}
      </div>
    </Layout>
  );
}

"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useGetData from "@/useApi/useGetData";
import useDelete from "@/useApi/useDelete";
import styles from "@/styles/Card.module.css";

export default function Banner() {
  const [bannerList, setBannerList] = useState([]);
  const { getData } = useGetData();
  const { deleteItem } = useDelete("delete-banner");
  const route = useRouter();

  useEffect(() => {
    getData("banners")
      .then((res) => setBannerList(res.data.data))
      .catch((error) => console.error("Error fetching banners:", error));
  }, []);

  const handleDelete = async (id) => {
    try {
      const resp = await deleteItem(id);
      if (resp.status === 200) {
        setBannerList(bannerList.filter((banner) => banner.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.bannerContainer}>
      <button className={styles.createButton} onClick={() => route.push("/dashboarded/create-banner")}>
        Add
      </button>
      <div className={styles.cardGrid}>
        {bannerList.length > 0 ? (
          bannerList.map((bannered) => (
            <div key={bannered.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <img src={bannered.imageUrl} alt={bannered.name} className={styles.cardImage} />
              </div>
              <div className={styles.cardContent}>
                <h2>{bannered.name}</h2>
                <p>Created At: {bannered.createdAt}</p>
                <p>Last Update: {bannered.updatedAt}</p>
              </div>
              <div className={styles.cardActions}>
                <button className={styles.editButton} onClick={() => route.push(`/dashboarded/banner/${bannered.id}`)}>Update</button>
                <button className={styles.deleteButton} onClick={() => handleDelete(bannered.id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No banners to display</p>
        )}
      </div>
    </div>
  );
}

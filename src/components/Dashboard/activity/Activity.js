"use client";
import Layout from "@components/Layout";
import useDelete from "@/useApi/useDelete";
import useGetData from "@/useApi/useGetData";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/Activity.module.css";

export default function Activity() {
  const [activities, setActivities] = useState([]);
  const { deleteData } = useDelete(); 
  const { getData } = useGetData();
  const route = useRouter();

  useEffect(() => {
    getData("activities").then((res) => setActivities(res.data.data));
  }, []);

  const handleDelete = async (id) => {
    try {
        const resp = await deleteData('delete-activity', id); // Adjust endpoint here
        if (resp && resp.status === 200) {
            setActivities(activities.filter((activity) => activity.id !== id));
            console.log('Activity deleted successfully!');
        } else {
            console.error('Delete failed:', resp ? resp.data : 'No response data');
        }
    } catch (error) {
        console.error('Error deleting activity:', error);
    }
  };


  return (
    <Layout>
      <div className={styles.activityContainer}>
        <button className={styles.createButton} onClick={() => route.push("/dashboarded/create-activity")}>
          Add
        </button>
        {activities.length > 0 &&
          activities.map((activity) => (
            <div key={activity.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <img src={activity.imageUrls} alt={activity.title} className={styles.cardImage} />
              </div>
              <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>{activity.title}</h2>
                <p className={styles.cardDates}>Created At: {activity.createdAt}</p>
                <p className={styles.cardDates}>Last Update: {activity.updatedAt}</p>
              </div>
              <div className={styles.cardActions}>
                <button className={styles.editButton} onClick={() => route.push(`/dashboarded/activity/${activity.id}`)}>Update</button>
                <button className={styles.deleteButton} onClick={() => handleDelete(activity.id)}>Delete</button>
              </div>
            </div>
          ))}
      </div>
    </Layout>
  );
}

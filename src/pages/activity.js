import useGetData from "@/useApi/useGetData";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { RiMapPin2Fill } from "react-icons/ri";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "../components/ui/card";
import Link from "next/link";
import styles from '../styles/ActivityPage.module.css'; // Import the new CSS file

export default function ActivityPage() {
  const [activity, setActivity] = useState([]);
  const { getData } = useGetData();

  useEffect(() => {
    getData(`activities`).then((resp) => {
      console.log('Fetched activities:', resp.data.data);
      setActivity(resp.data.data);
    }).catch(error => console.error('Error fetching activities:', error));
  }, []);

  return (
    <div className={styles.pageContainer}>
      <section className={styles.sectionContainer}>
        <h1 className="text-3xl font-bold text-center">
          Create Memories with Every Activity
        </h1>
        <p className="mb-4 text-center text-gray-500">
          "Suggest that each activity will lead to lasting and cherished memories."
        </p>
        <div className="w-11/12 mt-10 max-sm:hidden">
          <div className="flex flex-wrap justify-center">
            {activity.map((item) => (
              <div key={item.id} className={styles.card}>
                <Link href={`/detail/activity/${item.id}`} passHref>
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center gap-2">
                      <img
                        src={Array.isArray(item.imageUrls) ? item.imageUrls[0] : item.imageUrls}
                        alt="imgActivity"
                        className="object-cover rounded-lg aspect-video"
                        style={{ width: '250px', height: '150px' }}
                      />
                      <div className="flex gap-1">
                        <CardTitle className={styles.cardTitle}>
                          {item.title}
                        </CardTitle>
                        <div className={styles.starRating}>
                          <FaStar className="text-yellow-500" />
                          <CardDescription className="text-black">
                            {item.rating}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <RiMapPin2Fill className="text-yellow-500" />
                        <CardDescription className={styles.cardDescription}>
                          {item.city}, {item.province}
                        </CardDescription>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

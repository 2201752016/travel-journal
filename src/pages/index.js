import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useGetData from '@/useApi/useGetData';
import styles from '@/styles/Home.module.css';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();
  const { getData } = useGetData();
  const [activities, setActivities] = useState([]);
  const [promos, setPromos] = useState([]);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const activitiesData = await getData('activities');
      const promosData = await getData('promos');
      const bannersData = await getData('banners');

      console.log('Activities Data:', activitiesData);
      console.log('Promos Data:', promosData);
      console.log('Banners Data:', bannersData);

      if (activitiesData) setActivities(activitiesData.data.data);
      if (promosData) setPromos(promosData.data.data);
      if (bannersData) setBanners(bannersData.data.data);
    };
    fetchData();
  }, []);

  const handleBannerClick = (bannerId) => {
    router.push(`/banner/${bannerId}`);
  };

  const handlePromoClick = () => {
    router.push('/promo');
  };

  const handleActivityClick = () => {
    router.push('/activity');
  };

  // const handleActivitiesClick = (id) => {
  //   router.push(`/activities/${id}`);
  // };

  return (
    <div className={styles.container}>
      <section className={styles.heroSection}>
        <div className={styles.heroText}>
          <h1>Adventure to Explore Through the Beautiful World</h1>
          <p>
            Embark on an unforgettable adventure through breathtaking landscapes and captivating encounters in the beautiful world around you.
          </p>
          <button onClick={handleActivityClick} className={styles.exploreButton}>
            Explore Now
          </button>
        </div>
        {banners.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.heroImage}
            onClick={() => handleBannerClick(banners[0].id)}
          >
            {console.log('Banner Image URL:', banners[0].imageUrl)}
            <Image
              src={banners[0].imageUrl}
              alt={banners[0].name}
              layout="fill"
              objectFit="cover"
            />
          </motion.div>
        )}
      </section>

      <section className={styles.promoSection}>
        <h2>Special Promo For You!</h2>
        <p>Exclusive Offer Just for You! Don't Miss Out!</p>
        <div className={styles.promoGrid}>
          {promos.slice(0, 4).map((promo) => (
            <motion.div
              key={promo.id}
              className={styles.promoCard}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => router.push(`/detail/promo/${promo.id}`)}
            >
              {console.log('Promo Image URL:', promo.imageUrl)}
              {promo.imageUrl ? (
                <Image
                  src={promo.imageUrl}
                  alt={promo.title}
                  width={300}
                  height={200}
                  objectFit="cover"
                />
              ) : (
                <p>No Image Available</p>
              )}
              <h6>{promo.title}</h6>
            </motion.div>
          ))}
        </div>
        <button onClick={handlePromoClick} className={styles.seeAllButton}>
          See All Promo
        </button>
      </section>

      <section className={styles.activitySection}>
        <h2>Explore All Activities</h2>
        <p>Discover a Plethora of Activities to Explore</p>
        <div className={styles.activityGrid}>
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              className={styles.activityCard}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => router.push(`/detail/activity/${activity.id}`)}
            >
              {console.log('Activity Image URL:', activity.imageUrls && activity.imageUrls[0])}
              {activity.imageUrls && activity.imageUrls.length > 0 ? (
                <Image
                  src={activity.imageUrls[0]}
                  alt={activity.name}
                  width={300}
                  height={200}
                  objectFit="cover"
                />
              ) : (
                <p>No Image Available</p>
              )}
              <h6>{activity.title}</h6>
              <p>{activity.price}</p>
            </motion.div>
          ))}
        </div>
        <button onClick={handleActivityClick} className={styles.seeAllButton}>
          See All Activities
        </button>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div>
            <h3>About Us</h3>
            <p>Travel Journal helps you discover and enjoy limitless adventures.</p>
          </div>
          <div>
            <h3>Contact Us</h3>
            <p>123 Travel Street</p>
          </div>
          <div>
            <h3>Social Media</h3>
            <p>Facebook</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

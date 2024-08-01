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
    getData('activities').then((res) => setActivities(res.data.data));
    getData('promos').then((res) => setPromos(res.data.data));
    getData('banners').then((res) => setBanners(res.data.data));
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

  return (
    <div className={styles.container}>
      <section className={styles.heroSection}>
        <div className={styles.heroText}>
          <h1>Go Around The World and Explore Everything</h1>
          <p>
            Go for a Trip through out breathtaking landscapes
            and Amazing encounters around you.
          </p>
          <button onClick={handleActivityClick} className={styles.exploreButton}>
            Take a Look
          </button>
        </div>
        {banners.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.heroImage}
            onClick={() => handleBannerClick(banners[0].id)}
          >
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
        <h2>Exclusive Promo Just For You!</h2>
        <p>Don't Miss Out! A Special Offer That You Might Like!</p>
        <div className={styles.promoGrid}>
          {promos.slice(0, 4).map((promo) => (
            <motion.div
              key={promo.id}
              className={styles.promoCard}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => router.push(`promo/${promo.id}`)}
            >
              {promo.imageUrls && promo.imageUrls.length > 0 && (
                <Image
                  src={promo.imageUrls[0]}
                  alt={promo.title}
                  width={300}
                  height={200}
                />
              )}
              <h6>{promo.title}</h6>
            </motion.div>
          ))}
        </div>
        <button onClick={handlePromoClick} className={styles.seeAllButton}>
          All Promo
        </button>
      </section>

      <section className={styles.activitiesSection}>
        <h2>Discover new Place</h2>
        <p>Let's Create Your New Passion</p>
        <div className={styles.activitiesGrid}>
          {activities.map((activities) => (
            <motion.div
              key={activities.id}
              className={styles.activitiesCard}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => handleactivitiesClick(activities.id)}
            >
              <Image
                src={activities.imageUrl}
                alt={activities.name}
                width={300}
                height={200}
              />
              <h6>{activities.name}</h6>
            </motion.div>
          ))}
        </div>
      </section>

      <section className={styles.activitySection}>
        <h2>Explore Everything the World has to offer</h2>
        <p>Discover a New things while exploring</p>
        <div className={styles.activityGrid}>
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              className={styles.activityCard}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => router.push(`activity/${activity.id}`)}
            >
              <Image
                src={activity.imageUrl}
                alt={activity.name}
                width={300}
                height={200}
              />
              <h6>{activity.name}</h6>
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
            <h3>Travel Journal</h3>
            <p>Aplikasi perjalanan yang memudahkan Anda.</p>
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
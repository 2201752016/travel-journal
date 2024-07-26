import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useGetData from '../api/useGetData';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../styles/Home.module.css'; // Ensure this path is correct

export default function Home() {
  const [activities, setActivities] = useState([]);
  const [promos, setPromos] = useState([]);
  const [banners, setBanners] = useState([]);
  const { getData } = useGetData();
  const router = useRouter();

  useEffect(() => {
    getData('activities').then((res) => setActivities(res.data.data));
    getData('promos').then((res) => setPromos(res.data.data));
    getData('banners').then((res) => setBanners(res.data.data));
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>Adventure to Explore Through the Beautiful World</h1>
          <p>
            Embark on an unforgettable adventure through breathtaking landscapes and captivating encounters in the beautiful world around you.
          </p>
          <button onClick={() => router.push('/activity')}>Explore Now</button>
        </div>
        <motion.div className={styles.heroImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {activities.length > 0 && (
            <Image
              src={activities[0].imageUrls[0] || activities[0].imageUrls[1]}
              alt={activities[0].title}
              width={500}
              height={500}
            />
          )}
        </motion.div>
      </section>

      <section className={styles.promoSection}>
        <h2>Special Promo For You!</h2>
        <p>Exclusive Offer Just for You! Don't Miss Out!</p>
        <div className={styles.promoGrid}>
          {promos.length > 0 ? (
            promos.slice(0, 4).map((promo) => (
              <motion.div key={promo.id} className={styles.promoCard} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
            ))
          ) : (
            <p>No promotions available</p>
          )}
        </div>
        <button onClick={() => router.push('/promo')}>See All Promo</button>
      </section>

      <section className={styles.findLoveSection}>
        <h2>Find What You Love</h2>
        <p>Let's Discover Your Passion</p>
        <div className={styles.loveGrid}>
          {banners.length > 0 ? (
            banners.slice(0, 4).map((banner) => (
              <motion.div key={banner.id} className={styles.loveCard} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Image src={banner.imageUrl} alt={banner.title} width={300} height={200} />
                <h6>{banner.title}</h6>
              </motion.div>
            ))
          ) : (
            <p>No banners available</p>
          )}
        </div>
      </section>

      <section className={styles.activitiesSection}>
        <h2>Explore All Activities</h2>
        <p>Discover a Plethora of Activities to Explore</p>
        <div className={styles.activitiesGrid}>
          {activities.length > 0 ? (
            activities.slice(0, 3).map((activity) => (
              <motion.div key={activity.id} className={styles.activityCard} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Image src={activity.imageUrls[0] || activity.imageUrls[1]} alt={activity.title} width={300} height={200} />
                <div>
                  <h6>{activity.title}</h6>
                  <p>{activity.location}</p>
                  <p>{activity.price}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <p>No activities available</p>
          )}
        </div>
        <button onClick={() => router.push('/activity')}>See All Activities</button>
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

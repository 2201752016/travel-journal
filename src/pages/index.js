import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useGetData from '@/useApi/useGetData';
import styles from '@/styles/Home.module.css';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

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

  const handleDragStart = (e) => e.preventDefault();

  const bannerItems = banners.map((banner) => (
    <motion.div
      key={banner.id}
      className={styles.bannerCard}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={() => handleBannerClick(banner.id)}
    >
      <Image
        src={banner.imageUrl}
        alt={banner.name}
        width={400} // Set the width to ensure consistency
        height={250} // Set the height to ensure consistency
        objectFit="cover"
        onDragStart={handleDragStart}
      />
      <h6>{banner.name}</h6>
    </motion.div>
  ));

  const promoItems = promos.map((promo) => (
    <motion.div
      key={promo.id}
      className={styles.promoCard}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={() => router.push(`/detail/promo/${promo.id}`)}
    >
      {promo.imageUrl ? (
        <Image
          src={promo.imageUrl}
          alt={promo.title}
          width={400} // Set the width to ensure consistency
          height={250} // Set the height to ensure consistency
          objectFit="cover"
          onDragStart={handleDragStart}
        />
      ) : (
        <p>No Image Available</p>
      )}
      <h6>{promo.title}</h6>
    </motion.div>
  ));

  const activityItems = activities.map((activity) => (
    <motion.div
      key={activity.id}
      className={styles.activityCard}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={() => router.push(`/detail/activity/${activity.id}`)}
    >
      {activity.imageUrls && activity.imageUrls.length > 0 ? (
        <Image
          src={activity.imageUrls[0]}
          alt={activity.name}
          width={400} // Set the width to ensure consistency
          height={250} // Set the height to ensure consistency
          objectFit="cover"
          onDragStart={handleDragStart}
        />
      ) : (
        <p>No Image Available</p>
      )}
      <h6>{activity.title}</h6>
      <p>{activity.price}</p>
    </motion.div>
  ));

  return (
    <div className={styles.container}>
      <section className={styles.heroSection}>
      <div className={styles.heroTextBox}>
        <div className={styles.heroText}>
          <h1>Adventure to Explore Through the Beautiful World</h1>
          <p>
            Embark on an unforgettable adventure through breathtaking landscapes and captivating encounters in the beautiful world around you.
          </p>
          <button onClick={handleActivityClick} className={styles.exploreButton}>
            Explore Now
          </button>
        </div>
      </div>
      <div className={styles.heroCarouselBox}>
        <AliceCarousel
          mouseTracking
          items={bannerItems}
          responsive={{
            0: { items: 1 },
            568: { items: 1 },
            1024: { items: 1 },
          }}
          autoPlay
          infinite
          autoPlayInterval={3000} // Slide every 3 seconds
          disableDotsControls
          disableButtonsControls
        />
      </div>
    </section>

      <section className={styles.promoSection}>
        <h2>Special Promo For You!</h2>
        <p>Exclusive Offer Just for You! Don't Miss Out!</p>
        <AliceCarousel
          mouseTracking
          items={promoItems}
          responsive={{
            0: { items: 1 },
            568: { items: 2 },
            1024: { items: 3 },
          }}
          autoPlay
          infinite
          autoPlayInterval={3000} // Slide every 3 seconds
          disableDotsControls
          disableButtonsControls
        />
        <button onClick={handlePromoClick} className={styles.seeAllButton}>
          See All Promo
        </button>
      </section>

      <section className={styles.activitySection}>
        <h2>Explore All Activities</h2>
        <p>Discover a Plethora of Activities to Explore</p>
        <AliceCarousel
          mouseTracking
          items={activityItems}
          responsive={{
            0: { items: 1 },
            568: { items: 2 },
            1024: { items: 3 },
          }}
          autoPlay
          infinite
          autoPlayInterval={3000} // Slide every 3 seconds
          disableDotsControls
          disableButtonsControls
        />
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

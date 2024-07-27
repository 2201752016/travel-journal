import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from '@/styles/UpdatePromo.module.css';

const UpdatePromo = () => {
  const [promo, setPromo] = useState({});
  const router = useRouter();
  const { promoId } = router.query;

  useEffect(() => {
    const fetchPromo = async () => {
      try {
        if (!promoId) return;

        const result = await axios.get(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promo/${promoId}`,
          {
            headers: {
              apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
            },
          }
        );
        setPromo(result.data.data);
      } catch (error) {
        console.error('Error fetching promo:', error);
      }
    };

    fetchPromo();
  }, [promoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-promo/${promoId}`,
        {
          title: promo.title,
          description: promo.description,
          imageUrl: promo.imageUrl,
          discount: promo.discount,
          terms: promo.terms,
          promoCode: promo.promoCode,
          claimCount: promo.claimCount,
        },
        {
          headers: {
            apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          },
        }
      );
      alert('Promo updated successfully');
      router.push('/dashboarded/promo');
    } catch (error) {
      console.error('Error updating promo:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromo({ ...promo, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="title" className={styles.label}>
        Title:
      </label>
      <input
        type="text"
        id="title"
        name="title"
        value={promo.title || ''}
        onChange={handleChange}
        className={styles.input}
      />
      <label htmlFor="description" className={styles.label}>
        Description:
      </label>
      <textarea
        id="description"
        name="description"
        value={promo.description || ''}
        onChange={handleChange}
        className={styles.textarea}
      />
      <label htmlFor="imageUrl" className={styles.label}>
        Image URL:
      </label>
      <input
        type="text"
        id="imageUrl"
        name="imageUrl"
        value={promo.imageUrl || ''}
        onChange={handleChange}
        className={styles.input}
      />
      <label htmlFor="discount" className={styles.label}>
        Discount:
      </label>
      <input
        type="text"
        id="discount"
        name="discount"
        value={promo.discount || ''}
        onChange={handleChange}
        className={styles.input}
      />
      <label htmlFor="terms" className={styles.label}>
        Terms:
      </label>
      <textarea
        id="terms"
        name="terms"
        value={promo.terms || ''}
        onChange={handleChange}
        className={styles.textarea}
      />
      <label htmlFor="promoCode" className={styles.label}>
        Promo Code:
      </label>
      <input
        type="text"
        id="promoCode"
        name="promoCode"
        value={promo.promoCode || ''}
        onChange={handleChange}
        className={styles.input}
      />
      <label htmlFor="claimCount" className={styles.label}>
        Claim Count:
      </label>
      <input
        type="text"
        id="claimCount"
        name="claimCount"
        value={promo.claimCount || ''}
        onChange={handleChange}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Update Promo
      </button>
    </form>
  );
};

export default UpdatePromo;

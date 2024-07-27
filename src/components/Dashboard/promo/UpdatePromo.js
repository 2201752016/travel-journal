import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useCreate from "@/useApi/useCreate";
import axios from 'axios';
import styles from '@/styles/UpdatePromo.module.css';

const UpdatePromo = () => {
  const { postCreate } = useCreate();
  const router = useRouter();
  const { promoId } = router.query;
  const [promo, setPromo] = useState({
    title: '',
    description: '',
    imageUrl: '',
    discount: '',
    terms: '',
    promoCode: '',
    claimCount: ''
  });

  useEffect(() => {
    const fetchPromo = async () => {
      try {
        const result = await axios.get(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promo/${promoId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          },
        });
        setPromo(result.data.data);
      } catch (error) {
        console.error('Error fetching promo:', error);
      }
    };
    if (promoId) {
      fetchPromo();
    }
  }, [promoId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromo({ ...promo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postCreate(
        'create-promo',
        promo
      );
      router.push('/dashboarded/promo');
    } catch (error) {
      console.error('Error updating promo:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Update Promo</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title" className={styles.label}>Title:</label>
        <input type="text" id="title" name="title" value={promo.title || ''} onChange={handleChange} className={styles.input} />
        
        <label htmlFor="description" className={styles.label}>Description:</label>
        <textarea id="description" name="description" value={promo.description || ''} onChange={handleChange} className={styles.textarea} />
        
        <label htmlFor="imageUrl" className={styles.label}>Image URL:</label>
        <input type="text" id="imageUrl" name="imageUrl" value={promo.imageUrl || ''} onChange={handleChange} className={styles.input} />
        
        <label htmlFor="discount" className={styles.label}>Discount:</label>
        <input type="text" id="discount" name="discount" value={promo.discount || ''} onChange={handleChange} className={styles.input} />
        
        <label htmlFor="terms" className={styles.label}>Terms:</label>
        <textarea id="terms" name="terms" value={promo.terms || ''} onChange={handleChange} className={styles.textarea} />
        
        <label htmlFor="promoCode" className={styles.label}>Promo Code:</label>
        <input type="text" id="promoCode" name="promoCode" value={promo.promoCode || ''} onChange={handleChange} className={styles.input} />
        
        <label htmlFor="claimCount" className={styles.label}>Claim Count:</label>
        <input type="text" id="claimCount" name="claimCount" value={promo.claimCount || ''} onChange={handleChange} className={styles.input} />
        
        <button type="submit" className={styles.button}>Update Promo</button>
      </form>
    </div>
  );
};

export default UpdatePromo;

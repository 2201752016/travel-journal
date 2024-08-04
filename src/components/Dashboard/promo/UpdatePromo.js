import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useUpdate from "@/useApi/useUpdate";
import axios from 'axios';
import styles from '@/styles/UpdatePromo.module.css';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const UpdatePromo = () => {
  const { updateItem, loading, error, success } = useUpdate('promo');
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
    if (promoId) {
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
      fetchPromo();
    }
  }, [promoId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromo({ ...promo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Submitting promo update with ID:', promoId);
    console.log('Promo data:', promo);

    try {
      const response = await updateItem(promoId, promo);
      console.log('Update response:', response);

      if (response.status === 200 || response.status === 201) {
        console.log('Promo updated successfully!');
        router.push('/dashboarded/promo');
      } else {
        console.error('Update failed:', response.data);
      }
    } catch (error) {
      console.error('Error updating promo:', error);
    }
  };

  return (
    <Card className={styles.container}>
      <CardHeader>
        <CardTitle>Update Promo</CardTitle>
      </CardHeader>
      <CardContent>
        {error && <p className={styles.error}>{error.message}</p>}
        {success && <p className={styles.success}>Promo updated successfully!</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input type="text" name="title" label="Title" value={promo.title || ''} onChange={handleChange} className={styles.input} />
          
          <label htmlFor="description" className={styles.label}>Description:</label>
          <textarea id="description" name="description" value={promo.description || ''} onChange={handleChange} className={styles.textarea} />
          
          <Input type="text" name="imageUrl" label="Image URL" value={promo.imageUrl || ''} onChange={handleChange} className={styles.input} />
          
          <Input type="text" name="discount" label="Discount" value={promo.discount || ''} onChange={handleChange} className={styles.input} />
          
          <label htmlFor="terms" className={styles.label}>Terms:</label>
          <textarea id="terms" name="terms" value={promo.terms || ''} onChange={handleChange} className={styles.textarea} />
          
          <Input type="text" name="promoCode" label="Promo Code" value={promo.promoCode || ''} onChange={handleChange} className={styles.input} />
          
          <Input type="text" name="claimCount" label="Claim Count" value={promo.claimCount || ''} onChange={handleChange} className={styles.input} />
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" className={styles.button} disabled={loading}>Update Promo</Button>
        <Button type="button" onClick={() => router.back()} className={`${styles.button} ${styles.buttonCancel}`}>Cancel</Button>
      </CardFooter>
    </Card>
  );
};

export default UpdatePromo;

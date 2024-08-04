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
  const { id } = router.query;
  const [promo, setPromo] = useState({
    title: '',
    description: '',
    imageFile: null,
    discount: '',
    terms: '',
    promoCode: '',
    claimCount: ''
  });

  useEffect(() => {
    if (id) {
      const fetchPromo = async () => {
        try {
          const result = await axios.get(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promo/${id}`, {
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
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageFile') {
      setPromo({ ...promo, imageFile: files[0] });
    } else {
      setPromo({ ...promo, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', promo.title);
    formData.append('description', promo.description);
    formData.append('discount', promo.discount);
    formData.append('terms', promo.terms);
    formData.append('promoCode', promo.promoCode);
    formData.append('claimCount', promo.claimCount);
    if (promo.imageFile) {
      formData.append('image', promo.imageFile);
    }

    console.log('Submitting promo update with ID:', id);
    console.log('Promo data:', formData);

    try {
      const response = await updateItem(id, formData);
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

          <label htmlFor="imageFile" className={styles.label}>Image File:</label> {/* Change label */}
          <input type="file" id="imageFile" name="imageFile" onChange={handleChange} className={styles.input} />

          <Input type="text" name="discount" label="Discount" value={promo.discount || ''} onChange={handleChange} className={styles.input} />

          <label htmlFor="terms" className={styles.label}>Terms:</label>
          <textarea id="terms" name="terms" value={promo.terms || ''} onChange={handleChange} className={styles.textarea} />

          <Input type="text" name="promoCode" label="Promo Code" value={promo.promoCode || ''} onChange={handleChange} className={styles.input} />

          <Input type="text" name="claimCount" label="Claim Count" value={promo.claimCount || ''} onChange={handleChange} className={styles.input} />

          <Button type="submit" className={styles.button} disabled={loading}>Update Promo</Button>
          <Button type="button" onClick={() => router.back()} className={`${styles.button} ${styles.buttonCancel}`}>Cancel</Button>
        </form>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  );
};

export default UpdatePromo;

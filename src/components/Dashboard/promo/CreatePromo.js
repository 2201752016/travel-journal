import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../../styles/CreateForm.module.css';

const CreatePromo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [minClaimPrice, setMinClaimPrice] = useState('');
  const [terms, setTerms] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('promoCode', promoCode);
    formData.append('minClaimPrice', minClaimPrice);
    formData.append('terms', terms);
    formData.append('discountPrice', discountPrice);
    formData.append('image', imageFile);

    try {
      await axios.post('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-promo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
        },
      });
      router.push('/dashboard/promo');
    } catch (error) {
      console.error('Error creating promo:', error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1>Create Promo</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label htmlFor="description">Description</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />

        <label htmlFor="promoCode">Promo Code</label>
        <input type="text" id="promoCode" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} required />

        <label htmlFor="minClaimPrice">Minimum Claim Price</label>
        <input type="number" id="minClaimPrice" value={minClaimPrice} onChange={(e) => setMinClaimPrice(e.target.value)} required />

        <label htmlFor="terms">Terms & Conditions</label>
        <textarea id="terms" value={terms} onChange={(e) => setTerms(e.target.value)} required />

        <label htmlFor="discountPrice">Promo Discount Price</label>
        <input type="number" id="discountPrice" value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)} required />

        <label htmlFor="image">Image File</label>
        <input type="file" id="image" onChange={(e) => setImageFile(e.target.files[0])} required />

        <button type="submit">Create Promo</button>
        <button type="button" onClick={() => router.back()}>Cancel</button>
      </form>
    </div>
  );
};

export default CreatePromo;

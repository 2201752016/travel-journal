import { useState } from 'react';
import useCreate from "@/useApi/useCreate";
import { useRouter } from 'next/router';
import styles from '../../../styles/CreateForm.module.css';

const CreatePromo = () => {
  const [promoImage, setPromoImage] = useState(null);
  const [promp, setPromp] = useState('');
  const { postCreate } = useCreate();
  const router = useRouter();

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file?.type?.startsWith('image/')) {
      setPromp('File should be .jpeg, .jpg or .png format');
      return;
    }
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await postCreate('upload-image', formData);
      setPromoImage(res.data.url);
    } catch (err) {
      setPromp(err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const promoData = {
      title: e.target.title.value,
      description: e.target.description.value,
      imageUrl: promoImage,
      terms_condition: e.target.term.value,
      promo_code: e.target.code.value,
      promo_discount_price: Number(e.target.discount.value),
      minimum_claim_price: Number(e.target.claim.value),
    };
    console.log(promoData);
    try {
      const res = await postCreate('create-promo', promoData);
      if (res?.status === 200) {
        setPromp(res?.data?.message);
      }
    } catch (err) {
      setPromp(err?.response?.data?.message);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.heading}>Create Promo</h1>
      <p>{promp}</p>
      <form onSubmit={handleUpload}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="title">Title</label>
          <input className={styles.input} type="text" id="title" name="title" required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="description">Description</label>
          <textarea className={styles.textarea} id="description" name="description" required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="promoCode">Promo Code</label>
          <input className={styles.input} type="text" id="promoCode" name="code" required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="minClaimPrice">Minimum Claim Price</label>
          <input className={styles.input} type="number" id="minClaimPrice" name="claim" required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="terms">Terms & Conditions</label>
          <textarea className={styles.textarea} id="terms" name="term" required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="discountPrice">Promo Discount Price</label>
          <input className={styles.input} type="number" id="discountPrice" name="discount" required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="image">Image File</label>
          <input className={styles.input} type="file" id="image" name="image" onChange={handleChange} required />
        </div>
        <div className={styles.buttonContainer}>
          <button className={`${styles.button} ${styles.buttonSubmit}`} type="submit">Create Promo</button>
          <button className={`${styles.button} ${styles.buttonCancel}`} type="button" onClick={() => router.push('/dashboard')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePromo;

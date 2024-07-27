import { useState } from 'react';
import useCreate from "@/useApi/useCreate";
import { useRouter } from 'next/router';
import styles from '../../../styles/Form.module.css';

const CreatePromo = () => {
  const [promoImage,setpromoImage] = useState(null);
    const [promp, setPromp] = useState('');
    const {postCreate} = useCreate();
    const route = useRouter()

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
            setpromoImage(res.data.url);
        } catch (err) {
            setPromp(err);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const promoData ={
            title:e.target.title.value,
            description:e.target.description.value,
            imageUrl:promoImage,
            terms_condition:e.target.term.value,
            promo_code:e.target.code.value,
            promo_discount_price: Number(e.target.discount.value),
            minimum_claim_price: Number(e.target.claim.value),
        }
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
      <h1>Create Promo</h1>
      <p>{promp}</p>
      <form onSubmit={handleUpload}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name='title' required />

        <label htmlFor="description">Description</label>
        <textarea id="description"  name='description' required />

        <label htmlFor="promoCode">Promo Code</label>
        <input type="text" id="promoCode" name='code' required />

        <label htmlFor="minClaimPrice">Minimum Claim Price</label>
        <input type="number" id="minClaimPrice" name='claim' required />

        <label htmlFor="terms">Terms & Conditions</label>
        <textarea id="terms" name='term' required />

        <label htmlFor="discountPrice">Promo Discount Price</label>
        <input type="number" id="discountPrice" name='discount' required />

        <label htmlFor="image">Image File</label>
        <input type="file" id="image" name='image' onChange={handleChange} required />

        <button type="submit">Create Promo</button>
      </form>
    </div>
  );
};

export default CreatePromo;

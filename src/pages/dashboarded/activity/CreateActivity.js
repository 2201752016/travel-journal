// CreateActivity.js
import { useState, useEffect } from 'react';
import useCreate from '../../../useApi/useCreate';
import axios from 'axios';
import styles from '../../../styles/CreateForm.module.css';
import { useRouter } from 'next/router';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const CreateActivity = () => {
  const [activityImage, setActivityImage] = useState(null);
  const [promp, setPromp] = useState('');
  const [categories, setCategories] = useState([]);
  const { postCreate } = useCreate();
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          },
        });
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

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
      setActivityImage(res.data.url);
    } catch (err) {
      setPromp(err.message);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const activityData = {
      categoryId: e.target.category.value,
      title: e.target.title.value,
      description: e.target.description.value,
      imageUrls: [activityImage],
      price: Number(e.target.price.value),
      price_discount: Number(e.target.priceDiscount.value),
      rating: Number(e.target.rating.value),
      total_reviews: Number(e.target.totalReview.value),
      facilities: e.target.facilities.value,
      address: e.target.address.value,
      province: e.target.province.value,
      city: e.target.city.value,
      location_maps: e.target.locationMaps.value,
    };

    console.log('activityData:', activityData);

    try {
      const res = await postCreate('create-activity', activityData);
      if (res?.status === 200) {
        setPromp(res?.data?.message);
        router.push('/dashboarded/activity');
      }
    } catch (err) {
      console.error('Error creating activity:', err);
      setPromp(err?.response?.data?.message);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.heading}>Create Activity</h1>
      <p className={styles.promp}>{promp}</p>
      <form onSubmit={handleUpload} className={styles.form}>
        <label htmlFor="title" className={styles.label}>Title</label>
        <Input type="text" id="title" name='title' required className={styles.input} />

        <label htmlFor="category" className={styles.label}>Category</label>
        <select id="category" name='category' required className={styles.select}>
          <option value="">Select</option>
          {Array.isArray(categories) && categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <label htmlFor="description" className={styles.label}>Description</label>
        <textarea id="description" name="description" required className={styles.textarea} />

        <label htmlFor="price" className={styles.label}>Price</label>
        <Input type="number" id="price" name='price' required className={styles.input} />

        <label htmlFor="priceDiscount" className={styles.label}>Price Discount</label>
        <Input type="number" id="priceDiscount" name='priceDiscount' required className={styles.input} />

        <label htmlFor="rating" className={styles.label}>Rating</label>
        <Input type="number" id="rating" name='rating' required className={styles.input} />

        <label htmlFor="totalReview" className={styles.label}>Total Review</label>
        <Input type="number" id="totalReview" name='totalReview' required className={styles.input} />

        <label htmlFor="facilities" className={styles.label}>Facilities</label>
        <Input type="text" id="facilities" name='facilities' required className={styles.input} />

        <label htmlFor="address" className={styles.label}>Address</label>
        <Input type="text" id="address" name='address' required className={styles.input} />

        <label htmlFor="city" className={styles.label}>City</label>
        <Input type="text" id="city" name='city' required className={styles.input} />

        <label htmlFor="province" className={styles.label}>Province</label>
        <Input type="text" id="province" name='province' required className={styles.input} />

        <label htmlFor="locationMaps" className={styles.label}>Location Maps</label>
        <Input type="text" id="locationMaps" name='locationMaps' required className={styles.input} />

        <label htmlFor="image" className={styles.label}>Image Files</label>
        <Input type="file" id="image" name='image' multiple onChange={handleChange} required className={styles.input} />

        <div className={styles.buttonContainer}>
          <Button type="submit" className={styles.button}>Create Activity</Button>
          <Button type="button" onClick={() => router.back()} className={`${styles.button} ${styles.buttonCancel}`}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateActivity;

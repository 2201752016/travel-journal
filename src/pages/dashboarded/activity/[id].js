import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import styles from '../../../styles/CreateForm.module.css';

const UpdateActivity = ({ activityId }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [priceDiscount, setPriceDiscount] = useState('');
  const [rating, setRating] = useState('');
  const [totalReview, setTotalReview] = useState('');
  const [facilities, setFacilities] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [locationMaps, setLocationMaps] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories', {
          headers: {
            apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          },
        });
        console.log('Categories response:', result.data);
        setCategories(result.data.data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]); 
      }
    };

    const fetchActivity = async () => {
      try {
        const result = await axios.get(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activity/${activityId}`, {
          headers: {
            apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          },
        });
        const activity = result.data;
        setTitle(activity.title);
        setCategory(activity.category);
        setDescription(activity.description);
        setPrice(activity.price);
        setPriceDiscount(activity.priceDiscount);
        setRating(activity.rating);
        setTotalReview(activity.totalReview);
        setFacilities(activity.facilities);
        setAddress(activity.address);
        setCity(activity.city);
        setProvince(activity.province);
        setLocationMaps(activity.locationMaps);
      } catch (error) {
        console.error('Error fetching activity:', error);
      }
    };

    fetchCategories();
    fetchActivity();
  }, [activityId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('priceDiscount', priceDiscount);
    formData.append('rating', rating);
    formData.append('totalReview', totalReview);
    formData.append('facilities', facilities);
    formData.append('address', address);
    formData.append('city', city);
    formData.append('province', province);
    formData.append('locationMaps', locationMaps);
    imageFiles.forEach((file) => formData.append('images', file));

    try {
      await axios.put(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-activity/${activityId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
        },
      });
      router.push('/dashboarded/activity');
    } catch (error) {
      console.error('Error updating activity:', error);
    }
  };

  return (
    <Card className={styles.formContainer}>
      <CardHeader>
        <CardTitle>Update Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input type="text" name="title" label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required className={styles.input} />

          <label htmlFor="category" className={styles.label}>Category</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required className={styles.input}>
            <option value="">Select</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          <Input type="text" name="description" label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required className={styles.input} />
          <Input type="number" name="price" label="Price" value={price} onChange={(e) => setPrice(e.target.value)} required className={styles.input} />
          <Input type="number" name="priceDiscount" label="Price Discount" value={priceDiscount} onChange={(e) => setPriceDiscount(e.target.value)} required className={styles.input} />
          <Input type="number" name="rating" label="Rating" value={rating} onChange={(e) => setRating(e.target.value)} required className={styles.input} />
          <Input type="number" name="totalReview" label="Total Review" value={totalReview} onChange={(e) => setTotalReview(e.target.value)} required className={styles.input} />
          <Input type="text" name="facilities" label="Facilities" value={facilities} onChange={(e) => setFacilities(e.target.value)} required className={styles.input} />
          <Input type="text" name="address" label="Address" value={address} onChange={(e) => setAddress(e.target.value)} required className={styles.input} />
          <Input type="text" name="city" label="City" value={city} onChange={(e) => setCity(e.target.value)} required className={styles.input} />
          <Input type="text" name="province" label="Province" value={province} onChange={(e) => setProvince(e.target.value)} required className={styles.input} />
          <Input type="text" name="locationMaps" label="Location Maps" value={locationMaps} onChange={(e) => setLocationMaps(e.target.value)} required className={styles.input} />

          <label htmlFor="image" className={styles.label}>Image Files</label>
          <input type="file" id="image" multiple onChange={(e) => setImageFiles(Array.from(e.target.files))} className={styles.input} />

          <CardFooter>
            <Button type="submit" className={styles.button}>Update Activity</Button>
            <Button type="button" onClick={() => router.back()} className={`${styles.button} ${styles.buttonCancel}`}>Cancel</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdateActivity;

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
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
      const result = await axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories', {
        headers: {
          apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
        },
      });
      setCategories(result.data);
    };

    const fetchActivity = async () => {
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
    <div className={styles.formContainer}>
      <h1>Update Activity</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label htmlFor="category">Category</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <label htmlFor="description">Description</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />

        <label htmlFor="price">Price</label>
        <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />

        <label htmlFor="priceDiscount">Price Discount</label>
        <input type="number" id="priceDiscount" value={priceDiscount} onChange={(e) => setPriceDiscount(e.target.value)} required />

        <label htmlFor="rating">Rating</label>
        <input type="number" id="rating" value={rating} onChange={(e) => setRating(e.target.value)} required />

        <label htmlFor="totalReview">Total Review</label>
        <input type="number" id="totalReview" value={totalReview} onChange={(e) => setTotalReview(e.target.value)} required />

        <label htmlFor="facilities">Facilities</label>
        <input type="text" id="facilities" value={facilities} onChange={(e) => setFacilities(e.target.value)} required />

        <label htmlFor="address">Address</label>
        <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />

        <label htmlFor="city">City</label>
        <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} required />

        <label htmlFor="province">Province</label>
        <input type="text" id="province" value={province} onChange={(e) => setProvince(e.target.value)} required />

        <label htmlFor="locationMaps">Location Maps</label>
        <input type="text" id="locationMaps" value={locationMaps} onChange={(e) => setLocationMaps(e.target.value)} required />

        <label htmlFor="image">Image Files</label>
        <input type="file" id="image" multiple onChange={(e) => setImageFiles(Array.from(e.target.files))} />

        <button type="submit">Update Activity</button>
        <button type="button" onClick={() => router.back()}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdateActivity;

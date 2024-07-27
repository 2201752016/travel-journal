import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../../styles/UpdateForm.module.css';
import useCreate from "@/useApi/useCreate";

const UpdateActivity = () => {
    const { postCreate } = useCreate();
    const router = useRouter();
    const { id } = router.query;
    const [activity, setActivity] = useState({
        categoryId: '',
        title: '',
        description: '',
        price: '',
        price_discount: '',
        rating: '',
        total_reviews: '',
        facilities: '',
        address: '',
        city: '',
        province: '',
        location_maps: '',
        images: []
    });
    const [categories, setCategories] = useState([]);

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

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'images') {
            setActivity({ ...activity, [name]: files });
        } else {
            setActivity({ ...activity, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await postCreate('create-activity', activity);
            router.push('/dashboarded/activity');
        } catch (error) {
            console.error('Error updating activity:', error);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h1>Update Activity</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label htmlFor="categoryId" className={styles.label}>Category</label>
                <select id="categoryId" name="categoryId" value={activity.categoryId} onChange={handleChange} className={styles.input} required>
                    <option value="">Select</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>

                <label htmlFor="title" className={styles.label}>Title</label>
                <input type="text" id="title" name="title" value={activity.title || ''} onChange={handleChange} required className={styles.input} />

                <label htmlFor="description" className={styles.label}>Description</label>
                <textarea id="description" name="description" value={activity.description || ''} onChange={handleChange} required className={styles.textarea}></textarea>

                <label htmlFor="price" className={styles.label}>Price</label>
                <input type="number" id="price" name="price" value={activity.price || ''} onChange={handleChange} required className={styles.input} />

                <label htmlFor="price_discount" className={styles.label}>Price Discount</label>
                <input type="number" id="price_discount" name="price_discount" value={activity.price_discount || ''} onChange={handleChange} required className={styles.input} />

                <label htmlFor="rating" className={styles.label}>Rating</label>
                <input type="number" id="rating" name="rating" value={activity.rating || ''} onChange={handleChange} required className={styles.input} />

                <label htmlFor="total_reviews" className={styles.label}>Total Review</label>
                <input type="number" id="total_reviews" name="total_reviews" value={activity.total_reviews || ''} onChange={handleChange} required className={styles.input} />

                <label htmlFor="facilities" className={styles.label}>Facilities</label>
                <input type="text" id="facilities" name="facilities" value={activity.facilities || ''} onChange={handleChange} required className={styles.input} />

                <label htmlFor="address" className={styles.label}>Address</label>
                <input type="text" id="address" name="address" value={activity.address || ''} onChange={handleChange} required className={styles.input} />

                <label htmlFor="city" className={styles.label}>City</label>
                <input type="text" id="city" name="city" value={activity.city || ''} onChange={handleChange} required className={styles.input} />

                <label htmlFor="province" className={styles.label}>Province</label>
                <input type="text" id="province" name="province" value={activity.province || ''} onChange={handleChange} required className={styles.input} />

                <label htmlFor="location_maps" className={styles.label}>Location Maps</label>
                <input type="text" id="location_maps" name="location_maps" value={activity.location_maps || ''} onChange={handleChange} required className={styles.input} />

                <label htmlFor="images" className={styles.label}>Image Files</label>
                <input type="file" id="images" name="images" multiple onChange={handleChange} className={styles.input} />

                <button type="submit" className={styles.button}>Update Activity</button>
                <button type="button" onClick={() => router.back()} className={`${styles.button} ${styles.buttonCancel}`}>Cancel</button>
            </form>
        </div>
    );
};

export default UpdateActivity;

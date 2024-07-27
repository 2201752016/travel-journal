import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../../styles/UpdateForm.module.css';

const UpdateActivity = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [rating, setRating] = useState('');
    const [totalReview, setTotalReview] = useState('');
    const [facilities, setFacilities] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [locationMaps, setLocationMaps] = useState('');
    const [imageFiles, setImageFiles] = useState([]);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchActivity = async () => {
            const result = await axios.get(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activity/${id}`, {
                headers: {
                    apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
                },
            });
            const activity = result.data.data;
            setName(activity.name);
            setDescription(activity.description);
            setPrice(activity.price);
            setRating(activity.rating);
            setTotalReview(activity.totalReview);
            setFacilities(activity.facilities);
            setAddress(activity.address);
            setCity(activity.city);
            setProvince(activity.province);
            setLocationMaps(activity.locationMaps);
        };

        fetchActivity();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('rating', rating);
        formData.append('totalReview', totalReview);
        formData.append('facilities', facilities);
        formData.append('address', address);
        formData.append('city', city);
        formData.append('province', province);
        formData.append('locationMaps', locationMaps);
        imageFiles.forEach((file) => formData.append('image', file));

        try {
            await axios.put(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-activity/${id}`, formData, {
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
            <form onSubmit={handleSubmit} className={styles.form}>
                <label htmlFor="name" className={styles.label}>Name</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className={styles.input} />

                <label htmlFor="description" className={styles.label}>Description</label>
                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required className={styles.textarea}></textarea>

                <label htmlFor="price" className={styles.label}>Price</label>
                <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required className={styles.input} />

                <label htmlFor="rating" className={styles.label}>Rating</label>
                <input type="number" id="rating" value={rating} onChange={(e) => setRating(e.target.value)} required className={styles.input} />

                <label htmlFor="totalReview" className={styles.label}>Total Review</label>
                <input type="number" id="totalReview" value={totalReview} onChange={(e) => setTotalReview(e.target.value)} required className={styles.input} />

                <label htmlFor="facilities" className={styles.label}>Facilities</label>
                <input type="text" id="facilities" value={facilities} onChange={(e) => setFacilities(e.target.value)} required className={styles.input} />

                <label htmlFor="address" className={styles.label}>Address</label>
                <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required className={styles.input} />

                <label htmlFor="city" className={styles.label}>City</label>
                <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} required className={styles.input} />

                <label htmlFor="province" className={styles.label}>Province</label>
                <input type="text" id="province" value={province} onChange={(e) => setProvince(e.target.value)} required className={styles.input} />

                <label htmlFor="locationMaps" className={styles.label}>Location Maps</label>
                <input type="text" id="locationMaps" value={locationMaps} onChange={(e) => setLocationMaps(e.target.value)} required className={styles.input} />

                <label htmlFor="image" className={styles.label}>Image Files</label>
                <input type="file" id="image" multiple onChange={(e) => setImageFiles(Array.from(e.target.files))} className={styles.input} />

                <button type="submit" className={styles.button}>Update Activity</button>
                <button type="button" onClick={() => router.back()} className={`${styles.button} ${styles.buttonCancel}`}>Cancel</button>
            </form>
        </div>
    );
};

export default UpdateActivity;

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../../styles/UpdateForm.module.css';
import useUpdate from "@/useApi/useUpdate";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const UpdateActivity = () => {
    const { updateItem, loading, error, success } = useUpdate('activity');
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
        if (id) {
            const fetchActivity = async () => {
                try {
                    const result = await axios.get(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activity/${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
                        },
                    });
                    setActivity(result.data.data);
                } catch (error) {
                    console.error('Error fetching activity:', error);
                }
            };

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

            fetchActivity();
            fetchCategories();
        }
    }, [id]);

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
        const formData = new FormData();
        formData.append('categoryId', activity.categoryId);
        formData.append('title', activity.title);
        formData.append('description', activity.description);
        formData.append('price', activity.price);
        formData.append('price_discount', activity.price_discount);
        formData.append('rating', activity.rating);
        formData.append('total_reviews', activity.total_reviews);
        formData.append('facilities', activity.facilities);
        formData.append('address', activity.address);
        formData.append('city', activity.city);
        formData.append('province', activity.province);
        formData.append('location_maps', activity.location_maps);
        Array.from(activity.images).forEach((file, index) => {
            formData.append(`images[${index}]`, file);
        });

        console.log('Submitting activity update with ID:', id);
        console.log('Activity data:', formData);

        try {
            const response = await updateItem(id, formData);
            console.log('Update response:', response);

            if (response.status === 200 || response.status === 201) {
                console.log('Activity updated successfully!');
                router.push('/dashboarded/activity');
            } else {
                console.error('Update failed:', response.data);
            }
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
                {error && <p className={styles.error}>{error.message}</p>}
                {success && <p className={styles.success}>Activity updated successfully!</p>}
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label htmlFor="categoryId" className={styles.label}>Category</label>
                    <select id="categoryId" name="categoryId" value={activity.categoryId} onChange={handleChange} className={styles.input} required>
                        <option value="">Select</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>

                    <Input type="text" name="title" label="Title" value={activity.title || ''} onChange={handleChange} required className={styles.input} />

                    <label htmlFor="description" className={styles.label}>Description</label>
                    <textarea id="description" name="description" value={activity.description || ''} onChange={handleChange} required className={styles.textarea}></textarea>

                    <Input type="number" name="price" label="Price" value={activity.price || ''} onChange={handleChange} required className={styles.input} />

                    <Input type="number" name="price_discount" label="Price Discount" value={activity.price_discount || ''} onChange={handleChange} required className={styles.input} />

                    <Input type="number" name="rating" label="Rating" value={activity.rating || ''} onChange={handleChange} required className={styles.input} />

                    <Input type="number" name="total_reviews" label="Total Review" value={activity.total_reviews || ''} onChange={handleChange} required className={styles.input} />

                    <Input type="text" name="facilities" label="Facilities" value={activity.facilities || ''} onChange={handleChange} required className={styles.input} />

                    <Input type="text" name="address" label="Address" value={activity.address || ''} onChange={handleChange} required className={styles.input} />

                    <Input type="text" name="city" label="City" value={activity.city || ''} onChange={handleChange} required className={styles.input} />

                    <Input type="text" name="province" label="Province" value={activity.province || ''} onChange={handleChange} required className={styles.input} />

                    <Input type="text" name="location_maps" label="Location Maps" value={activity.location_maps || ''} onChange={handleChange} required className={styles.input} />

                    <label htmlFor="images" className={styles.label}>Image Files</label>
                    <input type="file" id="images" name="images" multiple onChange={handleChange} className={styles.input} />
                </form>
            </CardContent>
            <CardFooter>
                <Button type="submit" className={styles.button} disabled={loading}>Update Activity</Button>
                <Button type="button" onClick={() => router.back()} className={`${styles.button} ${styles.buttonCancel}`}>Cancel</Button>
            </CardFooter>
        </Card>
    );
};

export default UpdateActivity;

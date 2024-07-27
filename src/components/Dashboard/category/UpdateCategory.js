import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../../styles/UpdateForm.module.css';

const UpdateCategory = () => {
    const [name, setName] = useState('');
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchCategory = async () => {
            const result = await axios.get(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/category/${id}`, {
                headers: {
                    apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
                },
            });
            const category = result.data.data;
            setName(category.name);
        };

        fetchCategory();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);

        try {
            await axios.put(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-category/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
                },
            });
            router.push('/dashboarded/category');
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h1>Update Category</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label htmlFor="name" className={styles.label}>Name</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className={styles.input} />

                <button type="submit" className={styles.button}>Update Category</button>
                <button type="button" onClick={() => router.back()} className={`${styles.button} ${styles.buttonCancel}`}>Cancel</button>
            </form>
        </div>
    );
};

export default UpdateCategory;

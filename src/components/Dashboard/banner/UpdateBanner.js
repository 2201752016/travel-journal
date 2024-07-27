import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../../styles/UpdateForm.module.css';

const UpdateBanner = () => {
    const [title, setTitle] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchBanner = async () => {
            const result = await axios.get(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banner/${id}`, {
                headers: {
                    apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
                },
            });
            const banner = result.data.data;
            setTitle(banner.title);
        };

        fetchBanner();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            await axios.put(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-banner/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
                },
            });
            router.push('/dashboarded/banner');
        } catch (error) {
            console.error('Error updating banner:', error);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h1>Update Banner</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label htmlFor="title" className={styles.label}>Title</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className={styles.input} />

                <label htmlFor="image" className={styles.label}>Image File</label>
                <input type="file" id="image" onChange={(e) => setImageFile(e.target.files[0])} className={styles.input} />

                <button type="submit" className={styles.button}>Update Banner</button>
                <button type="button" onClick={() => router.back()} className={`${styles.button} ${styles.buttonCancel}`}>Cancel</button>
            </form>
        </div>
    );
};

export default UpdateBanner;

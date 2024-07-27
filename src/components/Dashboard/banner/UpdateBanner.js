import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../../styles/UpdateForm.module.css';
import useCreate from "@/useApi/useCreate";

const UpdateBanner = () => {
    const { postCreate } = useCreate();
    const router = useRouter();
    const { id } = router.query;
    const [banner, setBanner] = useState({
        title: '',
        image: null
    });

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const result = await axios.get(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banner/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
                    },
                });
                setBanner({ title: result.data.data.title });
            } catch (error) {
                console.error('Error fetching banner:', error);
            }
        };
        if (id) {
            fetchBanner();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setBanner({ ...banner, [name]: files[0] });
        } else {
            setBanner({ ...banner, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', banner.title);
        if (banner.image) {
            formData.append('image', banner.image);
        }

        try {
            await postCreate('create-banner', formData);
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
                <input type="text" id="title" name="title" value={banner.title || ''} onChange={handleChange} required className={styles.input} />

                <label htmlFor="image" className={styles.label}>Image File</label>
                <input type="file" id="image" name="image" onChange={handleChange} className={styles.input} />

                <button type="submit" className={styles.button}>Update Banner</button>
                <button type="button" onClick={() => router.back()} className={`${styles.button} ${styles.buttonCancel}`}>Cancel</button>
            </form>
        </div>
    );
};

export default UpdateBanner;

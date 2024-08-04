import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../../styles/UpdateForm.module.css';
import useUpdate from "@/useApi/useUpdate";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input'; 

const UpdateBanner = () => {
    const { updateItem, loading, error, success } = useUpdate('banner');
    const router = useRouter();
    const { id } = router.query;
    const [banner, setBanner] = useState({
        title: '',
        image: null
    });

    useEffect(() => {
        if (id) {
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
            fetchBanner();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setBanner({ ...banner, [name]: files ? files[0] : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', banner.title);
        if (banner.image) {
            formData.append('image', banner.image);
        }

        console.log('Submitting banner update with ID:', id);
        console.log('Banner data:', formData);

        try {
            const response = await updateItem(id, formData);
            console.log('Update response:', response);

            if (response && (response.status === 200 || response.status === 201)) {
                console.log('Banner updated successfully!');
                router.push('/dashboarded/banner');
            } else {
                console.error('Update failed:', response.data);
            }
        } catch (error) {
            console.error('Error updating banner:', error);
        }
    };

    return (
        <Card className={styles.formContainer}>
            <CardHeader>
                <CardTitle>Update Banner</CardTitle>
            </CardHeader>
            <CardContent>
                {error && <p className={styles.error}>{error.message}</p>}
                {success && <p className={styles.success}>Banner updated successfully!</p>}
                <form onSubmit={handleSubmit} className={styles.form}>
                    <Input type="text" name="title" label="Title" value={banner.title || ''} onChange={handleChange} required className={styles.input} />

                    <label htmlFor="image" className={styles.label}>Image File</label>
                    <input type="file" id="image" name="image" onChange={handleChange} className={styles.input} />

                    <Button type="submit" className={styles.button} disabled={loading}>Update Banner</Button>
                    <Button type="button" onClick={() => router.back()} className={`${styles.button} ${styles.buttonCancel}`}>Cancel</Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default UpdateBanner;

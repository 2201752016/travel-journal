import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../../styles/UpdateForm.module.css';
import useUpdate from "@/useApi/useUpdate";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const UpdateCategory = () => {
    const { updateItem, loading, error, success } = useUpdate('category');
    const router = useRouter();
    const { id } = router.query;
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState({
        name: '',
        parentCategoryId: '',
        imageUrl: ''
    });
    const [promp, setPromp] = useState('');
    const [categoryImage, setCategoryImage] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchCategory = async () => {
                try {
                    const result = await axios.get(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/category/${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
                        },
                    });
                    setCategory(result.data.data);
                } catch (error) {
                    console.error('Error fetching category:', error);
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

            fetchCategory();
            fetchCategories();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            const file = files[0];
            if (!file?.type?.startsWith('image/')) {
                setPromp('File should be .jpeg, .jpg or .png format');
                return;
            }
            const formData = new FormData();
            formData.append('image', file);
            axios.post('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
                },
            })
                .then(res => {
                    setCategoryImage(res.data.url);
                })
                .catch(err => {
                    setPromp(err.response.data.message);
                });
        } else {
            setCategory({ ...category, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const categoryData = { ...category, imageUrl: categoryImage || category.imageUrl };

        console.log('Submitting category update with ID:', id);
        console.log('Category data:', categoryData);

        try {
            const response = await updateItem(id, categoryData);
            console.log('Update response:', response);

            if (response.status === 200 || response.status === 201) {
                console.log('Category updated successfully!');
                router.push('/dashboarded/category');
            } else {
                console.error('Update failed:', response.data);
            }
        } catch (err) {
            console.error('Error updating category:', err);
        }
    };

    return (
        <Card className={styles.formContainer}>
            <CardHeader>
                <CardTitle>Update Category</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{promp}</p>
                {error && <p className={styles.error}>{error.message}</p>}
                {success && <p className={styles.success}>Category updated successfully!</p>}
                <form onSubmit={handleSubmit} className={styles.form}>
                    <Input type="text" name="name" label="Name" value={category.name || ''} onChange={handleChange} required className={styles.input} />

                    <label htmlFor="parentCategoryId" className={styles.label}>Select Parent Category</label>
                    <select id="parentCategoryId" name="parentCategoryId" value={category.parentCategoryId} onChange={handleChange} className={styles.input} required>
                        <option value="">Select</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>

                    <label htmlFor="image" className={styles.label}>Image File</label>
                    <input type="file" id="image" name="image" onChange={handleChange} className={styles.input} />

                    <Button type="submit" className={styles.button} disabled={loading}>Update Category</Button>
                    <Button type="button" onClick={() => router.back()} className={`${styles.button} ${styles.buttonCancel}`}>Cancel</Button>
                </form>
            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    );
};

export default UpdateCategory;


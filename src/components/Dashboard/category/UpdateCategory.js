import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../../styles/UpdateForm.module.css';
import useCreate from "@/useApi/useCreate";
import useDelete from "@/useApi/useDelete";

const UpdateCategory = () => {
    const { postCreate } = useCreate();
    const { deleteData } = useDelete();
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
        if (name === 'image') {
            const file = files[0];
            if (!file?.type?.startsWith('image/')) {
                setPromp('File should be .jpeg, .jpg or .png format');
                return;
            }
            const formData = new FormData();
            formData.append('image', file);
            postCreate('upload-image', formData)
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
        try {
            await postCreate('create-category', categoryData);
            await deleteData(`delete-category/${id}`);
            router.push('/dashboarded/category');
        } catch (err) {
            setPromp(err?.response?.data?.message);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h1>Update Category</h1>
            <p>{promp}</p>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label htmlFor="name" className={styles.label}>Name</label>
                <input type="text" id="name" name="name" value={category.name || ''} onChange={handleChange} required className={styles.input} />

                <label htmlFor="parentCategoryId" className={styles.label}>Select Parent Category</label>
                <select id="parentCategoryId" name="parentCategoryId" value={category.parentCategoryId} onChange={handleChange} className={styles.input} required>
                    <option value="">Select</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>

                <label htmlFor="image" className={styles.label}>Image File</label>
                <input type="file" id="image" name="image" onChange={handleChange} className={styles.input} />

                <button type="submit" className={styles.button}>Update Category</button>
                <button type="button" onClick={() => router.back()} className={`${styles.button} ${styles.buttonCancel}`}>Cancel</button>
            </form>
        </div>
    );
};

export default UpdateCategory;

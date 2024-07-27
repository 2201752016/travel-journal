import { useState } from 'react';
import useCreate from '../../../useApi/useCreate';
import styles from '../../../styles/CreateForm.module.css';
import { useRouter } from 'next/router';

const CreateCategory = () => {
    const [categoryImage, setCategoryImage] = useState(null);
    const [promp, setPromp] = useState('');
    const { postCreate } = useCreate();
    const router = useRouter();

    const handleChange = async (e) => {
        const file = e.target.files[0];
        if (!file?.type?.startsWith('image/')) {
            setPromp('File should be .jpeg, .jpg or .png format');
            return;
        }
        const formData = new FormData();
        formData.append('image', file);
        try {
            const res = await postCreate('upload-image', formData);
            setCategoryImage(res.data.url);
        } catch (err) {
            setPromp(err);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const categoryData = {
            name: e.target.name.value,
            imageUrl: categoryImage,
        };
        console.log(categoryData);
        try {
            const res = await postCreate('create-category', categoryData);
            if (res?.status === 200) {
                setPromp(res?.data?.message);
                router.push('/dashboarded/category');
            }
        } catch (err) {
            setPromp(err?.response?.data?.message);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h1>Create Category</h1>
            <p>{promp}</p>
            <form onSubmit={handleUpload}>
                <label htmlFor="name">Category Name</label>
                <input type="text" id="name" name="name" required />

                <label htmlFor="image">Image File</label>
                <input type="file" id="image" name="image" onChange={handleChange} required />

                <button type="submit">Create Category</button>
            </form>
        </div>
    );
};

export default CreateCategory;

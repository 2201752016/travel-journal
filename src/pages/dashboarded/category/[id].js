import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../../styles/CreateForm.module.css';

const UpdateCategory = ({ categoryId }) => {
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCategory = async () => {
      const result = await axios.get(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/category/${categoryId}`, {
        headers: {
          apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
        },
      });
      const category = result.data;
      setName(category.name);
    };

    fetchCategory();
  }, [categoryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      await axios.put(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-category/${categoryId}`, formData, {
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Category Name</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

        <label htmlFor="image">Image File</label>
        <input type="file" id="image" onChange={(e) => setImageFile(e.target.files[0])} />

        <button type="submit">Update Category</button>
        <button type="button" onClick={() => router.back()}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdateCategory;

import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/CreateForm.module.css';
import { useRouter } from 'next/router';

const CreateCategory = () => {
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', imageFile);

    try {
      await axios.post('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-category', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
        },
      });
      router.push('/dashboard/category');
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1>Create Category</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Category Name</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

        <label htmlFor="image">Image File</label>
        <input type="file" id="image" onChange={(e) => setImageFile(e.target.files[0])} required />

        <button type="submit">Create Category</button>
        <button type="button" onClick={() => router.back()}>Back</button>
      </form>
    </div>
  );
};

export default CreateCategory;

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../../styles/CreateForm.module.css';

const UpdateBanner = ({ bannerId }) => {
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBanner = async () => {
      const result = await axios.get(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banner/${bannerId}`, {
        headers: {
          apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
        },
      });
      const banner = result.data;
      setName(banner.name);
    };

    fetchBanner();
  }, [bannerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      await axios.put(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-banner/${bannerId}`, formData, {
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Banner Name</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

        <label htmlFor="image">Image File</label>
        <input type="file" id="image" onChange={(e) => setImageFile(e.target.files[0])} />

        <button type="submit">Update Banner</button>
        <button type="button" onClick={() => router.back()}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdateBanner;

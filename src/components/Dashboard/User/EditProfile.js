// /mnt/data/components/EditProfile.js

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import styles from '@/styles/Form.module.css';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import axios from 'axios';
import { setUser } from '@/redux/slices/authSlice';

const EditProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profilePictureUrl, setProfilePictureUrl] = useState(user?.profilePictureUrl || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Uploading file:', file.name); // Debug log
      const formData = new FormData();
      formData.append('image', file);
      try {
        const res = await axios.post('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Image upload response:', res.data); // Debug log
        setProfilePictureUrl(res.data.url);
      } catch (err) {
        alert('Failed to upload image');
        console.error('Image upload error:', err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Submitting form'); // Debug log
    try {
      const res = await axios.post('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-profile', {
        name,
        email,
        profilePictureUrl,
        phoneNumber,
      }, {
        headers: {
          apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Profile update response:', res.data); // Debug log
      dispatch(setUser(res.data.user)); // Update the Redux state with the new user data
      router.push('/profile'); // Redirect to profile page
    } catch (error) {
      alert('Failed to update profile. Please try again.');
      console.error('Profile update error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Edit Profile</h1>
        <Input label="Name" id="name" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input label="Email" id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input label="Profile Picture" id="profilePicture" name="profilePicture" type="file" onChange={handleFileChange} />
        <Input label="Phone Number" id="phoneNumber" name="phoneNumber" type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        <Button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Profile'}
        </Button>
      </form>
    </motion.div>
  );
};

export default EditProfile;

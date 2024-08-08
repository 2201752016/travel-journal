// /mnt/data/register.js

import { useState } from 'react';
import useAuth from '../useApi/useAuth';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import styles from '../styles/Form.module.css';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Dropdown from '../components/ui/Dropdown';
import axios from 'axios';

const Register = () => {
  const [image, setImage] = useState('');
  const { Auth, loading } = useAuth();
  const [prompt, setPrompt] = useState([]);
  const [role, setRole] = useState('user');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file?.type?.startsWith('image/')) {
      setPrompt('File should be .jpeg, .jpg or .png format');
      return;
    }
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await axios.post('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c'
        }
      });
      setImage(res.data.url);
    } catch (err) {
      setPrompt('Failed to upload image');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const name = e.target.name.value;
    const password = e.target.password.value;
    const passwordRepeat = e.target.passwordRepeat.value;
    const profilePictureUrl = image;
    const phoneNumber = e.target.phoneNumber.value;

    if (password !== passwordRepeat) {
      alert('Passwords do not match');
      return;
    }

    try {
      await Auth('register', { email, name, password, passwordRepeat, role, profilePictureUrl, phoneNumber });
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  return (
    <motion.div className={`${styles.formContainer}`}>
      <form onSubmit={handleRegister} className={styles.form}>
        <h1>Register</h1>
        <Input label="Email" id="email" name="email" type="email" required />
        <Input label="Name" id="name" name="name" type="text" required />
        <Input label="Password" id="password" name="password" type="password" required />
        <Input label="Confirm Password" id="passwordRepeat" name="passwordRepeat" type="password" required />
        <Input label="Profile Picture" id="image" name="image" type="file" onChange={handleChange} />
        <Input label="Phone Number" id="phoneNumber" name="phoneNumber" type="text" required />
        <Dropdown
          label="Role"
          options={[
            { value: 'user', label: 'User' },
            { value: 'admin', label: 'Admin' },
          ]}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Register'}
        </Button>
        <Link href="/login" passHref>
          <span className={styles.switchLink}>Already have an account? Login</span>
        </Link>
      </form>
    </motion.div>
  );
};

export default Register;

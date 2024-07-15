import { useState } from 'react';
import useAuth from '../api/useAuth';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from '../styles/Form.module.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { Auth, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await Auth('register', { email, password });
      if (response) {
        // Assuming registration also logs the user in
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', response.data.email);
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <motion.div className={styles.formContainer} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Register</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Register'}
        </button>
        <Link href="/login" passHref>
          <span className={styles.switchLink}>Already have an account? Login</span>
        </Link>
      </form>
    </motion.div>
  );
};

export default Register;

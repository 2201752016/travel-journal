import React from 'react';
import useAuth from '../useApi/useAuth';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import styles from '../styles/Form.module.css';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Login = () => {
  const { Auth, loading } = useAuth();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    Auth('login', { email, password });
  };

  return (
    <motion.div className={`${styles.formContainer} ${darkMode ? 'dark-mode' : ''}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Login</h1>
        <Input type="email" name="Email" id="email" required />
        <Input type="password" name="Password" id="password" required />
        <Button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </Button>
        <Link href="/register" passHref>
          <span className={styles.switchLink}>Don't have an account? Register</span>
        </Link>
      </form>
    </motion.div>
  );
};

export default Login;

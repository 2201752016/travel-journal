import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function useAuth() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const Auth = async (url, option) => {
    setLoading(true);
    try {
      const resp = await axios.post(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${url}`, option, {
        headers: {
          apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
        },
      });
      localStorage.setItem('token', resp.data.token);
      localStorage.setItem('email', resp.data.data.email);
      router.push('/dashboard');
      setLoading(false);
    } catch (error) {
      alert('Gagal melakukan autentikasi. Silakan coba lagi.');
      console.error('Error:', error.response?.data || error.message);
      setLoading(false);
    }
  };

  const userLog = async (url, callback) => {
    try {
      const resp = await axios.get(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${url}`, {
        headers: {
          apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (callback) callback(resp.data);
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
    }
  };

  return { Auth, userLog, loading };
}

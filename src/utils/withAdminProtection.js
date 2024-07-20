import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const withAdminProtection = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
      if (!user || user.role !== 'admin') {
        router.replace('/');
      }
    }, [user, router]);

    return user && user.role === 'admin' ? <WrappedComponent {...props} /> : null;
  };
};

export default withAdminProtection;

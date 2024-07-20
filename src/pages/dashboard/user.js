import withAdminProtection from '../../utils/withAdminProtection';
import UserList from '../../components/Dashboard/User/UserList';

const UserPage = () => {
  return <UserList />;
};

export default withAdminProtection(UserPage);

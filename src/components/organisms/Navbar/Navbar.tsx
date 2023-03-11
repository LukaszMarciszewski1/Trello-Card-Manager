import styles from './styles.module.scss';
import { useAuth } from 'hooks/useAuth';
import Button from 'components/common/Button/Button';

const Navbar: React.FC = () => {
  const { logout, user } = useAuth();

  const getUserInitial = (text: string | null) => {
    if (!text) return '';
    let initial = text.toUpperCase().substring(0, 2);
    return initial;
  };

  return (
    <div className={styles.navbar}>
      {user && (
        <div>
          <span className={styles.avatar}>{getUserInitial(user?.email)}</span>
          <span>{user?.email}</span>
        </div>
      )}
      {user && <Button onClick={logout} title={'Wyloguj'} style={{ width: 90, margin: 0 }} />}
    </div>
  );
};

export default Navbar;

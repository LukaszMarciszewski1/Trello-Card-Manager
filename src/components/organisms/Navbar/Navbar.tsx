import { useAuth } from 'hooks/useAuth';
import Button from 'components/common/Button/Button';
import styles from './styles.module.scss';

const Navbar: React.FC = () => {
  const { logout } = useAuth();
  const storedUser = localStorage.getItem('token');

  const getUserInitial = (text: string | null) => {
    if (!text) return '';
    let initial = text.toUpperCase().substring(0, 2);
    return initial;
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.top}>
        {storedUser && (
          <div>
            <span className={styles.avatar}>{getUserInitial('admin@demo')}</span>
            <span>{'admin@demo'}</span>
          </div>
        )}
        {storedUser && <Button onClick={logout} title={'Wyloguj'} style={{ width: 90, margin: 0 }} />}
      </div>
    </nav>
  );
};

export default Navbar;

import { useAuth } from 'hooks/useAuth';
import Button from 'components/common/Button/Button';
import styles from './styles.module.scss';
import { getDecodedToken } from "helpers/getDecodedToken";

const Navbar: React.FC = () => {
  const { logout } = useAuth();
  const storageToken = localStorage.getItem('token') ?? '';
  const decodedToken = getDecodedToken(storageToken);

  const getUserInitial = (text: string | null) => {
    if (!text) return '';
    let initial = text.toUpperCase().substring(0, 2);
    return initial;
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.top}>
        {storageToken && (
          <div>
            <span className={styles.avatar}>{getUserInitial(decodedToken?.user.email)}</span>
            <span>{decodedToken?.user.email}</span>
          </div>
        )}
        {storageToken && <Button onClick={logout} title={'Wyloguj'} style={{ width: 90, margin: 0 }} />}
      </div>
    </nav>
  );
};

export default Navbar;

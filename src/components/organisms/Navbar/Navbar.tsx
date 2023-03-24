import { Link,NavLink, useLocation } from 'react-router-dom';
import styles from './styles.module.scss';
import { useAuth } from 'hooks/useAuth';
import Button from 'components/common/Button/Button';



const Navbar: React.FC = () => {

  // const menuItems = [
  //   {
  //     name: 'Dodaj zlecenie',
  //     path: '/',
  //   },
  //   {
  //     name: 'Lista zleceń',
  //     path: '/lista-zlecen',
  //   },
  // ];
  const { logout, user } = useAuth();
  const location = useLocation()

  const getUserInitial = (text: string | null) => {
    if (!text) return '';
    let initial = text.toUpperCase().substring(0, 2);
    return initial;
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.top}>
        {user && (
          <div>
            <span className={styles.avatar}>{getUserInitial(user?.email)}</span>
            <span>{user?.email}</span>
          </div>
        )}
        {user && <Button onClick={logout} title={'Wyloguj'} style={{ width: 90, margin: 0 }} />}
      </div>
      {/* <ul className={styles.linksContainer}>
        {menuItems.map((item) => (
          <li key={item.name} className={styles.navItem}>
            <NavLink to={item.path} className={`${styles.navLink} ${location.pathname === item.path ? styles.active : styles.navLink}`}>
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul> */}
    </nav>
  );
};

export default Navbar;

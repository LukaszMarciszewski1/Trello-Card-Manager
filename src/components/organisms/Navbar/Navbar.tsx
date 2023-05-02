import { useState } from 'react';
import { useAuth } from 'hooks/useAuth';
import { useTrelloApi } from 'hooks/useTrelloApi';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'components/common/Button/Button';
import { getDecodedToken } from 'helpers/getDecodedToken';
import Popup from 'components/common/Popup/Popup';
import NavLinks from './NavLinks/NavLinks';
import styles from './styles.module.scss';

const Navbar: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { getCurrentTrelloMember } = useTrelloApi();
  const [userPopup, setUserPopup] = useState(false);
  const trelloUser = getCurrentTrelloMember(user?.username);

  const getUserInitial = (text: string | null) => {
    if (!text) return '';
    let initial = text.toUpperCase().substring(0, 2);
    return initial;
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
       <Link to={'/create-order'} id={styles.logo}><h1>Dreamtex</h1></Link>
        <NavLinks />
      </div>
      <div className={styles.right}>
        <button className={styles.userBtn} onClick={() => setUserPopup(true)}>
          {trelloUser ? getUserInitial(trelloUser.fullName) : null}
        </button>
        <Popup
          title={
            <div className={styles.popupHeader}>
              <div className={styles.avatar}>
                {trelloUser ? getUserInitial(trelloUser.fullName) : null}
              </div>
              <div>
                <span>{trelloUser?.fullName}</span> <br />{' '}
                <span>{user?.email}</span>
              </div>
            </div>
          }
          trigger={userPopup}
          closePopup={() => setUserPopup(false)}
          style={{
            padding: 10,
            width: 260,
            left: -220,
            top: 50,
          }}
        >
          <Button
            onClick={handleLogout}
            title={'Wyloguj'}
            style={{ width: '100%', margin: '1rem 0' }}
          />
        </Popup>
      </div>
    </nav>
  );
};

export default Navbar;

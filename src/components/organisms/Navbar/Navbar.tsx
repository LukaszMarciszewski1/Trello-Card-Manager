import { useState } from 'react';
import { useAuth } from 'hooks/useAuth';
import { useTrelloApi } from 'hooks/useTrelloApi';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'components/common/Button/Button';
import { getDecodedToken } from 'helpers/getDecodedToken';
import Popup from 'components/common/Popup/Popup';
import NavLinks from './NavLinks/NavLinks';
import IconLink from 'components/common/IconLink/IconLink';
import { MdOutlineLogout, MdSettings } from 'react-icons/md';
import styles from './styles.module.scss';
import IconButton from 'components/common/IconButton/IconButton';
import Divider from 'components/common/Divider/Divider';
import getInitials from 'helpers/getInitials';

const Navbar: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { trelloUser } = useTrelloApi();
  const [userPopup, setUserPopup] = useState(false);

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
        <Link to={'/create-order'} id={styles.logo}>
          <h1>Dreamtex</h1>
        </Link>
     
      </div>
      <div className={styles.right}>
      <NavLinks />
        <button className={styles.userBtn} onClick={() => setUserPopup(true)}>
          {trelloUser ? getInitials(trelloUser.fullName) : null}
        </button>
        <Popup
          title={
            <div className={styles.popupHeader}>
              <div className={styles.avatar}>
                {trelloUser ? getInitials(trelloUser.fullName) : null}
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
            left: 'calc(100% - 260px)',
            top: 50,
          }}
        >
          <IconLink path={'/settings'} icon={<MdSettings />} title={'Ustawienia'} />
          <Divider />
          <IconButton
            onClick={handleLogout}
            icon={<MdOutlineLogout />}
            title={'Wyloguj'}
          />
        </Popup>
      </div>
    </nav>
  );
};

export default Navbar;

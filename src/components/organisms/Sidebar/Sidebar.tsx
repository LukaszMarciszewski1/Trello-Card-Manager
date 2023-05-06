import React from 'react';
import styles from './styles.module.scss';
import IconButton from 'components/common/IconButton/IconButton';
import { MdOutlineLogout } from 'react-icons/md';
import IconLink from 'components/common/IconLink/IconLink';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <IconLink
        path={'/'}
        icon={<MdOutlineLogout />}
        title={'Użytkownicy'}
      />
    </div>
  );
};

export default Sidebar;

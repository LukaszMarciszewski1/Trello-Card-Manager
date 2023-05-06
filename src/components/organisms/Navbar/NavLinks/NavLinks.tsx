import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './styles.module.scss';
import { MdOutlineLogout, MdSettings, MdList, MdPostAdd } from 'react-icons/md';

const NavLinks: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: 'Dodaj zlecenie',
      path: '/create-order',
      icon: <MdPostAdd />
    },
    {
      name: 'Lista zleceń',
      path: '/order-list',
      icon: <MdList />
    },
    {
      name: 'Ustawienia',
      path: '/settings',
      icon: <MdSettings />
    },
  ];

  return (
    <ul className={styles.linksContainer}>
      {menuItems.map((item) => (
        <li key={item.name} className={styles.navItem}>
          <Link
            to={item.path}
            className={`${styles.navLink} ${
              location.pathname === item.path ? styles.active : null
            }`}
          >
            {/* <div className={styles.iconContainer}>{item.icon}</div> */}
            <span>{item.name}</span>
            {/* {item.name} */}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;

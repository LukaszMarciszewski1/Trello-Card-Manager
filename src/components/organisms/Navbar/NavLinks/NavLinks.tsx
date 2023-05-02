import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './styles.module.scss';

const NavLinks: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: 'Dodaj zlecenie',
      path: '/create-order',
    },
    {
      name: 'Lista zleceń',
      path: '/order-list',
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
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;

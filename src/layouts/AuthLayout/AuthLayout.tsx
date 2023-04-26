import React from 'react';
import styles from './styles.module.scss';
import { HiOutlineUser } from 'react-icons/hi';
import bgLogin from 'assets/img/bg-login.svg';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className={styles.authContainer} style={{ backgroundImage: `url(${bgLogin})` }}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader} style={{ backgroundImage: `url(${bgLogin})` }}>
          <h1>Trello Card Manager</h1>
        </div>
        <div className={styles.icon}>
          <HiOutlineUser fontSize='5rem' />
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;

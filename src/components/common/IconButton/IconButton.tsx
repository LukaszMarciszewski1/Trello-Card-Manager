import React from 'react';
import styles from './styles.module.scss';

interface IconButtonProps {
  icon: JSX.Element;
  title: string;
  onClick: () => void
}

const IconButton: React.FC<IconButtonProps> = ({ icon, title, onClick}) => {
  return (
    <button onClick={onClick} className={styles.iconButton}>
      <div className={styles.iconContainer}>{icon}</div>
      <span>{title}</span>
    </button>
  );
};

export default IconButton;

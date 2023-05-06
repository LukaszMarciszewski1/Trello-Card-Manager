import React from 'react';
import styles from './styles.module.scss';

interface IconButtonProps {
  icon: JSX.Element;
  onClick: () => void
}

const IconButton: React.FC<IconButtonProps> = ({ icon, onClick}) => {
  return (
    <button onClick={onClick} className={styles.iconButton}>
      <div className={styles.iconContainer}>{icon}</div>
    </button>
  );
};

export default IconButton;
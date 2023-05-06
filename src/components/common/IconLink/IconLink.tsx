import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

interface IconLinkProps {
  path: string;
  icon: JSX.Element;
  title: string;
}

const IconLink: React.FC<IconLinkProps> = ({ path, icon, title }) => {
  return (
    <Link to={path} className={styles.iconLink}>
      <div className={styles.iconContainer}>{icon}</div>
      <span>{title}</span>
    </Link>
  );
};

export default IconLink;

import React from 'react';
import styles from './styles.module.scss';

interface BoxProps {
  color: string;
  src: string | undefined;
}

const Box: React.FC<BoxProps> = ({ color, src }) => {
  return (
    <div
      className={styles.box}
      style={{
        backgroundColor: src ? '' : color,
        backgroundImage: src ? `url(${src})` : '',
      }}
    />
  );
};

export default Box;

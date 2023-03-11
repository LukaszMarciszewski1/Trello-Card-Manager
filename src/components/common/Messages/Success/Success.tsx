import React from 'react';
import styles from './styles.module.scss';
import * as constants from 'constants/index';
import Confetti from 'components/common/Messages/Success/Confetti/Confetti';

interface SuccessProps {
  title: string;
}

const Success: React.FC<SuccessProps> = ({ title }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{constants.SUCCESS(title)}</h2>
      <Confetti />
    </div>
  );
};

export default Success;

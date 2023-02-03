import React from 'react'
import styles from './styles.module.scss'
import * as constants from 'constants/index';

const Success: React.FC= () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {constants.ERROR}
      </h2>
    </div>
  )
}

export default Success
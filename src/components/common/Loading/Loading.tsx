import React from "react";
import MoonLoader from "react-spinners/MoonLoader";
import styles from './styles.module.scss'

interface LoadingProps {
  size: number
}

const Loading: React.FC<LoadingProps> = ({ size }) => {
  return (
    <div className={styles.loading}>
      <MoonLoader size={size} />
    </div>
  )
}

export default Loading
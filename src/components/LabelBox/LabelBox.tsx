import React from 'react'
import styles from './styles.module.scss'

interface LabelBoxProps {
  label: string
}

const LabelBox: React.FC<LabelBoxProps> = ({ label, ...props }) => {
  return (
    <div className={styles.container} {...props}>{label}</div>
  )
}

export default LabelBox
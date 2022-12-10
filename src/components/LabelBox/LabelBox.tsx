import React from 'react'
import styles from './styles.module.scss'

interface LabelBoxProps {
  label: string
}

const LabelBox: React.FC<LabelBoxProps> = ({ label }) => {
  return (
    <div className={styles.container}>{label}</div>
  )
}

export default LabelBox
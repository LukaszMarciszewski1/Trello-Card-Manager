import React from 'react'
import styles from './styles.module.scss'

interface LabelBoxProps {
  children: any
  label: string
}

const LabelBox: React.FC<LabelBoxProps> = ({ children, label, ...props }) => {
  return (
    <div className={styles.container} {...props}>
      {children}
      <p>{label}</p>
    </div>
  )
}

export default LabelBox
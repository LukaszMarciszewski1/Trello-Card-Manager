import React from 'react'
import styles from './styles.module.scss'

interface FormLayoutProps {
  children: JSX.Element | JSX.Element[];
}

const FormLayout: React.FC<FormLayoutProps> = ({ children }) => {
  return (
    <div className={styles.formLayout} >                  
      {children}
    </div>
  )
}

export default FormLayout
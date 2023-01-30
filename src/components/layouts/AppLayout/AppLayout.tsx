import React from 'react'
import styles from './styles.module.scss'

interface AppLayoutProps {
  children: JSX.Element | JSX.Element[];
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className={styles.appLayout} >                  
      {children}
    </div>
  )
}

export default AppLayout
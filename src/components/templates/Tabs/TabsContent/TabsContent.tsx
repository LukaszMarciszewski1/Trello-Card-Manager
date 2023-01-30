import React from 'react'
import styles from './styles.module.scss'

type TabsContentProps = {
  title: string
  children: any
}

const TabsContent: React.FC<TabsContentProps> = ({ title, children }) => {
  return <div className={styles.container} title={title}>{children}</div>
}

export default TabsContent
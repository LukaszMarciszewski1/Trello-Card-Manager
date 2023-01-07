import Tabs from 'components/Tabs/Tabs';
import TabsContent from 'components/Tabs/TabsContent/TabsContent';
import React, { ReactElement } from 'react'
import styles from './styles.module.scss'

interface FormSectionProps {
  children: JSX.Element | JSX.Element[] | any;
}

const FormSection: React.FC<FormSectionProps> = ({ children }) => {
  return (
    // <div className={styles.formSection}>{children}</div>
  <div className={styles.formSection} >                  
    {children}
  </div>
  )
}

export default FormSection
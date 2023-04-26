import React from 'react';
import styles from './styles.module.scss';

interface FormSectionLayoutProps {
  children: JSX.Element | JSX.Element[];
}

const FormSectionLayout: React.FC<FormSectionLayoutProps> = ({ children }) => {
  return <div className={styles.sectionSectionLayout}>{children}</div>;
};

export default FormSectionLayout;

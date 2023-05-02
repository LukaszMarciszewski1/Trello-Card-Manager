import styles from './styles.module.scss';

interface MainLayoutProps {
  children: JSX.Element | JSX.Element[];
}

const MainLayout:React.FC<MainLayoutProps> = ({children}) => {
  return <div className={styles.mainLayout}>{children}</div>;
};

export default MainLayout;

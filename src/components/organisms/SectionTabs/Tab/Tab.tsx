import { useCallback } from 'react';
import styles from './styles.module.scss';

type Props = {
  title: string;
  index: number;
  active: number;
  setSelectedTab: (index: number) => void;
  setTabTitle: (e: string) => void;
};

const Tab: React.FC<Props> = ({ title, setSelectedTab, active, index, setTabTitle }) => {
  const onClick = useCallback(() => {
    setSelectedTab(index);
    setTabTitle(title);
  }, [setSelectedTab, index]);

  return (
    <li className={styles.tabContainer}>
      <button
        type='button'
        title={title}
        className={`${index === active ? styles.active : styles.tab}`}
        onClick={onClick}
      >
        {title}
      </button>
    </li>
  );
};

export default Tab;

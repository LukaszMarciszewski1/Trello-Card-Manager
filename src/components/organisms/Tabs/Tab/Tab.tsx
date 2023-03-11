import { useCallback } from 'react';
import styles from './styles.module.scss';

type Props = {
  title: string;
  index: number;
  active: number;
  setSelectedTab: (index: number) => void;
  subcategory?: boolean;
};

const Tab: React.FC<Props> = ({ title, setSelectedTab, active, index, subcategory }) => {
  const onClick = useCallback(() => {
    setSelectedTab(index);
  }, [setSelectedTab, index]);

  return (
    <li className={`${subcategory ? styles.subcategoryTabContainer : styles.tabContainer}`}>
      <button
        type='button'
        title={title}
        className={`${subcategory ? styles.subcategoryTab : styles.tab} ${
          index === active ? styles.active : styles.tab
        }`}
        onClick={onClick}
      >
        {title}
      </button>
    </li>
  );
};

export default Tab;

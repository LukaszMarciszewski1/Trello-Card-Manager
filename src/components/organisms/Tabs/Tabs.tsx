import { ReactElement, useState } from 'react';
import styles from './styles.module.scss';
import Tab from './Tab/Tab';

type TabsProps = {
  children: ReactElement[];
  navTitle: string
};

const Tabs: React.FC<TabsProps> = ({ children, navTitle }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className={styles.tabs}>
      <ul className={styles.tabsContainer}>
        <h3 className={styles.tabsHeading}>{navTitle}</h3>
        {children.map((item, index) => (
          <Tab
            key={index}
            title={item.props.title}
            index={index}
            setSelectedTab={setSelectedTab}
            active={selectedTab}
          />
        ))}
      </ul>
      {children[selectedTab]}
    </div>
  );
};

export default Tabs;

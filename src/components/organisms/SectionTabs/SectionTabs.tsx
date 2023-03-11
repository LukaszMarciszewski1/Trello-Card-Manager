import React, { ReactElement, useState } from 'react';
import styles from './styles.module.scss';
import Tab from './Tab/Tab';

type TabsProps = {
  children: ReactElement[];
  tabsLabel: string;
  setTabTitle: (e: string) => void;
};

const Tabs: React.FC<TabsProps> = ({ children, tabsLabel, setTabTitle }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className={styles.layout}>
      <p>{tabsLabel}</p>
      <ul className={styles.container}>
        {children.map((item: { props: { title: string } }, index: number) => (
          <Tab
            key={index}
            title={item.props.title}
            index={index}
            setSelectedTab={setSelectedTab}
            setTabTitle={setTabTitle}
            active={selectedTab}
          />
        ))}
      </ul>
      {children[selectedTab]}
    </div>
  );
};

export default Tabs;

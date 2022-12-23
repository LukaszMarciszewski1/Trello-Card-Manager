import React, { useState } from 'react'
import styles from './styles.module.scss'
import { Tabs, Tab } from 'react-tabs-scrollable'
import './react-tabs-scrollable.scss';

interface ButtonProps {
  type: 'button';
}

interface TabsScrollable {
  activeTab: any
  idx: any
}

const TabsScrollable: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onTabClick = (e: any, index: number) => {
    setSelectedIndex(index)
  }

  return (
    <div>
      <Tabs
        activeTab={selectedIndex}
        onTabClick={onTabClick}
      >
        {[...Array(15).keys()].map((item) => (
          <Tab className={styles.tab} type='button' key={item}>Tab {item}</Tab>
        ))}
      </Tabs>
      {[...Array(15).keys()].map((item) => (
        <div
          className="animate__animated animate__fadeInLeft"
          role="tabpanel"
          key={item}
        >
          {selectedIndex === item && <div className="mx-4">Tab screen {item}</div>}
        </div>
      ))}
    </div>
  )
}

export default React.memo(TabsScrollable)
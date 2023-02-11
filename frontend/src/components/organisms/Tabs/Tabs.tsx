import React, { ReactElement, useState } from "react"
import Tab from "./Tab/Tab"
import styles from './styles.module.scss'

type TabsProps = {
  children: ReactElement[]
  subcategory?: boolean
}

const Tabs: React.FC<TabsProps> = ({ children, subcategory }) => {
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <div className={styles.layout}>
      <ul className={`${subcategory ? styles.subcategoryContainer : styles.mainContainer}`}>
        {children.map((item, index) => (
          <Tab
            key={index}
            title={item.props.title}
            index={index}
            setSelectedTab={setSelectedTab}
            active={selectedTab}
            subcategory={subcategory}
          />
        ))}
      </ul>
      {children[selectedTab]}
    </div>
  )
}

export default React.memo(Tabs)
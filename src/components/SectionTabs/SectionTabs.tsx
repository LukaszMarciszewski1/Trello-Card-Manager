import React, { ReactElement, useState } from "react"
import Tab from "./Tab/Tab"
import styles from './styles.module.scss'

type Props = {
  children: ReactElement[]
  tabLabel: string
  setTabTitle: any
}

const Tabs: React.FC<Props> = ({ children, tabLabel, setTabTitle }) => {
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <div className={styles.layout}>
      <ul className={styles.container}>
        <p>{tabLabel}</p>
        {children.map((item, index) => (
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
  )
}

export default React.memo(Tabs)
import React, { useState } from 'react'
import styles from './styles.module.scss'
import './react-tabs-scrollable.scss';
import { Tabs, Tab } from 'react-tabs-scrollable'
import Checkbox from 'components/Checkbox/Checkbox'

interface MaterialsProps {
  options: []
  checkedItems: string[]
  handleChange: (e: any) => void
}

const optionTypes = (options: any) => {
  const set = new Set();
  for (const option of options) {
    set.add(option.type);
  }
  return Array.from(set) as string[];
}

const Materials: React.FC<MaterialsProps> = ({ options, checkedItems, handleChange }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedType, setSelectedType] = useState(optionTypes(options)[0])

  const onTabClick = (e: any, index: number) => {
    setSelectedIndex(index)
    setSelectedType(optionTypes(options)[index])
  }

  const isChecked = (target: string) => checkedItems.includes(target) ? true : false;

  return (
    <div className={styles.tabsScrollable}>
      <Tabs
        activeTab={selectedIndex}
        onTabClick={onTabClick}
      >
        {optionTypes(options).map((item: any, index: number) => (
          <Tab className={styles.tab} type='button' key={index}>{item}</Tab>
        ))}
      </Tabs>
      <div className={styles.contentContainer}>
        {options.map((option: any, index: number) => (
          <div
            role="tabpanel"
            key={index}
          >
            {selectedType === option.type && (
              <Checkbox
                key={index}
                id={option.name}
                type={"checkbox"}
                label={option.name.toUpperCase()}
                value={option.value}
                name={option.name}
                style={{ width: 80, height: '100px', padding: '3px', fontSize: '12px', margin: '0 10px 10px 0', justifyContent: 'flex-start' }}
                checked={isChecked(option.value)}
                onChange={handleChange}
              >
                <div style={{
                  width: '100%',
                  padding: '10px',
                  height: '40px',
                  backgroundColor: option.src ? '' : option.color,
                  backgroundImage: option.src ? `url(${option.src})` : '',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  marginBottom: '4px',
                  border: '1px solid grey'
                }}
                />
              </Checkbox>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default React.memo(Materials)
import Checkbox from 'components/Checkbox/Checkbox'
import styles from './styles.module.scss'
import Tabs from 'components/Tabs/Tabs'
import TabsContent from 'components/Tabs/TabsContent/TabsContent'
import React, { useState } from 'react'

interface MaterialsProps {
  options: any
  checkedItems: any
  handleChange: (e: any) => void
  removeItem?: () => void
}

const Materials: React.FC<MaterialsProps> = ({ options, checkedItems, handleChange, removeItem }) => {

  const set = new Set();
  for (const option of options) {
    set.add(option.type);
  }

  const optionsTabContent = Array.from(set) as string[];

  const isChecked = (target: string) => checkedItems.includes(target) ? true : false;


  return (
    <div className={styles.checkboxContainer} >
      <div className={styles.selectedContainer}>
        <p>Wybrane materiały:</p>
        {
          checkedItems.map((item: string, index: number) => (
            <span key={index}>{item}<button onClick={removeItem}>X</button></span>
          ))
        }
      </div>
      <Tabs>
        {optionsTabContent.map((type, index) => (
          <TabsContent title={type} key={index}>
            <div className={styles.contentContainer}>
              {options
                .filter((option: { type: string; }) => option.type === type)
                .map((option: { name: string, color: string }, index: number) => (
                  <Checkbox
                    key={index}
                    id={option.name}
                    type={"checkbox"}
                    label={option.name}
                    name={option.name}
                    style={{ width: 80, height: 'auto', padding: '5px', fontSize: '12px', margin: '0 10px 10px 0' }}
                    checked={isChecked(option.name)}
                    onChange={handleChange}
                  >
                    {/* ewentualnie dodać reset */}
                    <div style={{
                      width: '100%',
                      padding: '10px',
                      height: '35px',
                      backgroundColor: option.color,
                      marginBottom: '5px',
                      border: '1px solid grey'
                    }}
                    />
                  </Checkbox>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default React.memo(Materials)
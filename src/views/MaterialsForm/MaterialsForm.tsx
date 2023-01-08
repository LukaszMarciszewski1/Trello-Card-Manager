import React, { useEffect, useState, useCallback, useRef } from 'react'
import styles from './styles.module.scss'
import { useFieldArray } from "react-hook-form";
import Checkbox from 'components/Checkbox/Checkbox';
import Popup from 'components/Popup/Popup';
import Button from 'components/Button/Button';
import { RiAddLine } from 'react-icons/ri';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import Input from 'components/Input/Input';
import LabelBox from 'components/LabelBox/LabelBox';
// import Tabs from 'components/Tabs/Tabs';
import MaterialsList from 'components/MaterialsList/MaterialsList';
import Tabs from 'components/Tabs/Tabs'
import TabsContent from 'components/Tabs/TabsContent/TabsContent'
import Select from "components/Select/Select";
import { applications } from 'data';
import SectionTabs from "components/SectionTabs/SectionTabs";
import SectionTabsContent from 'components/SectionTabs/TabsContent/TabsContent'
// import './react-tabs-scrollable.scss';

interface NestedProps {
  register: any
  registerName: any
  materials: any
  control?: any
  dataForm?: any
  materialsType?: string
}

interface CheckedItems {
  [key: string]: boolean;
}

const Nested: React.FC<NestedProps> = ({ register, registerName, materials, control, dataForm, materialsType }) => {
  const [popupTrigger, setPopupTrigger] = useState(false)
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const { fields, remove, append } = useFieldArray({
    control,
    name: registerName
  });

  const handleCheckedMaterial = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    let updatedList = [...checkedItems];
    if (checked) {
      updatedList = [...checkedItems, value];
      append({ field: value })
    } else {
      updatedList.splice(checkedItems.indexOf(value), 1);
      remove(checkedItems.indexOf(value))
    }
    setCheckedItems(updatedList);
  }

  const handleRemoveMaterial = (value: string) => {
    let updatedList = [...checkedItems];
    updatedList.splice(checkedItems.indexOf(value), 1);
    remove(checkedItems.indexOf(value))
    setCheckedItems(updatedList);
  }
  
  useEffect(() => {
    if (dataForm) {
      remove(checkedItems.map((item: any, i: number) => i))
      setCheckedItems([])
    }
  }, [materialsType])
  
  const filteredArray = [...materials].filter(material => [...checkedItems].includes(material.value));

  const inputWidth = (index: number) => {
    if (checkedItems[index]) {
      return ((checkedItems[index].length + 1) + 'ch')
    }
    else return 0
  }

  return (
    <div className={styles.materialsList}>
      <span>Materiał:</span>
      {
        checkedItems.length ? (
          <>
            {fields.map((item, k) => (
              <div key={item.id} style={{ margin: '0 10px 0 0', width: inputWidth(k) }}>
                <Input
                  key={item.id}
                  style={{ marginTop: 0, textAlign: 'center', backgroundColor: '#f4f5fa' }}
                  id={item.id}
                  readOnly
                  type="text"
                  {...register(`${registerName}[${k}].field` as const)}
                />
              </div>
            ))}
          </>
        ) : null
      }
      <Popup
        title={'Dodaj materiał'}
        trigger={popupTrigger}
        closePopup={() => setPopupTrigger(false)}
      >
        <div>
          <div className={styles.selectedMaterials}>
            <p>Wybrane materiały:</p>
            {
              filteredArray.map((item: any, index: number) => (
                <span key={index}> {item.value}
                  <button
                    type='button'
                    onClick={() => handleRemoveMaterial(item.value)}>
                    X
                  </button>
                </span>
              ))
            }
          </div>
          <MaterialsList
            options={materials}
            checkedItems={checkedItems}
            handleChange={handleCheckedMaterial}
          />
        </div>
        <div className={styles.buttonContainer}>
          <Button
            type={"button"}
            title={"ok"}
            onClick={() => setPopupTrigger(false)}
            style={{ fontSize: "1.2rem", margin: '0.5rem 0' }}
          />
        </div>
      </Popup>
      <div title='materiały'>
        <Button
          type={"button"}
          onClick={() => setPopupTrigger(true)}
          style={{ width: '40px' }}
          icon={<AiOutlineAppstoreAdd fontSize={"1.5rem"} fontWeight={"bold"} />}
        />
      </div>
    </div>
  )
}

export default React.memo(Nested)
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
import TabsContent from 'components/Tabs/TabsContent/TabsContent';
import MaterialsList from 'components/MaterialsList/MaterialsList';
import { Tabs, Tab } from 'react-tabs-scrollable'
// import './react-tabs-scrollable.scss';

interface NestedProps {
  register: any
  registerName: any
  materials: any
  control?: any
}

interface CheckedItems {
  [key: string]: boolean;
}

const Nested: React.FC<NestedProps> = ({ register, registerName, materials, control }) => {
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

  const filteredArray = [...materials].filter(material => [...checkedItems].includes(material.value));

  //width: (checkedItems[k].length + 2) + 'ch' }
  return (
    <div className={styles.materialsList}>
      <span>Materiał:</span>
      {fields.map((item, k) => (
        <div key={item.id} style={{ margin: '0 10px 0 0', width: (checkedItems[k].length + 1) + 'ch' }}>
          <Input
            key={item.id}
            style={{ marginTop: 0, textAlign: 'center' }}
            id={item.id}
            disabled
            type="text"
            {...register(`${registerName}[${k}].field` as const)}
          />
        </div>
      ))}
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
                <span key={index}>{item.value}<button type='button' onClick={() => handleRemoveMaterial(item.value)}>X</button></span>
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
          // icon={<RiAddLine fontSize={"1.5rem"} fontWeight={"bold"} />}
          />
        </div>
      </Popup>
      <Button
        type={"button"}
        onClick={() => setPopupTrigger(true)}
        style={{ width: '40px' }}
        icon={<AiOutlineAppstoreAdd fontSize={"1.5rem"} fontWeight={"bold"} />}
      />
    </div>
  )
}

export default React.memo(Nested)
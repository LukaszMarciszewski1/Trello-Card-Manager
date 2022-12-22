import React, { useEffect, useState, useCallback } from 'react'
import styles from './styles.module.scss'
import { useFieldArray } from "react-hook-form";
import Checkbox from 'components/Checkbox/Checkbox';
import { materials } from 'data';
import Popup from 'components/Popup/Popup';
import Button from 'components/Button/Button';
import { RiAddLine } from 'react-icons/ri';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import Input from 'components/Input/Input';
import LabelBox from 'components/LabelBox/LabelBox';
import Tabs from 'components/Tabs/Tabs';
import TabsContent from 'components/Tabs/TabsContent/TabsContent';
import Materials from 'components/Materials/Materials';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    let updatedList = [...checkedItems];
    if (checked) {
      updatedList = [...checkedItems, name];
      append({ field: name })
    } else {
      updatedList.splice(checkedItems.indexOf(name), 1);
      remove(checkedItems.indexOf(name))
    }
    setCheckedItems(updatedList);
  }

  const handleRemoveSelectedItem = () => {
    console.log('okk')
  }

  return (
    <div className={styles.materialsList}>
      <span>Materiał:</span>
      {fields.map((item, k) => (
        <div key={item.id} style={{ margin: '-12px 3px 0 0' }}>
          <Input
            key={item.id}
            style={{ marginTop: 0, maxWidth: 120, width: 'auto' }}
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
        <Materials
          options={materials}
          checkedItems={checkedItems}
          handleChange={handleChange}
          removeItem={handleRemoveSelectedItem}
        />
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
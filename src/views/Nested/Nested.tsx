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

interface NestedProps {
  register: any
  registerName: any
  options: any
  index?: any
  control?: any
}

interface CheckedItems {
  [key: string]: boolean;
}

const Nested: React.FC<NestedProps> = ({ register, registerName, options, index, control }) => {
  const [trigger, setTrigger] = useState(false)
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const { fields, remove, append } = useFieldArray({
    control,
    name: `description[${index}].materials`
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

  const isChecked = (item: string) => checkedItems.includes(item) ? true : false;

  return (
    <div className={styles.materialsList}>
      <span>Materiał:</span>
      {fields.map((item, k) => {
        return (
          <div key={item.id} style={{ margin: '-12px 3px 0 0' }}>
            <Input
              style={{ marginTop: 0, maxWidth: 120, width: 'auto' }}
              id={item.id}
              disabled
              type="text"
              {...register(`${registerName}[${k}].field` as const)}
            />
          </div>
        );
      })}
      <Popup
        title={'Dodaj materiał'}
        trigger={trigger}
        closePopup={() => setTrigger(false)}
      >
        <div className={styles.checkboxContainer} >
          {options.map((option: { name: string  }, index: number) => (
            <Checkbox
              key={index}
              id={option.name}
              type={"checkbox"}
              label={option.name}
              name={option.name}
              style={{ width: 80, height: 'auto', padding: '5px', fontSize: '12px' }}
              checked={isChecked(option.name)}
              onChange={handleChange}
            >
              <div style={{
                width: '100%',
                padding: '10px',
                height: '35px',
                backgroundColor: 'red',
                marginBottom: '5px',
              }}
              />
            </Checkbox>
          ))}
        </div>
      </Popup>
      <Button
        type={"button"}
        onClick={() => setTrigger(true)}
        style={{ width: '40px' }}
        icon={<AiOutlineAppstoreAdd fontSize={"1.5rem"} fontWeight={"bold"} />}
      />
    </div>
  )
}

export default Nested
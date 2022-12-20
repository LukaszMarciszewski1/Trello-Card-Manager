import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { useFieldArray } from "react-hook-form";
import Checkbox from 'components/Checkbox/Checkbox';
import { material } from 'data';
import { el } from 'date-fns/locale';
import Popup from 'components/Popup/Popup';
import Button from 'components/Button/Button';
import { RiAddLine } from 'react-icons/ri';
import e from 'express';
import LabelBox from 'components/LabelBox/LabelBox';
import Input from 'components/Input/Input';

interface NestedProps {
  register: any
  registerName: any
  options: any
  nestIndex?: any
  control?: any
}

const Nested: React.FC<NestedProps> = ({ register, registerName, options, nestIndex, control }) => {
  const [trigger, setTrigger] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [checkboxes, setCheckboxes] = useState(material)

  const { fields, remove, append } = useFieldArray({
    control,
    name: `description[${nestIndex}].material`
  });

  const handleChecked = (e: any) => {
    let updatedList = [...checkboxes]
    if (e.target.checked) {
      updatedList = [...checkboxes].map(item => { return {...item, checked: e.target.id === item.name ? !item.checked : item.checked}});
      console.log(updatedList)
    } else {
      // updatedList.splice(isChecked.indexOf(e.target.value), 1);
    }
    setCheckboxes(updatedList);
  }


  return (
    <div className={styles.materialsList}>
      <span>Materiał:</span>
      {fields.map((item, k) => {
        return (
          <div key={item.id} style={{ margin: '0 3px 0 0' }}>
            <Input
              style={{ marginTop: 0, maxWidth: 80}}
              id={item.id}
              disabled
              type="text"
              {...register(`${registerName}[${k}].field` as const)}
            />
          </div>
        );
      })}
      <Popup
        title={'Dodaj wycenę'}
        trigger={trigger}
        closePopup={() => setTrigger(false)}
      >
        <div className={styles.checkboxContainer} >
          {checkboxes.map((trader: { value: string; name: string, checked: any; }, index: number) => (
            <Checkbox
              key={index}
              id={trader.name}
              type={"checkbox"}
              // data-action={index}
              label={trader.value}
              // name={trader.name}
              checked={trader.checked}
              value={trader.value}
              onChange={(e) => {
                handleChecked(e)
                // setIsChecked(true)
                append({ field: trader.value })
              }}
            />
          ))}
        </div>
      </Popup>
      <Button
        type={"button"}
        title={""}
        onClick={() => setTrigger(true)}
        style={{ fontSize: "1.2rem", width: '40px' }}
        icon={<RiAddLine fontSize={"1.5rem"} fontWeight={"bold"} />}
      />
    </div>
  )
}

export default Nested
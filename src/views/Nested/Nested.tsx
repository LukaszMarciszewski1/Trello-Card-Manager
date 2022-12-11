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
  nestedIndex?: any
}

const Nested: React.FC<NestedProps> = ({ register, registerName, options, nestedIndex }) => {
  const [trigger, setTrigger] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [checkboxes, setCheckboxes] = useState(material)

  const handleChange = (event: any) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[event.target.dataset.action].checked = event.target.checked;
    setCheckboxes(newCheckboxes)
    console.log(newCheckboxes[event.target.dataset.action])
  }

  const selectedMaterials = [...checkboxes].filter(checkbox => checkbox.checked !== false)
  console.log(selectedMaterials)

  return (
    <div className={styles.materialsList}>
      <span>Materiał:</span>
      {
        selectedMaterials.map((option: { value: string, checked: boolean; }, index: number) => (
          <Checkbox
            key={index}
            id={option.value}
            type={"checkbox"}
            label={option.value}
            value={option.value}
            checked
            {...register(`${registerName}[${index}]` as const)}
          />
        ))
      }
      <Popup
        title={'Dodaj wycenę'}
        trigger={trigger}
        closePopup={() => setTrigger(false)}
      >
        <div className={styles.checkboxContainer} >
          {options.map((trader: { value: string; name: string, checked: any; }, index: number) => (
            <Checkbox
              key={index}
              id={trader.name}
              type={"checkbox"}
              data-action={index}
              label={trader.value}
              name={trader.name}
              checked={trader.checked}
              value={trader.value}
              onChange={handleChange}
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


{/* <div className={styles.checkboxContainer}>
{options?.map((trader: { value: string }, index: number) => {
  return (
    <Checkbox
      key={index}
      id={trader.value}
      type={"checkbox"}
      label={trader.value}
      value={trader.value}
      {...register(`${registerName}[${index}]` as const)}
      />
      )
    })}
</div> */}
    // , { onChange: (e: { target: { value: any; }; }) => console.log(e.target.value) }
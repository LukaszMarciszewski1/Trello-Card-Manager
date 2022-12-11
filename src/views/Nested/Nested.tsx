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
  field?: any
  // nestedIndex: any
}

const Nested: React.FC<NestedProps> = ({ register, registerName, options, field }) => {
  const [trigger, setTrigger] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

  const handleChecked = (e: any) => {
    console.log('okk')
  }

  return (
    <div className={styles.materialsList}>
      <span>Materiał:</span>
      {
        options.map((option: { value: string; }, index: number) => (
          <LabelBox key={index} label={option.value} />
          // <Input
          //   key={index}
          //   id={option.value}
          //   value={option.value}
          //   label={option.value}
          //   type="text"
          //   {...register(`description.${index}.amount` as const)}
          // />
        ))
      }
      <Popup
        title={'Dodaj wycenę'}
        trigger={trigger}
        closePopup={() => setTrigger(false)}
      >
        <div className={styles.checkboxContainer}>
          {options?.map((trader: { value: string }, index: number) => {
            return (
              <Checkbox
                key={index}
                id={trader.value}
                type={"checkbox"}
                label={trader.value}
                value={trader.value}
                // checked={field.value}
                {...register(`${registerName}[${index}]` as const)}
              // , { onChange: (e: { target: { value: any; }; }) => console.log(e.target.value) }
              />
            )
          })}
        </div>
      </Popup>
      <Button
        type={"button"}
        title={""}
        onClick={() => {
          setTrigger(true)
        }}
        style={{ fontSize: "1.2rem", width: '40px' }}
        icon={<RiAddLine fontSize={"1.5rem"} fontWeight={"bold"} />}
      />
    </div>
  )
}

export default Nested


{/* <div className={styles.materialsList}>
{fields.map((item, k) => {
  return (
    <div key={item.id} style={{ marginLeft: 20 }}>

      {material?.map((trader, index) => (
        <Checkbox
          key={index}
          id={trader.value}
          type={"checkbox"}
          label={trader.value}
          value={trader.value}
          {...register(`description[${nestIndex}].material[${k}].fields` as const)}
        />
      ))}


      <button type="button" onClick={() => remove(k)}>
        Delete Nested
      </button>
    </div>
  );
})}

<button
  type="button"
  onClick={() => {
    setTrigger(true)
    append({
      fields: "fields",
    })
  }
  }
>
  Append Nested
</button>

<hr />
</div> */}

{/* <input
        {...register(`description[${nestIndex}].material[${k}].field2` as const)}
      /> */}
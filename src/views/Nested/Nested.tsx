import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { useFieldArray } from "react-hook-form";
import Checkbox from 'components/Checkbox/Checkbox';
import { material } from 'data';
import { el } from 'date-fns/locale';
import Popup from 'components/Popup/Popup';
import Button from 'components/Button/Button';
import { RiAddLine } from 'react-icons/ri';

interface NestedProps {
  nestIndex: any
  control: any
  register: any
}

const Nested: React.FC<NestedProps> = ({ nestIndex, control, register }) => {
  const [trigger, setTrigger] = useState(false)

  // const { fields, remove, append } = useFieldArray({
  //   control,
  //   name: `description[${nestIndex}].material`
  // });


  return (
    <div className={styles.materialsList}>
      <span>Materiał:</span>
      <Popup
        title={'Dodaj wycenę'}
        trigger={trigger}
        closePopup={() => setTrigger(false)}
      >
        {/* {fields.map((item, k) => {
          return ( */}
        <div className={styles.checkboxContainer}>
          {material?.map((trader, index) => (
            <Checkbox
              key={index}
              id={trader.value}
              type={"checkbox"}
              label={trader.value}
              value={trader.value}
              {...register(`description[${nestIndex}].material[${index}]` as const)}
            />
          ))}
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
import React, { useEffect, useState, SetStateAction, Dispatch } from 'react'
import styles from './styles.module.scss'
import { useFieldArray, UseFormRegister, Control } from "react-hook-form";
import Popup from 'components/common/Popup/Popup';
import Button from 'components/common/Button/Button';
import Input from 'components/common/Input/Input';
import MaterialsList from 'components/organisms/MaterialsList/MaterialsList';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { Material  } from 'models/material';
import { CardDescription } from 'models/card';

interface NestedMaterialsFormProps {
  register: UseFormRegister<any>
  registerName: string
  materials: Material[]
  control: Control<any>
  dataForm: CardDescription
  materialsType: string | undefined
  setValidMaterialsForm: Dispatch<SetStateAction<boolean>>
  watchMaterialsForm: boolean
}

const NestedMaterialsForm: React.FC<NestedMaterialsFormProps> = (
  {
    register,
    registerName,
    materials,
    control,
    dataForm,
    materialsType,
    setValidMaterialsForm,
    watchMaterialsForm,
  }) => {
  const [popupTrigger, setPopupTrigger] = useState(false)
  const [checkedItems, setCheckedItems] = useState<string[]>([])
  const [validForm, setValidForm] = useState(false)

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

  const inputFieldWidth = (index: number) => {
    if (checkedItems[index]) {
      return ((checkedItems[index].length + 1) + 'ch')
    }
    else return 0
  }

  const selectedMaterialsArray = [...materials]
    .filter(material => [...checkedItems]
    .includes(material.value))
    .sort((a, b) => {
      if (checkedItems.indexOf(a.value) === checkedItems.indexOf(b.value)) {
        return Number(a.value) - Number(b.value);
      }
      return checkedItems.indexOf(a.value) - checkedItems.indexOf(b.value)
    })

  const sortedMaterialsFields = fields.sort((a: any, b: any) => {
    return selectedMaterialsArray.indexOf(a) - selectedMaterialsArray.indexOf(b);
  });

  const clearCheckedMaterials = () => {
    remove(checkedItems.map((item: string, index: number) => index))
    remove(sortedMaterialsFields.map((item: Record<"id", string>, index: number) => index))
    setCheckedItems([])
  }

  useEffect(() => {
    if (dataForm) {
      clearCheckedMaterials()
    }
  }, [materialsType])

  useEffect(() => {
    if (watchMaterialsForm && setValidMaterialsForm) {
      if (sortedMaterialsFields.length) {
        setValidForm(false)
        setValidMaterialsForm(true)
      } else {
        setValidForm(true)
        setValidMaterialsForm(false)
      }
    }
  }, [sortedMaterialsFields.length, watchMaterialsForm])

  return (
    <div className={styles.materialsList}>
      <span>Materiał:</span>
      {
        checkedItems.length ? (
          <>
            {sortedMaterialsFields.map((item, k) => (
              <div key={item.id} style={{ margin: '0 10px 0 0', width: inputFieldWidth(k) }}>
                <Input
                  key={item.id}
                  style={{
                    marginTop: 0,
                    textAlign: 'center',
                    backgroundColor: '#f4f5fa',
                    border: `${k === 0 && '2px solid green'}`
                  }}
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
              selectedMaterialsArray.map((item: any, index: number) => (
                <span key={index} style={{ border: `${index === 0 && '2px solid green'}` }}> {item.value}
                  <button
                    style={{ marginLeft: 4 }}
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
        <div className={styles.buttonWrapper}>
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
          style={{ width: '40px', border: `${validForm ? '2px solid red' : 'none'}` }}
          icon={<AiOutlineAppstoreAdd fontSize={"1.5rem"} fontWeight={"bold"} />}
        />
      </div>
    </div>
  )
}

export default React.memo(NestedMaterialsForm)
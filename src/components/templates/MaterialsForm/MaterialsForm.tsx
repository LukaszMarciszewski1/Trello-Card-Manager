import React, { useEffect, useState, useCallback, useRef } from 'react'
import styles from './styles.module.scss'
import { useFieldArray } from "react-hook-form";
import Checkbox from 'components/common/Checkbox/Checkbox';
import Popup from 'components/common/Popup/Popup';
import Button from 'components/common/Button/Button';
import { RiAddLine } from 'react-icons/ri';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import Input from 'components/common/Input/Input';
import LabelBox from 'components/common/LabelBox/LabelBox';
// import Tabs from 'components/Tabs/Tabs';
import MaterialsList from 'components/templates/MaterialsList/MaterialsList';
import Tabs from 'components/Tabs/Tabs'
import TabsContent from 'components/Tabs/TabsContent/TabsContent'
import Select from "components/common/Select/Select";
import { applications } from 'data/data';
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

  const inputWidth = (index: number) => {
    if (checkedItems[index]) {
      return ((checkedItems[index].length + 1) + 'ch')
    }
    else return 0
  }
  
  const selectedMaterialsArray = [...materials]
    .filter(material => [...checkedItems]
    .includes(material.value))
    .sort((a, b) => {
      if(checkedItems.indexOf(a.value) === checkedItems.indexOf(b.value)){
        return a.value - b.value;
      }
     return checkedItems.indexOf(a.value) - checkedItems.indexOf(b.value)
    })

  const sortedFields = fields.sort((a, b) => {
    return selectedMaterialsArray.indexOf(a) - selectedMaterialsArray.indexOf(b);
  });

  return (
    <div className={styles.materialsList}>
      <span>Materiał:</span>
      {
        checkedItems.length ? (
          <>
            {sortedFields.map((item, k) => (
              <div key={item.id} style={{ margin: '0 10px 0 0', width: inputWidth(k) }}>
                <Input
                  key={item.id}
                  style={{ marginTop: 0, textAlign: 'center', backgroundColor: '#f4f5fa', border: `${k === 0 && '2px solid green'}` }}
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
                <span key={index} style={{border: `${index === 0 && '2px solid green'}`}}> {item.value}
                  <button
                  style={{marginLeft: 4}}
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
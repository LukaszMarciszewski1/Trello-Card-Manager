/* eslint-disable no-useless-escape */
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import axios from "axios";
import dayjs from "dayjs";

import { traders, fabric, embroidery, materials, applications } from "data/data";
import { useForm, useFieldArray } from "react-hook-form";
import { Card, Description } from "models/card";
import SectionTabs from "components/SectionTabs/SectionTabs";
import SectionTabsContent from 'components/SectionTabs/TabsContent/TabsContent'

import Input from "components/common/Input/Input";
import Button from "components/common/Button/Button";
import Checkbox from "components/common/Checkbox/Checkbox";
import Select from "components/common/Select/Select";
import FormSection from "components/templates/Section/FormSection";
import Textarea from "components/common/Textarea/Textarea";
import MaterialsForm from "../../../components/templates/MaterialsForm/MaterialsForm";
import { RiAddLine } from "react-icons/ri";
import {
  getPriceForOnePieceOfSection,
  getTotalPrice,
  getPriceForSection,
  isMoreThanMaximumSize,
  getSelectedSizeName,
  isDisplayFabric
} from "calculation/calculator";
import { BsChevronCompactLeft } from "react-icons/bs";
import Modal from "components/common/Modal/Modal";
import Success from "components/common/Success/Success";

const validation = {
  title: {
    required: true,
    maxLength: 40,
    minLength: 2,
  },
  description: {
    required: true,
    maxLength: 40,
    minLength: 2,
  },
};

const titleErrors = (type: any) => {
  switch (type) {
    case "required":
      return <div>Nazwa jest wymagana</div>;
    case "minLength":
      return <div>Nazwa musi zawierać conajmiej 2 znaki</div>;
    case "maxLength":
      return <div>Nazwa może zawierać maksymalnie 20 znaków</div>;
    default:
      return null;
  }
};

const defaultSectionValues = {
  materialType: '',
  logo: "",
  amount: 1,
  fabric: fabric[0].value,
  size: 'WYBIERZ ROZMIAR',
  width: 0.1,
  height: 0.1,
  price: 0,
  priceForOnePiece: 0,
  customPrice: false,
  packing: false,
  additionalDesc: '',
  materials: []
};

const EmbroideryForm: React.FC = () => {
  dayjs.locale("pl");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
    resetField
  } = useForm<Card>({
    defaultValues: {
      description: [defaultSectionValues],
      board: 'Hafciarnia'
    },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    name: "description",
    control,
  });

  const watchForChangesInSectionForms = watch('description');
  const [sectionForms, setSectionForms] = useState<Description[]>([])
  const [watchCustomPrice, setWatchCustomPrice] = useState('')
  const [watchFormSizeWidth, setWatchFormSizeWidth] = useState('')
  const [watchFormSizeHeight, setWatchFormSizeHeight] = useState('')
  const [materialsType, setMaterialsType] = useState<any[]>([])
  const [watchMaterials, setWatchMaterials] = useState('')
  const [watchPacking, setWatchPacking] = useState(false)

  useEffect(() => {
    setSectionForms(watchForChangesInSectionForms)
  }, [watchForChangesInSectionForms])

  useEffect(() => {
    fields.map((item, index) => {
      setValue(`description.${index}.materialType`, '')

    })
  }, [])

  useEffect(() => {
    setValue('price', getTotalPrice(sectionForms))
    setValue('costOfOrder', Number((getTotalPrice(sectionForms) * 0.75).toFixed(1)))
    fields.map((item, index) => {
      setValue(`description.${index}.customPrice`, true)
      setValue(`description.${index}.price`, getPriceForSection(sectionForms, index))
      setValue(`description.${index}.priceForOnePiece`, getPriceForOnePieceOfSection(sectionForms, index))
    })
  }, [getTotalPrice(sectionForms), watchCustomPrice, watchFormSizeWidth, watchFormSizeHeight, watchPacking])

  useEffect(() => {
    fields.map((item, index) => {
      setValue(`description.${index}.size`, getSelectedSizeName(sectionForms, index))
    })
  }, [watchFormSizeWidth, watchFormSizeHeight, sectionForms])

  useEffect(() => {
    const filteredMaterials = materials.filter(material => material.application === applications[0].application)
    setMaterialsType(filteredMaterials)
  }, [])

  const handleWatchCustomPriceValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWatchCustomPrice(e.target.value)
  }
  const handleWatchFormSizeWidthValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWatchFormSizeWidth(e.target.value)
  }
  const handleWatchFormSizeHeightValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWatchFormSizeHeight(e.target.value)
  }
  const handleWatchPacking = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWatchPacking(!watchPacking)
  }

  const AddCardForm = async (data: Card) => {
    const {
      title,
      description,
      startDate,
      endDate,
      member,
      attachment,
      recipient,
      filePath,
      price,
      costOfOrder
    } = data;

    const trelloUrl = 'https://api.trello.com/1'

    const config = {
      params: {
        key: process.env.REACT_APP_TRELLO_KEY,
        token: process.env.REACT_APP_TRELLO_TOKEN,
      },
      headers: {
        Accept: "application/json",
        'Content-Type': 'multipart/form-data',
      },
    }

    // const sectionName = `Sekcja:`

    // const descSectionArray = description.map((desc, i) => {
    //   return (
    //     `
    //     \n\
    //     \n***${sectionName}${i + 1} >>>>>>>>>>>>>>>>>>>>>***
    //     \n>**Logo: ${desc.logo}**
    //     \n>Ilość: ${desc.amount}
    //     \n>Tkanina: ${desc.fabric}
    //     \n>Szerokość: ${desc.width}cm
    //     \n>Wysokość: ${desc.height}cm
    //     \n>Rozmiar: ${desc.size}
    //     \n>Pakowanie: ${desc.packing ? 'TAK' : 'NIE'}
    //     \n>Cena za 1 szt: ${desc.priceForOnePiece} zł
    //     \n>Wartość sekcji: ${desc.price} zł
    //     \n\n>Dodatkowy opis: ${desc.additionalDesc}
    //     \n-\n\n\n\
    //     `
    //   )
    // }).join('').toString();

    // const descData = `
    //   ${descSectionArray} 
    //   \n***Dane dodatkowe >>>>>>>>>>>>>>>>***
    //   \n>Plik produkcyjny: **${filePath}**
    //   \n>Wartość zlecenia: **${price}**
    //   \n>Koszt zlecenia: **${costOfOrder}**
    // `

    const sectionName = `Sekcja:`
    const orderPrice = price > 0 ? `\n>Wartość zlecenia: ${price} zł` : ''
    const orderCost = costOfOrder > 0 ? `\n>Koszt zlecenia: ${costOfOrder} zł` : ''

    const descSectionArray = description.map((desc, i) => {
      const decsPriceForOnePiece = desc.priceForOnePiece > 0 ? `\n>Cena za 1 szt: ${desc.priceForOnePiece} zł` : ''
      const descPrice = desc.price > 0 ? `\n>Wartość sekcji: ${desc.price} zł` : ''

      return (
        `
        \n\
        \n***${sectionName}${i + 1} >>>>>>>>>>>>>>>>>>>>>***
        \n>**Logo: ${desc.logo}**
        \n>Ilość: ${desc.amount}
        \n>Tkanina: ${desc.fabric}
        \n>Szerokość: ${desc.width}cm
        \n>Wysokość: ${desc.height}cm
        \n>Rozmiar: ${desc.size}
        \n>Pakowanie: ${desc.packing ? 'TAK' : 'NIE'}
        ${decsPriceForOnePiece}
        ${descPrice}
        \n\n>Dodatkowy opis: ${desc.additionalDesc ? desc.additionalDesc : 'Brak'}
        \n-\n\n\n\
        `
      )
    }).join('').toString();

    const descData = `
      ${descSectionArray} 
      \n***Dane dodatkowe >>>>>>>>>>>>>>>>***
      \n>Plik produkcyjny: ${filePath ? `**${filePath}**` : 'Nie wybrano'}
      ${orderPrice}
      ${orderCost}
    `

    const formInitialDataCard = new FormData();
    formInitialDataCard.append("idList", `${process.env.REACT_APP_TRELLO_EMBROIDERY_LIST}`);
    formInitialDataCard.append("name", title);
    formInitialDataCard.append("desc", descData);
    formInitialDataCard.append("start", startDate);
    formInitialDataCard.append("due", endDate);
    formInitialDataCard.append("idMembers", `${member},${recipient}`);

    const formFileDataCard = new FormData();
    formFileDataCard.append("file", attachment[0]);
    formFileDataCard.append("setCover", 'false');

    const formChecklistDataCard = new FormData();
    formChecklistDataCard.append("name", "Lista zadań");

    try {
      const res = await axios.post(
        `${trelloUrl}/cards`,
        formInitialDataCard,
        config,
      )

      if (attachment.length) {
        await axios.post(`${trelloUrl}/cards/${res.data.id}/attachments`,
          formFileDataCard,
          config
        )
      }

      const checklistRes = await axios.post(`${trelloUrl}/cards/${res.data.id}/checklists`,
        formChecklistDataCard,
        config
      )

      await Promise.all(
        description.map(async (desc) => {
          await axios.post(`${trelloUrl}/checklists/${checklistRes.data.id}/checkItems`,
            {
              name: desc.logo,
              checked: false
            },
            config)
        }))
    } catch (error) {
      console.error(error);
    }
  };
  const [successSubmit, setSuccessSubmit] = useState(false)
  const ref = useRef(null)

  const closeModal = () => setSuccessSubmit(false)

  const handleSubmitForm = (data: Card) => {
    AddCardForm(data);
    if (data) {
      setSuccessSubmit(true)
    }
    reset()
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <div className={styles.formContainer}>
        <Modal trigger={successSubmit} closeModal={closeModal}>
          <h2 style={{
            padding: 10,
            textAlign: 'center',
            fontSize: '3.5rem',
            zIndex: 100
          }}>
            Twoje zlecenie <br /> zostało dodane do <br /><strong>tablicy Hafciarnia w <br />Trello !!!</strong>
          </h2>
          <Success />
        </Modal>
        <div className={styles.formGroupContainer}>
          <div className={styles.formGroupRow}>
            <>
              <Input
                id={"title"}
                placeholder={""}
                label={"Kontrachent"}
                type="text"
                error={errors.title}
                style={{ padding: "10px", height: 48, fontSize: 17 }}
                // {...register("title", { ...validation.title })}
                {...register("title", { required: true })}
              />
              {/* {titleErrors(errors.title?.type)} */}
            </>
            <div className={styles.checkboxList}>
              {traders?.map((trader, index) => (
                <Checkbox
                  key={index}
                  id={trader.initial}
                  type={"radio"}
                  value={trader.id}
                  label={trader.initial}
                  error={errors.member}
                  {...register("member", { required: true })}
                />
              ))}
            </div>
          </div>
          {fields.map((field, index) => {
            return (
              <FormSection key={field.id}>
                <div className={styles.sectionContent}>
                  <div className={styles.formGroupColumn} style={{ justifyContent: 'space-between' }}>
                    <Input
                      id={field.id}
                      label={"Logo"}
                      type="text"
                      error={errors.description}
                      {...register(`description.${index}.logo` as const, {
                        required: true,
                      })}
                      defaultValue={field.logo}
                    />
                    <Textarea
                      id={field.id}
                      label={'Dodatkowy opis'}
                      {...register(`description.${index}.additionalDesc` as const)}
                    />
                  </div>
                  <div className={styles.formGroupColumn}>
                    <Select
                      label={"Tkanina"}
                      options={fabric}
                      id={field.id}
                      defaultValue={field.fabric}
                      {...register(`description.${index}.fabric` as const)}
                    />
                    <Input
                      id={field.id}
                      placeholder={"Ilość"}
                      label={"Ilość"}
                      type="number"
                      step={"1"}
                      min={0}
                      {...register(`description.${index}.amount` as const,
                        { onChange: handleWatchCustomPriceValue, required: true })
                      }
                    />
                    <div className={styles.rowContainer}>
                      <Input
                        id={field.id}
                        placeholder={"Szerokość"}
                        label={"Szerokość (cm)"}
                        type="number"
                        step={"0.1"}
                        min={0}
                        {...register(`description.${index}.width` as const,
                          { onChange: handleWatchFormSizeWidthValue, required: true })
                        }
                      />
                      <Input
                        id={field.id}
                        placeholder={"Wysokość"}
                        label={"Wysokość (cm)"}
                        type="number"
                        step={"0.1"}
                        min={0}
                        {...register(`description.${index}.height` as const,
                          { onChange: handleWatchFormSizeHeightValue, required: true })
                        }
                      />
                    </div>
                    <Input
                      id={field.id}
                      label={"Rozmiar"}
                      type="text"
                      {...register(`description.${index}.size` as const)}
                      readOnly
                    />
                    <div className={styles.formGroupRow} style={{ margin: '10px 0 5px' }}>
                      <label>Pakowanie (50gr/1szt)</label>
                      <input
                        id={field.id}
                        className={styles.defaultCheckbox}
                        type={'checkbox'}
                        {...register(`description.${index}.packing` as const, { onChange: handleWatchPacking })}
                      />
                    </div>
                    <div className={styles.rowContainer}>
                      <>
                        <div style={{ width: 120, marginRight: 15 }}>
                          <Input
                            id={field.id}
                            label={"Cena 1szt."}
                            style={{ border: '2px solid green' }}
                            type="number"
                            min={0}
                            {...register(`description.${index}.priceForOnePiece` as const,
                              { onChange: handleWatchCustomPriceValue })
                            }
                          />
                        </div>
                        <Input
                          id={field.id}
                          label={"Wartość sekcji"}
                          type="number"
                          {...register(`description.${index}.price` as const)}
                          readOnly
                        />
                      </>
                    </div>
                    {
                      sectionForms.length > 1 ? (
                        <Button
                          type={"button"}
                          title={"Usuń sekcję"}
                          onClick={() => remove(index)}
                          style={{ margin: '20px 0 0' }}
                        />
                      ) : null
                    }
                  </div>
                </div>
              </FormSection>
            );
          })}
          {/* delete section ----------------------------> */}
          {/* {
                  fields.length > 1 ? (
                    <Button
                      type={"button"}
                      title={"x"}
                      onClick={() => remove(index)}
                      style={{ fontSize: "1rem", width: '15px', height: '30px' }}
                    />
                  ) : null
                } */}
          {/* delete section ----------------------------> */}
          <Button
            type={"button"}
            title={"Dodaj sekcję"}
            onClick={() => append(defaultSectionValues)}
            style={{ fontSize: "1.2rem" }}
            icon={<RiAddLine fontSize={"1.5rem"} fontWeight={"bold"} />}
          />
        </div>
        <div className={`${styles.formGroupContainer} ${styles.rightPanel}`}>
          <div className={`${styles.formGroupColumn} ${styles.rightPanelColumn}`}>
            <div className={styles.inputContainer}>
              <Select
                label={"Przyjął"}
                options={embroidery}
                id={"recipient"}
                {...register("recipient")}
              />
              <Input
                id={"date-admission"}
                placeholder={"Data przyjęcia"}
                label={"Data przyjęcia"}
                value={new Date().toISOString().slice(0, 10)}
                type="date"
                {...register("startDate")}
              />
              <Input
                id={"endDate"}
                placeholder={"Data oddania"}
                label={"Data oddania"}
                type="date"
                error={errors.endDate}
                {...register("endDate", { required: true })}
              />
            </div>
            <div className={styles.buttonContainer}>
              <div className={styles.inputContainer}>
                <Input
                  id={"attachment"}
                  placeholder={"Dodaj wizualizację"}
                  style={{ backgroundColor: '#fdfdfd' }}
                  label={"Dodaj wizualizację"}
                  type="file"
                  // error={errors.description}
                  {...register("attachment")}
                />
                <Input
                  id={"filePath"}
                  placeholder={"Wklej sciężkę pliku..."}
                  label={"Ścieżka do pliku produkcyjnego"}
                  type="text"
                  {...register(`filePath`)}
                />
              </div>
            </div>
            <Input
              id={'price'}
              label={"Wartość zlecenia"}
              type="number"
              {...register(`price`)}
              readOnly
            />
            <Input
              id={'costOfOrder'}
              label={"Koszt zlecenia (Wartość zlecenia * 0,75)"}
              type="number"
              {...register(`costOfOrder`)}
              readOnly
            />
            <div className={styles.buttonContainer}>
              <Button type={"submit"} title={"Dodaj zlecenie"} onClick={() => console.log("click")} />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EmbroideryForm;
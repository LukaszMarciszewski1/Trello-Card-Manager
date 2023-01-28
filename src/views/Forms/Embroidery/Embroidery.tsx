/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import axios from "axios";
import dayjs from "dayjs";

import { traders, fabric, departments } from "data/appData/index";
import { useForm, useFieldArray } from "react-hook-form";
import { Card, Description } from "models/card";

import {
  getPriceForOnePieceOfSection,
  getTotalPrice,
  getPriceForSection,
  getSelectedSizeName,
} from "calculation/calculator";

import Input from "components/common/Input/Input";
import Button from "components/common/Button/Button";
import Checkbox from "components/common/Checkbox/Checkbox";
import Select from "components/common/Select/Select";
import SectionForm from "components/templates/SectionForm/SectionForm";
import Textarea from "components/common/Textarea/Textarea";
import SuccessModal from "components/templates/SuccessModal/SuccessModal";
import { RiAddLine } from "react-icons/ri";

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
  const [watchPacking, setWatchPacking] = useState(false)
  const [successSubmit, setSuccessSubmit] = useState(false)

  useEffect(() => {
    setSectionForms(watchForChangesInSectionForms)
  }, [watchForChangesInSectionForms])

  useEffect(() => {
    fields.map((item, index) => {
      setValue(`description.${index}.materialType`, '')

    })
  }, [])

  useEffect(() => {
    setValue('orderPrice', getTotalPrice(sectionForms))
    setValue('orderCost', Number((getTotalPrice(sectionForms) * 0.75).toFixed(1)))
    fields.map((item, index) => {
      setValue(`description.${index}.customPrice`, true)
      setValue(`description.${index}.price`, getPriceForSection(sectionForms, index))
      setValue(`description.${index}.priceForOnePiece`, getPriceForOnePieceOfSection(sectionForms, index))
    })
  }, [
    getTotalPrice(sectionForms),
    watchCustomPrice,
    watchFormSizeWidth,
    watchFormSizeHeight,
    watchPacking
  ])

  useEffect(() => {
    fields.map((item, index) => {
      setValue(`description.${index}.size`, getSelectedSizeName(sectionForms, index))
    })
  }, [
    watchFormSizeWidth,
    watchFormSizeHeight,
    sectionForms
  ])

  const handleWatchCustomPriceValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWatchCustomPrice(e.target.value)
  }

  const handleWatchFormSizeWidthValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWatchFormSizeWidth(e.target.value)
  }

  const handleWatchFormSizeHeightValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWatchFormSizeHeight(e.target.value)
  }

  const handleWatchPacking = () => {
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
      orderPrice,
      orderCost
    } = data;

    const sectionFormData = description.map((desc, i) => {
      const decsPriceForOnePiece = desc.priceForOnePiece > 0 ? `\n>Cena za 1 szt: ${desc.priceForOnePiece} zł` : ''
      const descPrice = desc.price > 0 ? `\n>Wartość sekcji: ${desc.price} zł` : ''
      return (
        `
        \n\
        \n***Sekcja:${i + 1} >>>>>>>>>>>>>>>>>>>>>***
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

    const price = orderPrice > 0 ? `\n>Wartość zlecenia: ${orderPrice} zł` : ''
    const cost = orderCost > 0 ? `\n>Koszt zlecenia: ${orderCost} zł` : ''

    const descData = `
      ${sectionFormData} 
      \n***Dane dodatkowe >>>>>>>>>>>>>>>>***
      \n>Plik produkcyjny: ${filePath ? `**${filePath}**` : 'Nie wybrano'}
      ${price}
      ${cost}
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

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_TRELLO_URL}/cards`,
        formInitialDataCard,
        config,
      )

      if (attachment.length) {
        await axios.post(`${process.env.REACT_APP_TRELLO_URL}/cards/${res.data.id}/attachments`,
          formFileDataCard,
          config
        )
      }

      const checklistRes = await axios.post(`${process.env.REACT_APP_TRELLO_URL}/cards/${res.data.id}/checklists`,
        formChecklistDataCard,
        config
      )

      await Promise.all(
        description.map(async (desc) => {
          await axios.post(`${process.env.REACT_APP_TRELLO_URL}/checklists/${checklistRes.data.id}/checkItems`,
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

  const handleSubmitForm = (data: Card) => {
    AddCardForm(data);
    if (data) {
      setSuccessSubmit(true)
    }
    reset()
  }

  const closeModal = () => setSuccessSubmit(false)

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <div className={styles.formContainer}>
        <SuccessModal
          trigger={successSubmit}
          closeModal={closeModal}
          boardName={'Hafciarnia'}
        />
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
                {...register("title", { required: true })}
              />
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
              <SectionForm key={field.id}>
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
              </SectionForm>
            );
          })}
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
                options={departments.embroidery}
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
              id={'orderPrice'}
              label={"Wartość zlecenia"}
              type="number"
              {...register(`orderPrice`)}
              readOnly
            />
            <Input
              id={'orderCost'}
              label={"Koszt zlecenia (Wartość zlecenia * 0,75)"}
              type="number"
              {...register(`orderCost`)}
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
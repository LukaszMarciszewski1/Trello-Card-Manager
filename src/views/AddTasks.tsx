/* eslint-disable no-useless-escape */
import React, { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import axios from "axios";
import dayjs from "dayjs";

import { traders, fabric, recipient, materials, sizes } from "data";
import { useForm, useFieldArray } from "react-hook-form";
import { Card, Description } from "models/card";
import Tabs from "components/Tabs/Tabs";
import TabsContent from "components/Tabs/TabsContent/TabsContent";

import Input from "components/Input/Input";
import Button from "components/Button/Button";
import Checkbox from "components/Checkbox/Checkbox";
import Select from "components/Select/Select";
import FormSection from "components/Section/FormSection";
import Textarea from "components/Textarea/Textarea";
import MaterialsForm from "./MaterialsForm/MaterialsForm";
import { RiAddLine } from "react-icons/ri";
import {
  getPriceForOnePieceOfSection,
  getTotalPrice,
  getPriceForSection,
  isMoreThanMaximumSize,
  observeForm,
  customPriceArray
} from "calculation/calculator";
import { BsChevronCompactLeft } from "react-icons/bs";

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

interface TaskFormProps {
  title: string;
  // handleSubmitForm: (data: Card) => void;
}

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
const defaultDescriptionValues = {
  logo: "",
  amount: 0,
  fabric: fabric[0].value,
  // size: sizes[0].value,
  size: 'Tu będzie się wyświetlał rozmiar',
  width: 0,
  height: 0,
  price: 0,
  priceForOnePiece: 0,
  customPrice: false,
  additionalDesc: '',
  materials: []
};

const Tasks: React.FC = () => {
  dayjs.locale("pl");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm<Card>({
    defaultValues: {
      description: [defaultDescriptionValues],
    },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    name: "description",
    control,
  });

  const watchForChangesInSectionForms = watch('description');

  const [trigger, setTrigger] = useState(false)
  const [sectionForms, setSectionForms] = useState<Description[]>([])
  const [isMaxSize, setIsMaxSize] = useState(false)

  useEffect(() => {
    setSectionForms(watchForChangesInSectionForms)
  }, [watchForChangesInSectionForms])

  const [result, setResult] = useState(observeForm(sectionForms))
  useEffect(() => {
    setValue('price', getTotalPrice(sectionForms))
    fields.map((item, index) => {
      setValue(`description.${index}.price`, getPriceForSection(sectionForms, index))
      setValue(`description.${index}.priceForOnePiece`, getPriceForOnePieceOfSection(sectionForms, index))
      setValue(`description.${index}.customPrice`, isMoreThanMaximumSize(sectionForms, index))
    })
  }, [getTotalPrice(sectionForms)])

  customPriceArray(sectionForms)




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
      price
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

    const sectionName = `Sekcja:`

    const descSectionArray = description.map((desc, i) => {
      const materials = desc.materials.map((item: { field: any; }) => item.field)
      return (
        `
        \n\
        \n***${sectionName}${i + 1} >>>>>>>>>>>>>>>>>>>>>***
        \n>**Logo: ${desc.logo}**
        \n>Ilość: ${desc.amount}
        \n>Tkanina: ${desc.fabric}
        \n>Szerokość: ${desc.width}cm
        \n>Wysokość: ${desc.height}cm
        \n>Materiał: ${materials.join(', ')}
        \n>Rozmiar: ${desc.size}
        \n>Cena: ${desc.price}
        \n\n>Dodatkowy opis: ${desc.additionalDesc}
        \n-\n\n\n\
        `
      )
    }).join('').toString();

    const descData = `
      ${descSectionArray} 
      \n***Dane dodatkowe >>>>>>>>>>>>>>>>***
      \n>Plik produkcyjny: **${filePath}**
      \n>cena: **${price}**
    `

    const formInitialDataCard = new FormData();
    formInitialDataCard.append("idList", `${process.env.REACT_APP_TRELLO_LIST}`);
    // formInitialDataCard.append("idList", `63adfbbe7d5d0e00edfd01e9`);
    formInitialDataCard.append("name", title);
    formInitialDataCard.append("desc", descData);
    formInitialDataCard.append("start", startDate);
    formInitialDataCard.append("due", endDate);
    formInitialDataCard.append("idMembers", `${member},${recipient}`);

    const formFileDataCard = new FormData();
    formFileDataCard.append("file", attachment[0]);
    formFileDataCard.append("setCover", 'false');

    const formChecklistDataCard = new FormData();
    formChecklistDataCard.append("name", title);

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

  const handleSubmitForm = (data: Card) => {
    // AddCardForm(data);
    console.log(data)
    // reset()
  }

  // console.log(fields)

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <div className={styles.formContainer}>
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
                {...register("title", { ...validation.title })}
              />
              {titleErrors(errors.title?.type)}
            </>
            <div className={styles.checkboxList}>
              {traders?.map((trader, index) => (
                <Checkbox
                  key={index}
                  id={trader.initial}
                  type={"radio"}
                  value={trader.id}
                  label={trader.initial}
                  {...register("member")}
                />
              ))}
            </div>
          </div>
          {fields.map((field, index) => {
            return (
              <FormSection key={field.id}>
                <div className={styles.formGroupColumn}>
                  <Input
                    id={field.id}
                    // placeholder={"Logo"}
                    label={"Logo"}
                    type="text"
                    error={errors.description}
                    {...register(`description.${index}.logo` as const, {
                      required: true,
                    })}
                    defaultValue={field.logo}
                  />
                  <MaterialsForm
                    {...{ control, register }}
                    registerName={`description[${index}].materials`}
                    materials={materials}
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
                    {...register(`description.${index}.amount` as const)}
                  />
                  <div className={styles.rowContainer}>
                    <Input
                      id={field.id}
                      placeholder={"Szerokość"}
                      label={"Szerokość (cm)"}
                      type="number"
                      step={"0.1"}
                      min={0}
                      {...register(`description.${index}.width` as const)}
                    />
                    <Input
                      id={field.id}
                      placeholder={"Wysokość"}
                      label={"Wysokość (cm)"}
                      type="number"
                      step={"0.1"}
                      min={0}
                      {...register(`description.${index}.height` as const)}
                    />
                  </div>
                  <Input
                    id={field.id}
                    label={"Rozmiar"}
                    type="text"
                    style={{ userSelect: 'none', backgroundColor: '#f4f5fa' }}
                    {...register(`description.${index}.size` as const)}
                    readOnly
                  />
                  <div className={styles.rowContainer}>
                    {
                      isMoreThanMaximumSize(sectionForms, index) ? (
                        <>
                          <div style={{ width: 140, marginRight: 10 }}>
                            <Input
                              id={field.id}
                              label={"Cena 1szt."}
                              type="number"
                              {...register(`description.${index}.priceForOnePiece` as const)}
                            />
                          </div>
                          <Input
                            id={field.id}
                            label={"Łączna cena sekcji"}
                            type="number"
                            {...register(`description.${index}.price` as const)}
                          />
                        </>
                      ) : (
                        <>
                          <div style={{ width: 140, marginRight: 10 }}>
                            <Input
                              id={field.id}
                              label={"Cena 1szt."}
                              style={{ userSelect: 'none', backgroundColor: '#f4f5fa' }}
                              type="number"
                              {...register(`description.${index}.priceForOnePiece` as const)}
                              readOnly
                            />
                          </div>
                          <Input
                            id={field.id}
                            label={"Łączna cena sekcji"}
                            style={{ userSelect: 'none', backgroundColor: '#f4f5fa' }}
                            type="number"
                            {...register(`description.${index}.price` as const)}
                            readOnly
                          />
                        </>
                      )
                    }
                  </div>
                  {/* <div className={styles.rowContainer}>
                    <div style={{ width: 140, marginRight: 10 }}>
                      <Input
                        id={field.id}
                        label={"Cena 1szt."}
                        style={{ userSelect: 'none', backgroundColor: '#f4f5fa' }}
                        type="number"
                        {...register(`description.${index}.priceForOnePiece` as const)}
                        readOnly
                      />
                    </div>
                    <Input
                      id={field.id}
                      label={"Łączna cena sekcji"}
                      style={{ userSelect: 'none', backgroundColor: '#f4f5fa' }}
                      type="number"
                      {...register(`description.${index}.price` as const)}
                      readOnly
                    />
                  </div> */}
                  {/* <Input
                    id={field.id}
                    label={"Cena"}
                    defaultValue={66}
                    type="number"
                    disabled
                    {...register(`description.${index}.price` as const)}
                  /> */}
                </div>
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
              </FormSection>
            );
          })}
          <Button
            type={"button"}
            title={"Dodaj sekcję"}
            onClick={() => append(defaultDescriptionValues)}
            style={{ fontSize: "1.2rem" }}
            icon={<RiAddLine fontSize={"1.5rem"} fontWeight={"bold"} />}
          />
        </div>
        <div className={`${styles.formGroupContainer} ${styles.rightPanel}`}>
          <div className={`${styles.formGroupColumn} ${styles.rightPanelColumn}`}>
            <div className={styles.inputContainer}>
              <Select
                label={"Przyjął"}
                options={recipient}
                id={"recipient"}
                {...register("recipient")}
              />
            </div>
            <div className={styles.inputContainer}>
              <Input
                id={"date-admission"}
                placeholder={"Data przyjęcia"}
                label={"Data przyjęcia"}
                value={new Date().toISOString().slice(0, 10)}
                type="date"
                error={errors.description}
                {...register("startDate")}
              />
            </div>
            <div className={styles.inputContainer}>
              <Input
                id={"endDate"}
                placeholder={"Data oddania"}
                label={"Data oddania"}
                type="date"
                error={errors.description}
                {...register("endDate")}
              />
            </div>
            <div className={styles.buttonContainer}>
              <div className={styles.inputContainer}>
                <Input
                  id={"attachment"}
                  placeholder={"Dodaj wizualizację"}
                  label={"Dodaj wizualizację"}
                  type="file"
                  error={errors.description}
                  {...register("attachment")}
                />
              </div>
              <div className={styles.inputContainer}>
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
              label={"Cena"}
              style={{ userSelect: 'none', backgroundColor: '#f4f5fa' }}
              type="number"
              // value={result}
              {...register(`price`)}
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

export default React.memo(Tasks);

/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import axios from "axios";
import dayjs from "dayjs";

import { traders, fabric, recipient, materials, size } from "data";
import { useForm, useFieldArray } from "react-hook-form";
import { Card, Description } from "models/card";

import Input from "components/Input/Input";
import Button from "components/Button/Button";
import Checkbox from "components/Checkbox/Checkbox";
import Select from "components/Select/Select";
import FormSection from "components/Section/FormSection";
import Textarea from "components/Textarea/Textarea";
import MaterialsForm from "./MaterialsForm/MaterialsForm";
import { RiAddLine } from "react-icons/ri";
import { calculator, getPrice } from "calculation/calculator";


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
  size: size[0].value,
  width: 0,
  height: 0,
  additionalDesc: '',
  price: 0,
  materials: []
};

const Tasks: React.FC = () => {
  dayjs.locale("pl");
  const [trigger, setTrigger] = useState(false)


  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch
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

    const descData = description.map((desc, i) => {
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
        \n\n>Plik produkcyjny: ${filePath}
        \n\n>Dodatkowy opis: ${desc.additionalDesc}
        \n-\n\n\n\
        `
      )
    }).join('').toString();


    const formInitialDataCard = new FormData();
    formInitialDataCard.append("idList", `${process.env.REACT_APP_TRELLO_LIST}`);
    formInitialDataCard.append("name", title);
    formInitialDataCard.append("desc", `${descData} Plik produkcyjny:${filePath}\n cena: ${price}`);
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
    const { description } = data
    // AddCardForm(data);
    console.log(data)
  };

  // const [state, setState] = useState({ fName: "", lName: "" });
  // const handleChange = e => {
  //   const { name, value } = e.target;
  //   setState(prevState => ({
  //     ...prevState,
  //     [name]: value
  //   }));
  // };

  // const value1 = watch('description');
  // type Item = {
  //   amount: number;
  //   size: string;
  //   material: string
  // };
  // const [items, setItems] = useState<Item>({
  //   amount: 0,
  //   size: '',
  //   material: 'string'
  // });

  // const handleChangePrice = (e: any, index: number) => {
  //   console.log(e.target.value)
  //   console.log(index)
  //   setItems(prevState => ({
  //     ...prevState,
  //     amount: e.target.value
  //   }));
  // }

  // console.log(items)



  type Item = {
    amount: number;
    size: string;
    material: string
    price: number
  };
  interface IState {
    items: Item[];
  }
  const [itemsState, setItems] = useState<IState>({
    items: []
  });

  // const array = [
  //   {
  //     amount: 2,
  //     size: 23,
  //     fabric: "skóra",
  //   },
  //   {
  //     amount: 12,
  //     size: 25,
  //     fabric: "bawełna",
  //   }
  // ]

  const [result, setResult] = useState(66)
  let watchChangesDescription = watch('description');

  const [descriptionValues, setDescriptionValues] = useState<Description[]>([])

  useEffect(() => {
    setDescriptionValues(watchChangesDescription)
  }, [watchChangesDescription])

  // const calculation = () => {
  //   const updateDescription = [...descriptionValues]
  //   let price: number[] = []
  //   const newPrice = updateDescription.map((item) => {
  //     const material = (item.materials.length ? item.materials[0].field : '').toString()
  //     if (!item.materials.length) {
  //       price.push(0)
  //     } else {
  //       price.push(calculator(Number(item.amount), item.size, material));
  //     }
  //   });
  //   const sum = price.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  //   console.log(price)
  //   console.log(sum)
  // }

  // calculation()

  // const array = [4, 9]


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
                    {...register(`description.${index}.amount` as const, {
                      onChange: (e) =>
                        setItems(prevState => ({
                          ...prevState,
                          amount: e.target.value,
                        }))
                    })}
                  />
                  <Input
                    id={field.id}
                    placeholder={"Szerokość"}
                    label={"Szerokość (cm)"}
                    type="number"
                    step={"0.1"}
                    {...register(`description.${index}.width` as const)}
                  />
                  <Input
                    id={field.id}
                    placeholder={"Wysokość"}
                    label={"Wysokość (cm)"}
                    type="number"
                    step={"0.1"}
                    {...register(`description.${index}.height` as const)}
                  />
                  <Select
                    label={"Rozmiar"}
                    options={size}
                    id={field.id}
                    defaultValue={field.size}
                    {...register(`description.${index}.size` as const)}
                  />
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
            <Select label={"Przyjął"} options={recipient} id={"recipient"} {...register("recipient")} />
            <Input
              id={"date-admission"}
              placeholder={"Data przyjęcia"}
              label={"Data przyjęcia"}
              value={new Date().toISOString().slice(0, 10)}
              type="date"
              error={errors.description}
              {...register("startDate")}
            />
            <Input
              id={"endDate"}
              placeholder={"Data oddania"}
              label={"Data oddania"}
              type="date"
              error={errors.description}
              {...register("endDate")}
            />
            <div className={styles.buttonContainer}>
              <Input
                id={"attachment"}
                placeholder={"Dodaj wizualizację"}
                label={"Dodaj wizualizację"}
                type="file"
                error={errors.description}
                {...register("attachment")}
              />
              <Input
                id={"filePath"}
                placeholder={"Wklej sciężkę pliku..."}
                label={"Ścieżka do pliku produkcyjnego"}
                type="text"
                {...register(`filePath`)}
              />
              <Input
                id={'price'}
                label={"Cena"}
                value={getPrice(descriptionValues)}
                type="number"
                disabled
                {...register(`price`)}
              />
            </div>
            <div className={styles.buttonContainer}>
              <Button type={"submit"} title={"Dodaj zlecenie"} onClick={() => console.log("click")} style={{ fontSize: "1.2rem" }} />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default React.memo(Tasks);

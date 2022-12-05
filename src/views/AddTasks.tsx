import React, { useState } from "react";
import styles from "./styles.module.scss";
import { useForm, useFieldArray, useWatch, Control } from "react-hook-form";
import Input from "components/Input/Input";
import { Task, Description } from "models/task";
import Button from "components/Button/Button";
import { RiAddLine } from "react-icons/ri";
import Checkbox from "components/Checkbox/Checkbox";
import Select from "components/Select/Select";
import FormSection from "components/Section/FormSection";
import { traders, fabric, production, sizes, recipient } from "data";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import fs from "fs";
import SectionsList from "components/SectionsList/SectionsList";
import Tabs from "components/Tabs/Tabs";
import TabsContent from "components/Tabs/TabsContent/TabsContent";
// import fetch from 'node-fetch';

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
  handleSubmitForm: (data: Task) => void;
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
  fabric: fabric[0].name,
  width: 0,
  height: 0,
};

const Tasks: React.FC = () => {
  dayjs.locale("pl");
  const [sections, setSections] = useState([]);
  const trelloAuthUrl = `key=${process.env.REACT_APP_TRELLO_KEY}&token=${process.env.REACT_APP_TRELLO_TOKEN}`;
  const trelloListUrl = `https://api.trello.com/1/cards?idList=${process.env.REACT_APP_TRELLO_LIST}&${trelloAuthUrl}`;
  const trelloCardUrl = (
    id: string,
    option?: string,
    valueKey?: string,
    value?: string | string[]
  ) => {
    return `https://api.trello.com/1/cards/${id}/${option}?${trelloAuthUrl}&${valueKey}=${value}`;
  };

  //`https://api.trello.com/1/cards/${JSON.parse(text).id}/idMembers?key=${process.env.REACT_APP_TRELLO_KEY}&token=${process.env.REACT_APP_TRELLO_TOKEN}&value=${member}`,
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Task>({
    defaultValues: {
      description: [defaultDescriptionValues],
    },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    name: "description",
    control,
  });

  const fetchData = (data: Task) => {
    console.log(data);
    const {
      title,
      description,
      startDate,
      deadline,
      member,
      attachment,
      recipient,
    } = data;
    const newMember = [`${member},${recipient}`];
    // const nwLogo = description.map(desc => formInitialCard.append('desc', `**Logo:  ${desc.logo}**%0D%0AIlość: ${desc.amount}%0D%0ATkanina: ${desc.fabric}%0D%0A%0D%0A`))
    const formData = new FormData();
    const formInitialCard = new FormData();
    const descPayload = description
      .map(
        (desc, i) =>
          `***Sekcja${i + 1}***\n**Logo: ${desc.logo}**\nIlość: ${
            desc.amount
          }\nTkanina: ${desc.fabric}\nSzerokość: ${desc.width}cm\nWysokość: ${
            desc.height
          }cm\n\n`
      )
      .toString();

    formInitialCard.append("name", title);
    formInitialCard.append("desc", descPayload);
    formInitialCard.append("start", startDate);
    formInitialCard.append("due", deadline);
    formInitialCard.append("idMembers", `${member},${recipient}`);
    formData.append("file", attachment[0]);

    const optionsInit = {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formInitialCard,
    };

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    };
    // fetch(`${trelloListUrl}&name=${title}&desc=${nwLogo}&start=${startDate}&due=${deadline}&idMembers=${member},${recipient}`, options)
    fetch(trelloListUrl, optionsInit)
      .then((response) => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        return response.text();
      })
      .then((text) => {
        fetch(
          `${trelloCardUrl(
            JSON.parse(text).id,
            "checklists",
            "name",
            "lista zadań"
          )}`,
          options
        );
        // fetch(`${trelloCardUrl(JSON.parse(text).id, 'idMembers', "value", newMember)}`, options);
        fetch(
          `https://api.trello.com/1/cards/${
            JSON.parse(text).id
          }/attachments?key=${process.env.REACT_APP_TRELLO_KEY}&token=${
            process.env.REACT_APP_TRELLO_TOKEN
          }&setCover=false`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
            },
            body: formData,
          }
        );
      })
      .then((text) => console.log(text))
      .catch((err) => console.error(err));
  };

  const handleSubmitForm = (data: Task) => {
    fetchData(data);
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <div className={styles.formContainer}>
        <div className={styles.formGroupContainer}>
          <div className={styles.formGroupRow}>
            <>
              <Input
                id={"title"}
                placeholder={"Kontrahent"}
                label={"Kontrachent"}
                type="text"
                error={errors.title}
                style={{ padding: "15px" }}
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
              {/* Feature: create new component with add new task btn and children checkbox */}
            </div>
          </div>
          {fields.map((field, index) => {
            return (
              <FormSection key={field.id}>
                {/* <div className={styles.tabsContainer}>
                  <Tabs>
                    <TabsContent title="Dodaj zlecenie">
                      <div>lista</div>
                    </TabsContent>
                    <TabsContent title="Lista zleceń">
                      <div>asdasdas</div>
                    </TabsContent>
                  </Tabs>
                </div> */}
                <div className={styles.formGroupColumn}>
                  <Input
                    id={field.id}
                    placeholder={"Logo"}
                    label={"Logo"}
                    type="text"
                    error={errors.description}
                    {...register(`description.${index}.logo` as const, {
                      required: true,
                    })}
                    defaultValue={field.logo}
                  />
                </div>
                <div className={styles.formGroupColumn}>
                  <Select
                    label={"Tkanina"}
                    options={fabric}
                    id={field.id}
                    title={field.id}
                    // defaultValue={field.fabric}
                    {...register(`description.${index}.fabric` as const)}
                  />
                  <Input
                    id={field.id}
                    placeholder={"Ilość"}
                    label={"Ilość"}
                    type="number"
                    {...register(`description.${index}.amount` as const)}
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
                  <Input
                    id={"price"}
                    // placeholder={"Cena"}
                    label={"Cena"}
                    defaultValue={0}
                    type="number"
                    // disabled={true}
                    {...register("price")}
                  />
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
          <div
            className={`${styles.formGroupColumn} ${styles.rightPanelColumn}`}
          >
            <Select
              label={"Przyjął"}
              options={recipient}
              id={"recipient"}
              // defaultValue={field.fabric}
              {...register("recipient")}
            />
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
              id={"deadline"}
              placeholder={"Data oddania"}
              label={"Data oddania"}
              type="date"
              error={errors.description}
              {...register("deadline")}
            />
            <div className={styles.buttonContainer}>
              <Input
                id={"attachment"}
                placeholder={"Dodaj załączniki"}
                label={"Dodaj załączniki"}
                type="file"
                error={errors.description}
                {...register("attachment")}
              />
            </div>
            <div className={styles.buttonContainer}>
              <Button
                type={"submit"}
                title={"Dodaj zlecenie"}
                onClick={() => console.log("click")}
                style={{ fontSize: "1.2rem" }}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Tasks;

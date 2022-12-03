import React, { useState } from "react";
import styles from "./styles.module.scss";
import { useForm, Controller } from "react-hook-form";
import Input from "components/Input/Input";
import { Task } from "models/task";
import Button from "components/Button/Button";
import { RiAddLine } from "react-icons/ri";
import Checkbox from "components/Checkbox/Checkbox";
import Select from "components/Select/Select";
import FormSection from "components/Section/FormSection";
import { traders, materials, production, sizes } from "data";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import fs from 'fs';
import SectionsList from "components/SectionsList/SectionsList";
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

const Tasks: React.FC = () => {
  dayjs.locale("pl");
  const [sections, setSections] = useState([])

  const trelloAuthUrl = `key=${process.env.REACT_APP_TRELLO_KEY}&token=${process.env.REACT_APP_TRELLO_TOKEN}`
  const trelloListUrl = `https://api.trello.com/1/cards?idList=${process.env.REACT_APP_TRELLO_LIST}&${trelloAuthUrl}`;
  const trelloCardUrl = (id: string, option?: string, valueKey?: string, value?: string) => {
    return `https://api.trello.com/1/cards/${id}/${option}?${trelloAuthUrl}&${valueKey}=${value}`
  };
  //`https://api.trello.com/1/cards/${JSON.parse(text).id}/idMembers?key=${process.env.REACT_APP_TRELLO_KEY}&token=${process.env.REACT_APP_TRELLO_TOKEN}&value=${member}`,
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Task>();

  const fetchData = (data: Task) => {
    const { title, description, startDate, deadline, member, attachment } = data
    const nwLogo = `**Logo:**  **${description}**`
    const formData = new FormData();
    formData.append("file", data.attachment[0]);
    formData.append("value", member);
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    }

    fetch(`${trelloListUrl}&name=${title}&desc=${nwLogo}&start=${startDate}&due=${deadline}`, options)
      .then((response) => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        return response.text();
      })
      .then((text) => {
        fetch(`${trelloCardUrl(JSON.parse(text).id, 'checklists', 'name', 'lista zadań')}`, options);
        fetch(`${trelloCardUrl(JSON.parse(text).id, 'idMembers', "value", member)}`, options);
        fetch(`https://api.trello.com/1/cards/${JSON.parse(text).id}/attachments?key=${process.env.REACT_APP_TRELLO_KEY}&token=${process.env.REACT_APP_TRELLO_TOKEN}&setCover=false`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: formData
        });
      })
      .then((text) => console.log(text))
      .catch((err) => console.error(err));

  };

  const handleSubmitForm = (data: Task) => {
    fetchData(data)
    console.log(data);
  };

  const handleAddNewSection = () => {
    console.log('add new section')
  }

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
          <FormSection>
            <div className={styles.formGroupColumn}>
              <Input
                id={"logo"}
                placeholder={"Logo"}
                label={"Logo"}
                type="text"
                error={errors.description}
                {...register("description", { ...validation.description })}
              />
              {titleErrors(errors.description?.type)}
            </div>
            <div className={styles.formGroupColumn}>
            </div>
          </FormSection>
          <FormSection>
            <div className={styles.formGroupColumn}>
              <Input
                id={"description"}
                placeholder={"description"}
                label={"description"}
                type="text"
                error={errors.description}
                {...register("description", { ...validation.description })}
              />
              {titleErrors(errors.description?.type)}
            </div>
            <div className={styles.formGroupColumn}>
            </div>
          </FormSection>
          <SectionsList list={sections}/>
          <Button
            type={"button"}
            title={"Dodaj sekcję"}
            onClick={handleAddNewSection}
            style={{ fontSize: "1.2rem" }}
            icon={<RiAddLine fontSize={"1.5rem"} fontWeight={"bold"} />}
          />
        </div>
        <div className={`${styles.formGroupContainer} ${styles.rightPanel}`}>
          <div className={styles.formGroupColumn}>
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
            <Input
              id={"attachment"}
              placeholder={"Dodaj załączniki"}
              label={"Dodaj załączniki"}
              type="file"
              error={errors.description}
              {...register("attachment")}
            />
            <Button
              type={"submit"}
              title={"Dodaj zlecenie"}
              onClick={() => console.log("click")}
              style={{ fontSize: "1.2rem" }}
              icon={<RiAddLine fontSize={"1.5rem"} fontWeight={"bold"} />}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default Tasks;

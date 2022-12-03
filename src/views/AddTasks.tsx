import React, { useState } from "react";
import styles from "./styles.module.scss";
import { useForm, Controller } from "react-hook-form";
import Input from "components/Input/Input";
import { Task } from "models/task";
import Button from "components/Button/Button";
import { RiAddLine } from "react-icons/ri";
import Checkbox from "components/Checkbox/Checkbox";
import Select from "components/Select/Select";
import FormSection from "components/FormSection/FormSection";
import { traders, materials, production, sizes } from "data";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import fs from 'fs';
// import fetch from 'node-fetch';

const validation = {
  title: {
    required: true,
    maxLength: 40,
    minLength: 2,
  },
  logo: {
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
  const [activeCardId, setActiveCardId] = useState<null | string>(null);
  const [cardOptions, setCardOptions] = useState<null | any>(null);

  const trelloAuthUrl = `key=${process.env.REACT_APP_TRELLO_KEY}&token=${process.env.REACT_APP_TRELLO_TOKEN}`
  const trelloListUrl = `https://api.trello.com/1/cards?idList=${process.env.REACT_APP_TRELLO_LIST}&${trelloAuthUrl}`;
  const trelloCardUrl = (id: string, option?: string, valueKey?: string, value?: string) => {
    return `https://api.trello.com/1/cards/${id}/${option}?${trelloAuthUrl}`
  };
  //`https://api.trello.com/1/cards/${JSON.parse(text).id}/idMembers?key=${process.env.REACT_APP_TRELLO_KEY}&token=${process.env.REACT_APP_TRELLO_TOKEN}&value=${member}`,
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Task>();


  // form.append('file', fs.createReadStream('qrc.png')); 
  const [sFile, setFile] = useState('')
  const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { files } } = e;
    //     if (files !== null) {
    // formData.append("mimeType", "image/jpeg");
    // formData.append("name", "test");
    //       formData.append('files', files[0])
    //     }
    const key = process.env.REACT_APP_TRELLO_KEY
    const token = process.env.REACT_APP_TRELLO_TOKEN
    var formData = new FormData();
    if (files !== null) {
      formData.append("mimeType", "image/jpeg");
      formData.append("name", "test");
      formData.append('files', files[0])
    }

    var request = new XMLHttpRequest();
    request.open("POST", `https://api.trello.com/1/cards/638b641de7e22b006023a5ad/attachments?key=${process.env.REACT_APP_TRELLO_KEY}&token=${process.env.REACT_APP_TRELLO_TOKEN}`);
    request.send(formData);

  }



  const fetchData = (data: Task) => {
    const { title, logo, startDate, deadline, member, attachment } = data
    const nwLogo = `**Logo:**  **${logo}**`
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
        // fetch(`${trelloCardUrl(JSON.parse(text).id, 'checklists', 'name', 'lista zadań')}`, options);
        fetch(`${trelloCardUrl(JSON.parse(text).id, 'idMembers')}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: formData
        });
        fetch(`https://api.trello.com/1/cards/${JSON.parse(text).id}/attachments?key=${process.env.REACT_APP_TRELLO_KEY}&token=${process.env.REACT_APP_TRELLO_TOKEN}&setCover=false`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: formData
        });
      })
      // .then((text) => console.log(text))
      .catch((err) => console.error(err));

  };

  const handleSubmitForm = (data: Task) => {
    fetchData(data)
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
          <FormSection>
            <div className={styles.formGroupColumn}>
              <Input
                id={"logo"}
                placeholder={"Logo"}
                label={"Logo"}
                type="text"
                error={errors.logo}
                {...register("logo", { ...validation.logo })}
              />
              {titleErrors(errors.logo?.type)}
              {/* <div className={`${styles.checkboxList} ${styles.wrapper}`}>
                <p>Materiał: </p>
                {materials?.map((material, index) => (
                  <Checkbox
                    key={index}
                    id={material.name}
                    type={"radio"}
                    value={material.name}
                    style={{ height: "30px" }}
                    label={material.name}
                    {...register("materials")}
                  />
                ))}
              </div> */}
            </div>
            <div className={styles.formGroupColumn}>
              {/* <Input
                id={"fabric"}
                placeholder={"Tkanina"}
                label={"Tkanina"}
                type="text"
                error={errors.logo}
                {...register("fabric")}
              />
              <Input
                id={"amount"}
                placeholder={"Ilość"}
                label={"Ilość"}
                type="number"
                error={errors.logo}
                {...register("amount")}
              />
              <Input
                id={"width"}
                placeholder={"Szerokość"}
                label={"Szerokość"}
                type="number"
                error={errors.logo}
                {...register("width")}
              />
              <Input
                id={"height"}
                placeholder={"Wysokość"}
                label={"Wysokość"}
                type="number"
                error={errors.logo}
                {...register("height")}
              />
              <Select
                label={"Rozmiar"}
                options={sizes}
                id={"size"}
                name={"size"}
              />
              <Input
                id={"price"}
                label={"Cena"}
                defaultValue={0}
                type="number"
                error={errors.logo}
                {...register("price")}
              /> */}
            </div>
          </FormSection>
          <Button
            type={"submit"}
            title={"Dodaj zlecenie"}
            onClick={() => console.log("click")}
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
              error={errors.logo}
              {...register("startDate")}
            />
            <Input
              id={"deadline"}
              placeholder={"Data oddania"}
              label={"Data oddania"}
              type="date"
              error={errors.logo}
              {...register("deadline")}
            />
            <Input
              id={"attachment"}
              placeholder={"Dodaj załączniki"}
              label={"Dodaj załączniki"}
              type="file"
              error={errors.logo}
              {...register("attachment")}
            />
            {/* <Select
              label={"Przyjął"}
              options={production}
              id={"przyjął"}
              name={"przyjął"}
            />
            <Input
              id={"date-admission"}
              placeholder={"Data przyjęcia"}
              label={"Data przyjęcia"}
              value={new Date().toISOString().slice(0, 10)}
              type="date"
              error={errors.logo}
              {...register("dateAdmission")}
            />
            <Input
              id={"deadline"}
              placeholder={"Data oddania"}
              label={"Data oddania"}
              type="date"
              error={errors.logo}
              {...register("deadline")}
            /> */}
          </div>
        </div>
      </div>
    </form>
  );
};

export default Tasks;

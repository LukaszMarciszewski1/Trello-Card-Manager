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

  const trelloListUrl = `https://api.trello.com/1/cards?idList=${process.env.REACT_APP_TRELLO_LIST}&key=${process.env.REACT_APP_TRELLO_KEY}&token=${process.env.REACT_APP_TRELLO_TOKEN}`;
  const cardUrlOptions = (id: string, props: string) => {
    return `https://api.trello.com/1/cards/${id}/${props}?key=${process.env.REACT_APP_TRELLO_KEY}&token=${process.env.REACT_APP_TRELLO_TOKEN}`;
  };

  // const trelloCardUrl = `https://api.trello.com/1/cards/${activeCardId}/checklists?key=${process.env.REACT_APP_TRELLO_KEY}&token=${process.env.REACT_APP_TRELLO_TOKEN}`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Task>();

  const cardId = "6387d0017de8b80591bef2dc";

  //   const params = {
  //     param1: 'value1',
  //     param2: 'value2'
  // };
  // const options = {
  //     method: 'POST',
  //     body: JSON.stringify( params )
  // };
  // fetch( 'https://domain.com/path/', options )
  //     .then( response => response.json() )
  //     .then( response => {
  //     } );

  // const fetchData = async (data: any) => {
  //   fetch(`${trelloListUrl}&name=${data}`, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       console.log(`Response: ${response.status} ${response.statusText}`);
  //       console.log(response)
  //       return response.text();
  //     })
  //     .then((text) => {
  //       setCardOptions('checklists')
  //       fetch(`https://api.trello.com/1/cards/${JSON.parse(text).id}?key=${process.env.REACT_APP_TRELLO_KEY}&token=${process.env.REACT_APP_TRELLO_TOKEN}`, {
  //         method: "POST",
  //         headers: {
  //           Accept: "application/json",
  //         },
  //       })
  //     })
  //     .then((text) => console.log(text))
  //     .catch((err) => console.error(err));
  // };

  // query = {
  //   # API credentials
  //   'key': KEY,
  //   'token': TOKEN,
  //   # List to create our card on
  //   'idList': NEW_APPLICATIONS_LIST_ID,
  //   # Set the card name to be the applicant's name
  //   'name': name,
  //   # Position the new card at the bottom of the list.
  //   'pos': 'bottom',
  //   # Add a description to the card containing the email, phone and cover letter
  //   'desc': f''' Email: {email} Phone: {phone} Cover letter: {cover_letter} '''
  //  }

  //  response = requests.request(
  //   'POST',
  //   url,
  //   params=query
  //  )

  const bodyData = `{
    "idModel": "5abbe4b7ddc1b351ef961414",
    "modelType": "card",
    "name": "<string>",
    "type": "checkbox",
    "options": "<string>",
    "pos": "top",
    "display_cardFront": true
  }`;


  const fetchData = (data: Task) => {
    const { title, logo, dateAdmission, deadline } = data
    const nwDate = {
      "start": "2022-02-01T21:00:00.000Z",
      "due": "2023-01-02T08:56:00.000Z"
    }
    console.log(data)
    fetch(`${trelloListUrl}&name=${title}&desc=**${logo}**&start=${dateAdmission}&due=${deadline}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        return response.text();
      })
      .then((text) => {
        console.log(JSON.parse(text))
        fetch(
          `https://api.trello.com/1/cards/${JSON.parse(text).id}/checklists?key=${process.env.REACT_APP_TRELLO_KEY}&token=${process.env.REACT_APP_TRELLO_TOKEN}`,
          {
            method: 'POST',
            headers: {
              Accept: "application/json",
            },
          }
        );
      })
      .then((text) => console.log(text))
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
                  value={trader.initial}
                  label={trader.initial}
                  {...register("traders")}
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
              {...register("dateAdmission")}
            />
            <Input
              id={"deadline"}
              placeholder={"Data oddania"}
              label={"Data oddania"}
              type="date"
              error={errors.logo}
              {...register("deadline")}
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

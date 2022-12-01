import React, { useState } from "react";
import styles from "./styles.module.scss";
import { useForm, Controller } from "react-hook-form";
import Input from "components/Input/Input";
import { Task } from "models/task";
import Button from "components/Button/Button";
import { RiAddLine } from "react-icons/ri";
import Checkbox from "components/Checkbox/Checkbox";
import { traders } from "data";

const validation = {
  title: {
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
  const [activeCardId, setActiveCardId] = useState<null | string>(null)
  const [cardOptions, setCardOptions] = useState<null | any>(null)

  const trelloListUrl = `https://api.trello.com/1/cards?idList=${process.env.REACT_APP_TRELLO_LIST}&key=${process.env.REACT_APP_TRELLO_KEY}&token=${process.env.REACT_APP_TRELLO_TOKEN}`;
  const cardUrlOptions = (id: string, props: string) => {
    return `https://api.trello.com/1/cards/${id}/${props}?key=${process.env.REACT_APP_TRELLO_KEY}&token=${process.env.REACT_APP_TRELLO_TOKEN}`;
  }

  // const trelloCardUrl = `https://api.trello.com/1/cards/${activeCardId}/checklists?key=${process.env.REACT_APP_TRELLO_KEY}&token=${process.env.REACT_APP_TRELLO_TOKEN}`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Task>();

  const cardId = '6387d0017de8b80591bef2dc'

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

  const query = {
    'key': process.env.REACT_APP_TRELLO_KEY,
    'token': process.env.REACT_APP_TRELLO_TOKEN
  }

  const fetchData = async (data: any) => {
    fetch(`${trelloListUrl}&name=${data}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        console.log(response)
        return response.text();
      })
      .then((text) => {
        setCardOptions('checklists')
        fetch(`https://api.trello.com/1/cards/${JSON.parse(text).id}/checklists`, {
          method: "POST",
          body: JSON.stringify(query),
          headers: {
            Accept: "application/json",
          },
        })
      })
      .then((text) => console.log(text))
      .catch((err) => console.error(err));
  };

  const handleSubmitForm = (data: Task) => {
    // const { title, selector } = data;
    // fetchData(title);
    console.log(data)
  };

  console.log(traders)
  function onSubmitButton(data: any) {
    console.log(data)
  }

  return (
    <div className={styles.addTasks}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className={styles.formContainer}>
          <div className={styles.formGroupContainer}>
            <div className={styles.inputContainer}>
              <label htmlFor="title"><h3>Kontrachent</h3></label>
              <Input
                id={"title"}
                placeholder={"Kontrahent"}
                label={"Kontrachent"}
                type="text"
                error={errors.title}
                {...register("title", { ...validation.title })}
              />
              {titleErrors(errors.title?.type)}
            </div>
            <div className={styles.checkboxContainer}>
              {traders?.map((trader, index) => (
                <Checkbox
                  key={index}
                  id={trader.initial}
                  type={"radio"}
                  name={"traders"}
                  value={trader.initial}
                  label={trader.initial}
                  register={register}
                />
              ))}
            </div>
          </div>
          <Button
            type={'submit'}
            title={"Dodaj zlecenie"}
            onClick={() => console.log("click")}
            style={{ fontSize: '1.2rem' }}
            icon={<RiAddLine fontSize={'1.5rem'} fontWeight={'bold'} />}
          />
        </div>
        <div className={`${styles.formContainer} ${styles.rightPanel}`}>
        </div>
      </form>
    </div>
  );
};

export default Tasks;

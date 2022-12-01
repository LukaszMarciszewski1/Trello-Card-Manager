import React from 'react'
import styles from './styles.module.scss'
import { Task } from 'models/task'
import { useForm } from "react-hook-form";

import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import { RiAddLine } from 'react-icons/ri';

const validation = {
  title: {
    required: true,
    maxLength: 40,
    minLength: 2,
  },
};

interface FormProps {
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

const Form: React.FC<FormProps> = ({ title, handleSubmitForm }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Task>();

  // const handleSubmitForm = (data: Task) => {
  //   console.log(data)
  // }

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <div className={styles.formContainer}>
        <div className={styles.formGroup}>
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
        {/* <Button
          title={"Dodaj zlecenie"}
          onClick={() => console.log("click")}
          style={{ fontSize: '1.2rem' }}
          icon={<RiAddLine fontSize={'1.5rem'} fontWeight={'bold'} />}
        /> */}
      </div>
    </form>
  )
}

export default Form
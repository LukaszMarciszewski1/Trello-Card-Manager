import { useContext, useState } from 'react';

import styles from './styles.module.scss'
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { User } from 'models/user'
import { AuthContext } from 'context/authContext'

import Input from 'components/common/Input/Input'
import Button from 'components/common/Button/Button';
import bgCircles from 'assets/img/bg-circles.svg'


const Login: React.FC = () => {
  const { signIn } = useContext(AuthContext)
  const navigate = useNavigate()
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const handleSubmitForm = async (data: any) => {
    setError(false)
    try {
      const userCredential = await signIn(data.email, data.password)
      if (userCredential) {
        navigate('/home')
      }
    } catch (err) {
      setError(true)
      console.log(err)
    }
  }

  return (
    <div className={styles.auth} style={{ backgroundImage: `url(${bgCircles})` }}>
      <div className={styles.formContainer}>
        {/* {loading ? <Loading /> : null} */}
        <form className={styles.form} onSubmit={handleSubmit(handleSubmitForm)}>
          <h1>Zaloguj się</h1>
          <Input
            id={'email'}
            placeholder={'email'}
            label={'Email'}
            type="text"
            {...register("email", { required: true })}
          />
          {errors.email && <div>'Email jest wymagany'</div>}
          <Input
            id={'password'}
            placeholder={'password'}
            label={'Hasło'}
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && <div>'Hasło jest wymagane'</div>}
          <Button type='submit' title='Zaloguj' style={{ marginTop: 40 }} />
        </form>
        {/* <div className={styles.rightPanel}></div> */}
      </div>
      {/* <div className={styles.right} style={{ backgroundImage: `url(${bgCircles})` }}></div> */}
    </div>
  )
}

export default Login
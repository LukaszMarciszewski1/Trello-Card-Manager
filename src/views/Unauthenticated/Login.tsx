import { useContext } from 'react';
import styles from './styles.module.scss'
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { User } from 'models/user'
import { AuthContext } from 'context/authContext'

import Input from 'components/common/Input/Input'
import Button from 'components/common/Button/Button';
import bgLogin from 'assets/img/bg-login.svg'
import bgLoginHeader from 'assets/img/bg-login-header.svg'
import { HiOutlineUser } from "react-icons/hi"

const Login: React.FC = () => {
  const { signIn } = useContext(AuthContext)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const handleSubmitForm = async (data: any) => {
    try {
      const userCredential = await signIn(data.email, data.password)
      if (userCredential) {
        navigate('/home')
      }
    } catch (err) {
      alert('Nieprawidłowy email lub hasło')
      console.log(err)
    }
  }

  return (
    <div className={styles.loginContainer} style={{ backgroundImage: `url(${bgLogin})` }}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader} style={{ backgroundImage: `url(${bgLogin})` }}>
          <h1>Trello Card Manager</h1>
        </div>
        <div className={styles.icon}>
          <HiOutlineUser fontSize='5rem' />
        </div>
        <form className={styles.form} onSubmit={handleSubmit(handleSubmitForm)}>
          <h2>Zaloguj się</h2>
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
      </div>
    </div>
  )
}

export default Login
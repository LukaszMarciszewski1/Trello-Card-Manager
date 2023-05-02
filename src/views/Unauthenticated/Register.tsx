import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { RegisterUser } from 'models/user';

import AuthLayout from 'layouts/AuthLayout/AuthLayout';
import Input from 'components/common/Input/Input';
import Button from 'components/common/Button/Button';
import { useAuth } from 'hooks/useAuth';

const Register: React.FC = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUser>();

  const handleSubmitForm = async (data: RegisterUser) => {
    const { username, email, password } = data;
    try {
      const result = await signUp(username, email, password);
      if (result) {
        navigate('/login', {
          state: {
            email,
            password,
          },
        });
      }
    } catch (err) {
      alert('Nieprawidłowy email lub hasło');
      console.log(err);
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <h2>Zarejestruj się</h2>
        <Input
          id={'username'}
          placeholder={'trello username'}
          label={'Trello username'}
          type='text'
          {...register('username', { required: true })}
        />
        {errors.email && <div>'Email jest wymagany'</div>}
        <Input
          id={'email'}
          placeholder={'email'}
          label={'Email'}
          type='text'
          {...register('email', { required: true })}
        />
        {errors.email && <div>'Email jest wymagany'</div>}
        <Input
          id={'password'}
          placeholder={'password'}
          label={'Hasło'}
          type='password'
          {...register('password', { required: true })}
        />
        {errors.password && <div>'Hasło jest wymagane'</div>}
        <Button type='submit' title='Zarejestruj się' style={{ marginTop: 40 }} />
        <div>
          <span>Masz już konto?</span>
          <Link to={'/login'}>Zaloguj się</Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;

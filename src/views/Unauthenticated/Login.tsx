import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { User } from 'models/user';

import AuthLayout from 'layouts/AuthLayout/AuthLayout';
import Input from 'components/common/Input/Input';
import Button from 'components/common/Button/Button';
import { useAuth } from 'hooks/useAuth';

const Login: React.FC = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>();

  const handleSubmitForm = async (data: User) => {
    const { email, password } = data;
    try {
      await signIn(email, password);
      navigate('/');
      reset();
    } catch (err) {
      alert('Nieprawidłowy email lub hasło');
      console.log(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, []);

  return (
    <AuthLayout>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <h2>Zaloguj się</h2>
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
          <Button type='submit' title='Zaloguj' style={{ marginTop: 40 }} />
        </form>
      </AuthLayout>
  );
};

export default Login;

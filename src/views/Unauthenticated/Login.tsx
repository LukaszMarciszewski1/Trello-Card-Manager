import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoginUser } from 'models/user';

import AuthLayout from 'layouts/AuthLayout/AuthLayout';
import Input from 'components/common/Input/Input';
import Button from 'components/common/Button/Button';
import { useAuth } from 'hooks/useAuth';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginUser>();

  useEffect(() => {
    if (location.state) {
      setValue('email', location.state.email);
      setValue('password', location.state.password);
    }
  }, [location.state, setValue]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmitForm = async (data: LoginUser) => {
    const { email, password } = data;
    try {
      await signIn(email, password).then(() => navigate('/'));
    } catch (err) {
      alert('Nieprawidłowy email lub hasło');
      console.log(err);
    }
  };

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
        <Button type='submit' title='Zaloguj się' style={{ marginTop: 40 }} />
        <div>
          <span>Nie masz konta?</span>
          <Link to={'/register'}>Zarejestruj się</Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;

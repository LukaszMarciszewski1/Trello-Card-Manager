import axios from 'axios';
import {
  RegisterUser,
  LoginUser,
  DisplayUser,
} from 'models/user';

const register = async (newUser: RegisterUser): Promise<DisplayUser | null> => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_API}/auth/register`,
    newUser,
  );
  return response.data;
};

const login = async (user: LoginUser): Promise<{ token: string } | null> => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_API}/auth/login`,
    user,
  );
  return response.data;
};

const authApi = {
  register,
  login,
};

export default authApi;

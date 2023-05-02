import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { RegisterUser, LoginUser, DisplayUser, DecodedJwt, Jwt } from 'models/user';

const register = async (
  newUser: RegisterUser,
): Promise<DisplayUser | null> => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_API}/auth/register`,
    newUser,
  );

  return response.data;
};

const login = async (user: LoginUser): Promise<{ jwt: Jwt; user: DisplayUser | null } | null> => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_API}/auth/login`,
    user,
  );
//console.log(response.data)
  if(response.data) {
    const { token } = response.data;
    localStorage.setItem('jwt', token);

    const decodedJwt: DecodedJwt = jwt_decode(token);
    localStorage.setItem('user', JSON.stringify(decodedJwt.user));
    return { jwt: response.data, user: decodedJwt.user };
  }

  return null;
};


const logout = (): void => {
  localStorage.removeItem('user');
  localStorage.removeItem('jwt');
}

const authService = {
  register,
  login,
  logout,
};

export default authService;

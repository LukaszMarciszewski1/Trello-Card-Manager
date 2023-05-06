import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {
  RegisterUser,
  LoginUser,
  DisplayUser,
  DecodedJwt,
} from 'models/user';

const getAllUsers = async (): Promise<DisplayUser[]> => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_API}/user`);
  return response.data;
};

const getUser = async (id: string): Promise<DisplayUser> => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_API}/user/${id}`,
  );
  return response.data;
};

const updateUser = async (id: string, body: string): Promise<DisplayUser> => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BASE_API}/user/${id}`,
    { role: body },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return response.data;
};

const userService = {
  getAllUsers,
  getUser,
  updateUser,
};

export default userService;

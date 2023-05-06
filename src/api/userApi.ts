import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {
  RegisterUser,
  LoginUser,
  DisplayUser,
  DecodedJwt,
  Jwt,
} from 'models/user';

const getAllUsers = async (): Promise<DisplayUser[]> => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_API}/user`);
    return response.data
};

const userService = {
  getAllUsers,
};

export default userService;

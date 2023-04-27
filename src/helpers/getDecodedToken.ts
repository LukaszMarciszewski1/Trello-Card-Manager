import jwt_decode from 'jwt-decode';

export const getDecodedToken = (token: string) => {
  try {
    const decodedToken: { [key: string]: any } = jwt_decode(token);
    return decodedToken ? decodedToken : null;
  } catch {
    return null;
  }
};

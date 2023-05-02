export interface NewUser {
  id: string;
  username: string;
  email: string;
  role: string
}

export interface RegisterUser {
  username: string;
  email: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface DisplayUser {
  id: string;
  username: string;
  email: string;
  role: string
}

export interface DecodedJwt {
  user: DisplayUser;
  exp: number;
  iat: number;
}

export type Jwt = string | null;
import { apiRequestConfig, sendRequest } from "@/shared/lib/sendRequest";

type Request = {
  email: string;
  password: string;
  username: string;
};

type UserDto = {
  email: string;
  username: string;
  id: string;
};

type Response = {
  user: UserDto;
  refreshToken: string;
  accessToken: string;
};

export const signup = (body: Request): Promise<Response> => {
  const params: apiRequestConfig = {
    endpoint: "register",
    method: "POST",
    body,
  };

  return sendRequest(params);
};

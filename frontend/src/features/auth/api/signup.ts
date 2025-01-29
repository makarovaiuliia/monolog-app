import { apiRequestConfig, sendRequest } from "@/shared/lib/sendRequest";
import { AuthResponse } from "@/shared/types/authResponse";

type Request = {
  email: string;
  password: string;
  username: string;
};

export const signup = (body: Request): Promise<AuthResponse> => {
  const params: apiRequestConfig = {
    endpoint: "register",
    method: "POST",
    body,
  };

  return sendRequest(params);
};

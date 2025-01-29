import { apiRequestConfig, sendRequest } from "@/shared/lib/sendRequest";
import { AuthResponse } from "@/shared/types/authResponse";

type Request = {
  email: string;
  password: string;
};

export const login = async (body: Request): Promise<AuthResponse> => {
  const params: apiRequestConfig = {
    endpoint: "login",
    method: "POST",
    body,
  };

  return sendRequest(params);
};

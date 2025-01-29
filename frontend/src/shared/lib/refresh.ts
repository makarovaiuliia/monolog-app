import { AuthResponse } from "../types/authResponse";
import { apiRequestConfig, sendRequest } from "./sendRequest";

export const refresh = (): Promise<AuthResponse> => {
  const params: apiRequestConfig = {
    endpoint: `refresh`,
    method: "GET",
  };

  return sendRequest(params);
};

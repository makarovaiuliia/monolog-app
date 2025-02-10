import { apiRequestConfig, sendRequest } from "@/shared/lib/sendRequest";
import { AuthResponse } from "@/shared/types/authResponse";

export const logout = async (accessToken: string): Promise<AuthResponse> => {
  const params: apiRequestConfig = {
    endpoint: "logout",
    method: "POST",
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  };

  return sendRequest(params);
};

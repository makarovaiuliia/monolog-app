import { apiRequestConfig, sendRequest } from "@/shared/lib/sendRequest";

export const logout = async (accessToken: string): Promise<void> => {
  const params: apiRequestConfig = {
    endpoint: "logout",
    method: "POST",
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  };

  return sendRequest(params);
};

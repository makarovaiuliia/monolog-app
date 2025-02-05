import { apiRequestConfig, sendRequest } from "@/shared/lib/sendRequest";
import { IEntry } from "@/shared/types/entry";

export const fetchListApi = async (
  userId: string,
  accessToken: string
): Promise<IEntry[]> => {
  const params: apiRequestConfig = {
    endpoint: `${userId}/entries`,
    method: "GET",
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  };

  return sendRequest(params);
};

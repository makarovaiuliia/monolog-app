import { apiRequestConfig, sendRequest } from "@/shared/lib/sendRequest";
import { IEntry } from "@/shared/types/entry";

export const addEntryApi = async (
  userId: string,
  accessToken: string,
  body: Partial<IEntry>
): Promise<IEntry[]> => {
  const params: apiRequestConfig = {
    endpoint: `${userId}/entries`,
    method: "POST",
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    body,
  };

  return sendRequest(params);
};

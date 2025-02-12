import { apiRequestConfig, sendRequest } from "@/shared/lib/sendRequest";
import { IEntry } from "@/shared/types/entry";
import { Response } from "@/shared/types/serverResponse";

export const deleteEntry = async (
  entryId: string
): Promise<Response<IEntry>> => {
  const params: apiRequestConfig = {
    endpoint: `delete/${entryId}`,
    method: "POST",
  };

  return sendRequest(params);
};

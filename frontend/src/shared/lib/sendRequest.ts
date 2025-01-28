export interface apiRequestConfig {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body: any;
  headers?: Record<string, string>;
}

const API_LINK = process.env.API_LINK;

export const sendRequest = async <T>({
  endpoint,
  method,
  body,
  headers,
}: apiRequestConfig): Promise<T> => {
  try {
    const response = await fetch(`${API_LINK}/${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    return response.json();
  } catch (error: any) {
    throw error.message;
  }
};

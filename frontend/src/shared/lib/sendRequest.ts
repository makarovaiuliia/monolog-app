export interface apiRequestConfig {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: Record<string, string>;
}

const API_LINK = process.env.NEXT_PUBLIC_API_LINK;

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
      credentials: "include",
    });

    if (!response.ok) {
      const errorResponse = await response.json().catch(() => null);
      const errorMessage =
        errorResponse?.message || `HTTP error! Status: ${response.status}`;
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error: any) {
    throw error instanceof Error ? error : new Error(String(error));
  }
};

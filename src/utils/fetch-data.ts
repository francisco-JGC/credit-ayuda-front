import Cookies from "js-cookie";

interface FetchDataParams<T> {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: T;
  useToken?: boolean;
}

export interface IHandleResponse<T = unknown> {
  message?: string;
  data?: T;
  success: boolean;
}

export interface IPagination {
  filter?: string;
  page: number;
  limit: number;
}

export async function fetchData<TData = any>({
  url,
  method,
  data,
  useToken = false,
}: FetchDataParams<TData>): Promise<IHandleResponse> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (useToken) {
    const token = Cookies.get("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    } else {
      throw new Error("Token no encontrado");
    }
  }

  const options: RequestInit = {
    method,
    headers,
  };

  if (method !== "GET" && data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}${url}`,
      options
    );

    return await response.json();
  } catch (error: any) {
    console.error("Error en la solicitud:", error.message);
    throw error;
  }
}

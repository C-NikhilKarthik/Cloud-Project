import axios, { Method } from "axios";
import { cookies } from "next/headers";
import { ApiResponse } from "@/lib/types";

// Generic function to handle server-side API requests
export async function serverFetch<T>(
  method: Method,
  route: string,
  data?: any
): Promise<T | null> {
  const cookieStore = cookies();
  const token = cookieStore.get("jwt")?.value;

  try {
    const response = await axios.request<ApiResponse<T>>({
      url: `${process.env.NEXT_PUBLIC_APP_URL}/api/${route}`,
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data ? data : undefined,
    });

    if (response.data.status === "success" && response.data.data) {
      return response.data.data;
    } else {
      console.error(`Failed to fetch data from ${route}.`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching data from ${route}:`, error);
    return null;
  }
}

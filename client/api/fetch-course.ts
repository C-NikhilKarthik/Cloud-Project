import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { ApiResponse } from "@/lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.cookies.jwt;

  try {
    const response = await axios.get<ApiResponse<any>>(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/courses`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res
      .status(500)
      .json({ status: "fail", message: "Failed to fetch courses" });
  }
}

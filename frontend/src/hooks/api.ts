import axios from "axios";
import { Post, ApiResponse, PostFormData } from "../types";

const api = axios.create({
  baseURL: "/posts",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

export const postService = {
  getAll: async (): Promise<Post[]> => {
    const { data } = await api.get<ApiResponse<Post[]>>("/");
    return data.data ?? [];
  },

  create: async (payload: PostFormData): Promise<Post> => {
    const { data } = await api.post<ApiResponse<Post>>("/", payload);
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/${id}`);
  },
};

export interface Post {
  _id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  count?: number;
}

export interface PostFormData {
  title: string;
  body: string;
}

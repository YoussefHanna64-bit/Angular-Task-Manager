export interface User {
  _id?: string;
  userName: string;
  email: string;
  role?: 'user' | 'admin';
}

export interface UserResponse {
  success: boolean;
  message?: string;
  user?: User;
  token: string;
}

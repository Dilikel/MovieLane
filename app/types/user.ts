export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

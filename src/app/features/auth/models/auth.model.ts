import { UserRole } from '@Core/config/role.config';

export interface Token {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}

export interface UserDto {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: Token;
  user: UserDto;
}

export interface LoginPayload {
  email: string;
  password: string;
  role?: UserRole;
}

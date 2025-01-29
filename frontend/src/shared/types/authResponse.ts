import { UserDto } from "./userDto";

export type AuthResponse = {
  user: UserDto;
  refreshToken: string;
  accessToken: string;
};

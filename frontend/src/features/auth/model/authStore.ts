import { makeAutoObservable } from "mobx";
import { refresh } from "@/shared/lib/refresh";
import { UserDto } from "@/shared/types/userDto";

class AuthStore {
  user: UserDto | null = null;
  accessToken: string | null = null;
  loading: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user: UserDto | null) {
    this.user = user;
  }

  setAccessToken(token: string | null) {
    this.accessToken = token;
  }

  async refreshToken() {
    try {
      const { accessToken, user } = await refresh();
      this.setAccessToken(accessToken);
      this.setUser(user);
    } catch (error) {
      console.error("Failed to refresh token:", error);
      this.setUser(null);
      this.setAccessToken(null);
    } finally {
      this.loading = false;
    }
  }

  logout() {
    this.setUser(null);
    this.setAccessToken(null);
  }
}

export const authStore = new AuthStore();

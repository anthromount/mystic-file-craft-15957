import { systemUsers } from './mockData';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

class AuthService {
  private readonly AUTH_KEY = 'fishdss_auth_user';

  login(email: string): AuthUser | null {
    // Authenticate by email only against mock system users
    const systemUser = systemUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (systemUser) {
      const user: AuthUser = {
        id: systemUser.id,
        email: systemUser.email,
        name: systemUser.name,
        role: systemUser.role
      };
      localStorage.setItem(this.AUTH_KEY, JSON.stringify(user));
      return user;
    }
    return null;
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
  }

  getCurrentUser(): AuthUser | null {
    const userJson = localStorage.getItem(this.AUTH_KEY);
    if (!userJson) return null;
    
    try {
      return JSON.parse(userJson);
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
}

export const authService = new AuthService();

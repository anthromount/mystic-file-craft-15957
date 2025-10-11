export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

class AuthService {
  private readonly AUTH_KEY = 'fishdss_auth_user';

  login(email: string, password: string): AuthUser | null {
    // Simple authentication check - in a real app, this would call an API
    // For demo purposes, accept any email with password "password"
    if (password === 'password') {
      const user: AuthUser = {
        id: `user_${Date.now()}`,
        email,
        name: email.split('@')[0],
        role: 'Researcher'
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

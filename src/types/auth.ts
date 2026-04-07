export interface User {
    id: string;
    email:string;
    username?: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isLoggedIn: boolean;
    hasHydrated: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface LoginResponse {
    token: string;
    user: User;
}
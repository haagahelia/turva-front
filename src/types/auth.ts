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
    isOnboardingComplete: boolean;

    // Actions
    login: (token: string, user: User) => void;
    logout: () => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    setHasHydrated: (value: boolean) => void;
    completeOnboarding: () => void;
}

export interface LoginResponse {
    token: string;
    user: User;
}
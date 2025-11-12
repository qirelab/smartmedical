export interface AuthModalsProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin?: (credentials: LoginData) => void;
    onRegister?: (userData: RegisterData) => void;
    onForgotPassword?: (email: string) => void;
    error?: string | null;
    isLoading?: boolean;
    onErrorClear?: () => void;
  };
  
export interface LoginData {
    login: string;
    password: string;
    rememberMe: boolean;
  };
  
export interface RegisterData {
    lastName: string;
    firstName: string;
    middleName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    login: string;
    captcha: string;
    agreeToTerms: boolean;
  };
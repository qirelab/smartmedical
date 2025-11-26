import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../common/SMDialog/SMDialog";
import { Button } from "../common/SMButton/SMButton";
import { Input } from "../common/SMInput/SMInput";
import { Label } from "../common/SMLabel/SMLabel";
import { Checkbox } from "../common/SMCheckBox/SMCheckBox";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  Lock,
  Shield,
  ArrowRight,
  LogIn,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { LoginData, RegisterData, AuthModalsProps } from "../SMAuthModals/SMAuthModals.styles";
import {
  validatePassword,
  validateNamePart,
  validateLogin,
  validateEmail,
  validatePhone,
  capitalizeName,
} from "@/utils/validation";

type ModalType = "login" | "register" | "forgot-password";

export function AuthModals({
  isOpen,
  onClose,
  onLogin,
  onRegister,
  onForgotPassword,
  isLoading = false,
}: AuthModalsProps) {
  const [modalType, setModalType] =
    useState<ModalType>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loginData, setLoginData] = useState<LoginData>({
    login: "",
    password: "",
    rememberMe: false,
  });

  const [registerData, setRegisterData] =
    useState<RegisterData>({
      lastName: "",
      firstName: "",
      middleName: "",
      email: "",
      phone: "+375",
      password: "",
      confirmPassword: "",
      login: "",
      agreeToTerms: false,
    });

  const [forgotEmail, setForgotEmail] = useState("");

  // Validation errors state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [checking, setChecking] = useState<Record<string, boolean>>({});
  const [valid, setValid] = useState<Record<string, boolean>>({});

  // Debounced uniqueness check
  const checkUniqueness = useCallback(async (field: 'login' | 'phone' | 'email', value: string) => {
    if (!value || value.length < 3) return;

    setChecking(prev => ({ ...prev, [field]: true }));
    try {
      const response = await fetch(`/api/auth/check-unique?${field}=${encodeURIComponent(value)}`);
      const data = await response.json();

      if (!data.isUnique) {
        setErrors(prev => ({ ...prev, [field]: data.message }));
        setValid(prev => ({ ...prev, [field]: false }));
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
        setValid(prev => ({ ...prev, [field]: true }));
      }
    } catch (error) {
      console.error('Uniqueness check error:', error);
    } finally {
      setChecking(prev => ({ ...prev, [field]: false }));
    }
  }, []);

  // Validate field on blur
  const validateField = useCallback((field: string, value: string) => {
    let result;
    switch (field) {
      case 'firstName':
        result = validateNamePart(value, 'Имя');
        break;
      case 'lastName':
        result = validateNamePart(value, 'Фамилия');
        break;
      case 'middleName':
        if (!value || !value.trim()) {
          result = { isValid: true };
        } else {
          result = validateNamePart(value, 'Отчество');
        }
        break;
      case 'login':
        result = validateLogin(value);
        // Also check uniqueness if format is valid
        if (result.isValid && value.length >= 3) {
          checkUniqueness('login', value);
        }
        break;
      case 'email':
        result = validateEmail(value);
        // Also check uniqueness if format is valid
        if (result.isValid) {
          checkUniqueness('email', value);
        }
        break;
      case 'phone':
        result = validatePhone(value);
        // Also check uniqueness if format is valid
        if (result.isValid) {
          const digits = value.replace(/\D/g, '');
          if (digits.length === 12) {
            checkUniqueness('phone', value);
          }
        }
        break;
      case 'password':
        result = validatePassword(value);
        break;
      case 'confirmPassword':
        if (value !== registerData.password) {
          result = { isValid: false, error: 'Пароли не совпадают' };
        } else {
          result = { isValid: true };
        }
        break;
      default:
        result = { isValid: true };
    }

    if (!result.isValid) {
      setErrors(prev => ({ ...prev, [field]: result.error || 'Ошибка валидации' }));
      setValid(prev => ({ ...prev, [field]: false }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
      setValid(prev => ({ ...prev, [field]: true }));
    }

    return result.isValid;
  }, [registerData.password, checkUniqueness]);

  // Check uniqueness with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (registerData.login && registerData.login.length >= 3) {
        const loginValid = validateLogin(registerData.login);
        if (loginValid.isValid) {
          checkUniqueness('login', registerData.login);
        }
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [registerData.login, checkUniqueness]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (registerData.email && registerData.email.includes('@')) {
        const emailValid = validateEmail(registerData.email);
        if (emailValid.isValid) {
          checkUniqueness('email', registerData.email);
        }
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [registerData.email, checkUniqueness]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const digits = registerData.phone.replace(/\D/g, '');
      if (digits.length === 12) {
        checkUniqueness('phone', registerData.phone);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [registerData.phone, checkUniqueness]);

  // Форматирование белорусского номера телефона
  const formatPhoneNumber = (value: string): string => {
    // Удаляем все кроме цифр
    const digits = value.replace(/\D/g, '');

    // Убираем префикс 375 если он есть в начале
    let phoneDigits = digits;
    if (digits.startsWith('375')) {
      phoneDigits = digits.slice(3);
    }

    // Ограничиваем до 9 цифр (XX XXX XX XX)
    phoneDigits = phoneDigits.slice(0, 9);

    // Форматируем
    let formatted = '+375';
    if (phoneDigits.length > 0) {
      formatted += '(' + phoneDigits.slice(0, 2);
    }
    if (phoneDigits.length >= 2) {
      formatted += ')';
    }
    if (phoneDigits.length > 2) {
      formatted += phoneDigits.slice(2, 5);
    }
    if (phoneDigits.length > 5) {
      formatted += '-' + phoneDigits.slice(5, 7);
    }
    if (phoneDigits.length > 7) {
      formatted += '-' + phoneDigits.slice(7, 9);
    }

    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setRegisterData({
      ...registerData,
      phone: formatted,
    });
  };

  const handleSubmit = () => {
    if (modalType === "login" && onLogin) {
      onLogin(loginData);
    } else if (modalType === "register" && onRegister) {
      onRegister(registerData);
    } else if (
      modalType === "forgot-password" &&
      onForgotPassword
    ) {
      onForgotPassword(forgotEmail);
    }
    // Modal closing is handled by parent component after API response
  };

  const resetForms = () => {
    setLoginData({
      login: "",
      password: "",
      rememberMe: false,
    });
    setRegisterData({
      lastName: "",
      firstName: "",
      middleName: "",
      email: "",
      phone: "+375",
      password: "",
      confirmPassword: "",
      login: "",
      agreeToTerms: false,
    });
    setForgotEmail("");
    setErrors({});
    setChecking({});
    setValid({});
  };

  // Field error display component
  const FieldError = ({ field }: { field: string }) => {
    if (!errors[field]) return null;
    return (
      <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
        <AlertCircle className="w-3 h-3" />
        <span>{errors[field]}</span>
      </div>
    );
  };

  // Field status indicator (checking/valid)
  const FieldStatus = ({ field }: { field: string }) => {
    if (checking[field]) {
      return <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 animate-spin" />;
    }
    if (valid[field] && !errors[field]) {
      return <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />;
    }
    if (errors[field]) {
      return <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />;
    }
    return null;
  };

  const handleModalChange = (type: ModalType) => {
    setModalType(type);
    resetForms();
  };

  const renderLoginForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 200,
          }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-[#18A36C]/10 mb-4"
        >
          <User className="w-8 h-8 text-[#18A36C]" />
        </motion.div>
        <h3 className="text-xl text-[#2E2E2E] mb-2">
          С возвращением!
        </h3>
        <p className="text-gray-600">
          Войдите в свой личный кабинет
        </p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="login" className="text-[#2E2E2E]">
            Логин
          </Label>
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#18A36C] transition-colors" />
            <Input
              id="login"
              type="text"
              placeholder="Введите логин"
              value={loginData.login}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  login: e.target.value,
                })
              }
              className="pl-12 h-12 border-gray-300 focus:border-[#18A36C] transition-all duration-200 rounded-lg"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-[#2E2E2E]">
            Пароль
          </Label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#18A36C] transition-colors" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Введите пароль"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  password: e.target.value,
                })
              }
              className="pl-12 pr-12 h-12 border-gray-300 focus:border-[#18A36C] transition-all duration-200 rounded-lg"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#18A36C] transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Checkbox
            id="remember"
            checked={loginData.rememberMe}
            onCheckedChange={(checked) =>
              setLoginData({
                ...loginData,
                rememberMe: checked === true,
              })
            }
            className="border-gray-300 data-[state=checked]:bg-[#18A36C] data-[state=checked]:border-[#18A36C] data-[state=checked]:text-white"
          />
          <Label
            htmlFor="remember"
            className="text-[#2E2E2E]"
          >
            Запомнить меня
          </Label>
        </div>
      </div>

      <div className="space-y-4">
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full h-12 bg-[#18A36C] hover:bg-[#18A36C]/90 text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Вход..." : "Войти"}
          {!isLoading && <LogIn className="w-5 h-5 ml-[2.5px]" />}
        </Button>

        <div className="flex justify-between items-center text-sm">
          <button
            onClick={() => handleModalChange("forgot-password")}
            className="text-gray-600 hover:text-[#18A36C] underline underline-offset-2 transition-colors"
          >
            Забыли пароль?
          </button>
          <button
            onClick={() => handleModalChange("register")}
            className="text-gray-600 hover:text-[#18A36C] underline underline-offset-2 transition-colors"
          >
            Регистрация
          </button>
        </div>
      </div>

      <div className="text-center text-xs text-gray-600 mt-6 p-4 bg-[#F4F4F4] rounded-lg">
        <Shield className="w-4 h-4 inline mr-1" />
        Входя в личный кабинет, вы соглашаетесь с условиями использования сервиса
      </div>
    </motion.div>
  );

  const renderRegisterForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 200,
          }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-[#18A36C]/10 mb-4"
        >
          <User className="w-8 h-8 text-[#18A36C]" />
        </motion.div>
        <h3 className="text-xl text-[#2E2E2E] mb-2">
          Присоединяйтесь к нам!
        </h3>
        <p className="text-gray-600">
          Создайте личный кабинет для удобного доступа к услугам
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="lastName"
              className="text-[#2E2E2E]"
            >
              Фамилия <span className="text-gray-400 text-xs">(мин. 2 символа, без пробелов)</span>
            </Label>
            <div className="relative">
              <Input
                id="lastName"
                type="text"
                placeholder="Введите фамилию"
                value={registerData.lastName}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    lastName: capitalizeName(e.target.value),
                  })
                }
                onBlur={() => validateField('lastName', registerData.lastName)}
                className={`h-11 pr-10 border-gray-300 focus:border-[#18A36C] transition-all duration-200 rounded-lg ${errors.lastName ? 'border-red-500' : ''}`}
              />
              <FieldStatus field="lastName" />
            </div>
            <FieldError field="lastName" />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="firstName"
              className="text-[#2E2E2E]"
            >
              Имя <span className="text-gray-400 text-xs">(мин. 2 символа, без пробелов)</span>
            </Label>
            <div className="relative">
              <Input
                id="firstName"
                type="text"
                placeholder="Введите имя"
                value={registerData.firstName}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    firstName: capitalizeName(e.target.value),
                  })
                }
                onBlur={() => validateField('firstName', registerData.firstName)}
                className={`h-11 pr-10 border-gray-300 focus:border-[#18A36C] transition-all duration-200 rounded-lg ${errors.firstName ? 'border-red-500' : ''}`}
              />
              <FieldStatus field="firstName" />
            </div>
            <FieldError field="firstName" />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="middleName"
              className="text-[#2E2E2E]"
            >
              Отчество <span className="text-gray-400 text-xs">(необязательно)</span>
            </Label>
            <div className="relative">
              <Input
                id="middleName"
                type="text"
                placeholder="Введите отчество"
                value={registerData.middleName}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    middleName: e.target.value ? capitalizeName(e.target.value) : '',
                  })
                }
                onBlur={() => validateField('middleName', registerData.middleName)}
                className={`h-11 pr-10 border-gray-300 focus:border-[#18A36C] transition-all duration-200 rounded-lg ${errors.middleName ? 'border-red-500' : ''}`}
              />
              <FieldStatus field="middleName" />
            </div>
            <FieldError field="middleName" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="regEmail" className="text-[#2E2E2E]">
            Почта
          </Label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#18A36C] transition-colors z-10" />
            <Input
              id="regEmail"
              type="email"
              placeholder="Введите email"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  email: e.target.value,
                })
              }
              onBlur={() => validateField('email', registerData.email)}
              className={`pl-12 pr-10 h-11 border-gray-300 focus:border-[#18A36C] transition-all duration-200 rounded-lg ${errors.email ? 'border-red-500' : ''}`}
            />
            <FieldStatus field="email" />
          </div>
          <FieldError field="email" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="regPhone" className="text-[#2E2E2E]">
            Телефон
          </Label>
          <div className="relative group">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#18A36C] transition-colors z-10" />
            <Input
              id="regPhone"
              type="tel"
              placeholder="+375(29)123-45-67"
              value={registerData.phone}
              onChange={handlePhoneChange}
              onBlur={() => validateField('phone', registerData.phone)}
              className={`pl-12 pr-10 h-11 border-gray-300 focus:border-[#18A36C] transition-all duration-200 rounded-lg ${errors.phone ? 'border-red-500' : ''}`}
            />
            <FieldStatus field="phone" />
          </div>
          <FieldError field="phone" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="regLogin" className="text-[#2E2E2E]">
            Логин{" "}
            <span className="text-sm text-gray-400">
              (только латиница, цифры и _)
            </span>
          </Label>
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#18A36C] transition-colors z-10" />
            <Input
              id="regLogin"
              type="text"
              placeholder="Введите логин"
              value={registerData.login}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  login: e.target.value,
                })
              }
              onBlur={() => validateField('login', registerData.login)}
              className={`pl-12 pr-10 h-11 border-gray-300 focus:border-[#18A36C] transition-all duration-200 rounded-lg ${errors.login ? 'border-red-500' : ''}`}
            />
            <FieldStatus field="login" />
          </div>
          <FieldError field="login" />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="regPassword"
            className="text-[#2E2E2E]"
          >
            Пароль
          </Label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#18A36C] transition-colors z-10" />
            <Input
              id="regPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Введите пароль"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  password: e.target.value,
                })
              }
              onBlur={() => validateField('password', registerData.password)}
              className={`pl-12 pr-12 h-11 border-gray-300 focus:border-[#18A36C] transition-all duration-200 rounded-lg ${errors.password ? 'border-red-500' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#18A36C] transition-colors z-10"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          <FieldError field="password" />
          <div className="text-xs text-gray-500 space-y-0.5">
            <p className={registerData.password.length >= 4 ? 'text-green-600' : ''}>
              {registerData.password.length >= 4 ? '✓' : '○'} Минимум 4 символа
            </p>
            <p className={/[A-ZА-ЯЁ]/.test(registerData.password) ? 'text-green-600' : ''}>
              {/[A-ZА-ЯЁ]/.test(registerData.password) ? '✓' : '○'} Одна заглавная буква
            </p>
            <p className={/[!@#$%^&*()_+\-=\[\]{}|;':",.<>?\/\\`~]/.test(registerData.password) ? 'text-green-600' : ''}>
              {/[!@#$%^&*()_+\-=\[\]{}|;':",.<>?\/\\`~]/.test(registerData.password) ? '✓' : '○'} Один спецсимвол (!@#$%^&* и т.д.)
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="confirmPassword"
            className="text-[#2E2E2E]"
          >
            Подтверждение пароля
          </Label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#18A36C] transition-colors z-10" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Повторите пароль"
              value={registerData.confirmPassword}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  confirmPassword: e.target.value,
                })
              }
              onBlur={() => validateField('confirmPassword', registerData.confirmPassword)}
              className={`pl-12 pr-12 h-11 border-gray-300 focus:border-[#18A36C] transition-all duration-200 rounded-lg ${errors.confirmPassword ? 'border-red-500' : ''}`}
            />
            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#18A36C] transition-colors z-10"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          <FieldError field="confirmPassword" />
        </div>

        <div className="flex items-center space-x-3">
          <Checkbox
            id="terms"
            checked={registerData.agreeToTerms}
            onCheckedChange={(checked) =>
              setRegisterData({
                ...registerData,
                agreeToTerms: checked === true,
              })
            }
            className="border-gray-300 data-[state=checked]:bg-[#18A36C] data-[state=checked]:border-[#18A36C] data-[state=checked]:text-white"
          />
          <Label
            htmlFor="terms"
            className="text-sm text-[#2E2E2E]"
          >
            Я согласен на обработку персональных данных
          </Label>
        </div>
      </div>

      <div className="space-y-4">
        <Button
          onClick={handleSubmit}
          className="w-full h-12 bg-[#18A36C] hover:bg-[#18A36C]/90 text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={
            !registerData.agreeToTerms ||
            isLoading ||
            Object.keys(errors).length > 0 ||
            checking.login ||
            checking.email ||
            checking.phone
          }
        >
          {isLoading ? "Регистрация..." : "Зарегистрироваться"}
          {!isLoading && <ArrowRight className="w-5 h-5 ml-[2.5px]" />}
        </Button>

        <div className="text-center">
          <button
            onClick={() => handleModalChange("login")}
            className="text-gray-600 hover:text-[#18A36C] underline underline-offset-2 text-sm transition-colors"
          >
            Уже есть аккаунт? Войти
          </button>
        </div>
      </div>

      <div className="text-center text-xs text-gray-600 mt-6 p-4 bg-[#F4F4F4] rounded-lg">
        <Shield className="w-4 h-4 inline mr-1" />
        Регистрируясь, вы соглашаетесь с политикой конфиденциальности и условиями использования
      </div>
    </motion.div>
  );

  const renderForgotPasswordForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header section */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 200,
          }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-[#18A36C]/10 mb-4"
        >
          <Lock className="w-8 h-8 text-[#18A36C]" />
        </motion.div>
        <h3 className="text-xl text-[#2E2E2E] mb-2">
          Восстановление пароля
        </h3>
        <p className="text-gray-600">
          Введите email для получения ссылки
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="forgotEmail" className="text-[#2E2E2E]">
          Почта
        </Label>
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#18A36C] transition-colors" />
          <Input
            id="forgotEmail"
            type="email"
            placeholder="Введите ваш email"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
            className="pl-12 h-12 border-gray-300 focus:border-[#18A36C] transition-all duration-200 rounded-lg"
          />
        </div>
      </div>

      <div className="space-y-4">
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full h-12 bg-[#18A36C] hover:bg-[#18A36C]/90 text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Отправка..." : "Восстановить пароль"}
          {!isLoading && <Mail className="w-5 h-5 ml-[2.5px]" />}
        </Button>

        <div className="text-center">
          <button
            onClick={() => handleModalChange("login")}
            className="text-gray-600 hover:text-[#18A36C] underline underline-offset-2 text-sm transition-colors"
          >
            Вернуться к входу
          </button>
        </div>
      </div>

      <div className="text-center text-xs text-gray-600 mt-6 p-4 bg-[#F4F4F4] rounded-lg">
        <Mail className="w-4 h-4 inline mr-1" />
        На указанный email будет отправлена ссылка для восстановления пароля
      </div>
    </motion.div>
  );

  const getTitle = () => {
    switch (modalType) {
      case "login":
        return "Вход в личный кабинет";
      case "register":
        return "Регистрация";
      case "forgot-password":
        return "Восстановление пароля";
      default:
        return "Авторизация";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md lg:max-w-lg max-h-[95vh] overflow-y-auto border-gray-200 bg-white">
        <DialogHeader className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <DialogTitle className="text-center text-[#2E2E2E] text-2xl">
              {getTitle()}
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600 mt-2">
              {modalType === "login" && "Войдите в свой личный кабинет для доступа к услугам"}
              {modalType === "register" && "Создайте аккаунт для персонализированного доступа к медицинским услугам"}
              {modalType === "forgot-password" && "Мы отправим вам инструкции по восстановлению пароля"}
            </DialogDescription>
          </motion.div>
        </DialogHeader>
        
        <div className="relative z-10 mt-6">
          {modalType === "login" && renderLoginForm()}
          {modalType === "register" && renderRegisterForm()}
          {modalType === "forgot-password" && renderForgotPasswordForm()}
        </div>
      </DialogContent>
    </Dialog>
  );
}

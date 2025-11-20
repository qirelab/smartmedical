'use client';

import { Search, Phone, Menu, MapPin, Mail, X } from "lucide-react";
import { Button } from "../common/SMButton/SMButton";
import { Input } from "../common/SMInput/SMInput";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthModals } from "../SMAuthModals/SMAuthModals";
import { useMenu } from "../SMMenuContext/SMMenuContext";
import SMLogo from "@/icons/SMLogo";
import SMMobileLogo from "@/icons/SMMobileLogo";
import { SearchModal } from "../common/SMSearch/SMSearch";
import SMBurgerMenu from "../common/SMBurgerMenu/SMBurgerMenu";
import navigationConfig from "@/config/navigation.json";
import contactsConfig from "@/config/contacts.json";
import { SMProfileButton } from "../common/SMProfileButton/SMProfileButton";
import { signIn } from "next-auth/react";
import { LoginData, RegisterData } from "../SMAuthModals/SMAuthModals.styles";
import { useContacts } from "@/hooks/useContacts";
import { useAlert } from "../common/SMAlert/AlertProvider";

export function Header() {
  const { isBurgerMenuOpen, setIsBurgerMenuOpen } = useMenu();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { contacts } = useContacts();
  const alert = useAlert();
  

  useEffect(() => {
    if (isBurgerMenuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, [isBurgerMenuOpen]);

  // Keyboard shortcut: Ctrl+K or Cmd+K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="hidden md:block bg-[#18A36C] py-2 lg:py-3">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-white">
          <div className="flex items-center">
            <div className="flex items-center gap-2 lg:gap-3">
              <MapPin className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
              <span className="text-xs lg:text-sm">{contacts?.address || contactsConfig.address}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-3">
            <Mail className="w-3 h-3 lg:w-4 lg:h-4 text-white flex-shrink-0" />
            <span className="text-xs lg:text-sm">{contacts?.email || contactsConfig.email}</span>
          </div>
        </div>
      </div>

      <div className="py-3 lg:py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="hidden lg:flex items-center justify-between">
            <button
              onClick={() => handleNavigation("/")}
              className="flex items-center"
            >
              <SMLogo />
            </button>

            {/* Desktop Search - Click to open modal */}
            <div className="flex-1 max-w-md mx-8">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-full relative"
              >
                <Input
                  type="text"
                  placeholder="Поиск услуг и специалистов..."
                  readOnly
                  className="pl-4 pr-12 bg-gray-50 border-0 h-12 rounded-lg focus:outline-none focus:shadow-none focus:border-0 focus:ring-1 focus:ring-[#18A36C] cursor-pointer"
                />
                <div className="absolute right-1 top-1 h-10 w-10 p-0 bg-[#18A36C] hover:bg-[#18A36C]/90 rounded flex items-center justify-center">
                  <Search className="w-4 h-4 text-white" />
                </div>
              </button>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="flex items-center gap-2 text-[#2E2E2E] text-lg">
                  <Phone className="w-5 h-5 text-[#18A36C]" />
                  <span>{contacts?.phone_number || contactsConfig.phone}</span>
                </div>
                <button className="text-sm text-gray-500 hover:text-[#18A36C] transition-colors">
                  {contactsConfig.callbackText}
                </button>
              </div>

              <Button
                size="lg"
                className="bg-[#18A36C] hover:bg-[#18A36C]/90 text-white px-8 h-12"
              >
                {contactsConfig.onlineBookingText}
              </Button>
            </div>
          </div>

          <div className="lg:hidden">
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleNavigation("/")}
                className="flex items-center"
              >
                <SMMobileLogo />
              </button>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2"
                >
                  <Search className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2"
                >
                  <Phone className="w-5 h-5" />
                </Button>
                <Button className="bg-[#18A36C] hover:bg-[#18A36C]/90 text-white px-4 text-sm h-9">
                  Запись
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-t border-[#E8E6E3]">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center">
            <div className="flex">
              {navigationConfig.mainNavigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  className="px-3 py-3 lg:px-4 lg:py-4 text-[#2E2E2E] hover:text-[#18A36C] hover:bg-gray-50 transition-colors text-sm lg:text-base hidden lg:block"
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className="ml-auto flex items-center gap-2 lg:gap-4">
              <div className="hidden lg:block">
                <SMProfileButton onAuthModalOpen={() => setIsAuthModalOpen(true)} />
              </div>

              <div className="lg:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}
                  className="p-2"
                >
                  {isBurgerMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>
          </nav>
          <SMBurgerMenu />
        </div>
      </div>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <AuthModals
        isOpen={isAuthModalOpen}
        isLoading={isLoading}
        onClose={() => {
          setIsAuthModalOpen(false);
        }}
        onLogin={async (credentials: LoginData) => {
          setIsLoading(true);

          try {
            const result = await signIn("credentials", {
              login: credentials.login,
              password: credentials.password,
              redirect: false,
            });

            if (result?.error) {
              alert.error("Неверный логин или пароль", "Ошибка входа");
            } else if (result?.ok) {
              setIsAuthModalOpen(false);
              alert.success("Вы успешно вошли в систему!", "Добро пожаловать");
              router.push("/account");
              router.refresh();
            }
          } catch (err) {
            alert.error("Ошибка при входе. Попробуйте позже.", "Ошибка");
            console.error("Login error:", err);
          } finally {
            setIsLoading(false);
          }
        }}
        onRegister={async (userData: RegisterData) => {
          setIsLoading(true);

          try {
            const response = await fetch("/api/auth/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                lastName: userData.lastName,
                firstName: userData.firstName,
                middleName: userData.middleName,
                email: userData.email,
                phone: userData.phone,
                password: userData.password,
                confirmPassword: userData.confirmPassword,
                login: userData.login,
              }),
            });

            const data = await response.json();

            if (!response.ok) {
              alert.error(data.error || "Ошибка при регистрации", "Ошибка регистрации");
              return;
            }

            // После успешной регистрации автоматически входим
            const loginResult = await signIn("credentials", {
              login: userData.login,
              password: userData.password,
              redirect: false,
            });

            if (loginResult?.ok) {
              setIsAuthModalOpen(false);
              alert.success("Регистрация прошла успешно! Добро пожаловать!", "Успешная регистрация");
              router.push("/account");
              router.refresh();
            }
          } catch (err) {
            alert.error("Ошибка при регистрации. Попробуйте позже.", "Ошибка");
            console.error("Register error:", err);
          } finally {
            setIsLoading(false);
          }
        }}
        onForgotPassword={async (email: string) => {
          setIsLoading(true);

          try {
            // TODO: Реализовать API для восстановления пароля
            console.log("Forgot password:", email);
            alert.warning("Функция восстановления пароля пока не реализована", "Скоро будет");
          } catch (err) {
            alert.error("Ошибка при восстановлении пароля. Попробуйте позже.", "Ошибка");
            console.error("Forgot password error:", err);
          } finally {
            setIsLoading(false);
          }
        }}
      />
    </header>
  );
}

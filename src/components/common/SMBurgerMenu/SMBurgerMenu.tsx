"use client";

import SMBurgerMenuLogo from "@/icons/SMBurgerMenuLogo";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../SMButton/SMButton";
import { useRouter } from "next/navigation";
import { useMenu } from "@/components/SMMenuContext/SMMenuContext";
import { Phone, X, User, MapPin, Mail } from "lucide-react";
import navigationConfig from "@/config/navigation.json";
import contactsConfig from "@/config/contacts.json";
import { iconMap, IconName } from "@/utils/iconMapper";
import { useContacts } from "@/hooks/useContacts";

const SMBurgerMenu = () => {
  const { isBurgerMenuOpen, setIsBurgerMenuOpen } = useMenu();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated] = useState(false);
  const router = useRouter();
  const { contacts } = useContacts();

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsBurgerMenuOpen(false);
  };

  return (
    <AnimatePresence>
      {isBurgerMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsBurgerMenuOpen(false)}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
              duration: 0.4,
            }}
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 lg:hidden overflow-y-auto"
          >
            {/* Header */}
            <div className="bg-[#18A36C] p-6 text-white">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <SMBurgerMenuLogo />
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsBurgerMenuOpen(false)}
                    className="p-2 hover:bg-white/20 text-white"
                  >
                    <X className="w-6 h-6" />
                  </Button>
                </div>

                <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-green-200" />
                    <span>{contacts?.phone_number || contactsConfig.phone}</span>
                  </div>
                  <button className="text-xs text-green-200 hover:text-white transition-colors mt-1">
                    {contactsConfig.callbackText}
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="p-6">
              <nav className="space-y-2">
                {navigationConfig.mainNavigation.map((item, index) => {
                  const Icon = iconMap[item.icon as IconName];
                  return (
                    <motion.button
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.1 + 0.2,
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-[#2E2E2E] hover:text-[#18A36C] hover:bg-gray-50 transition-all duration-200 group"
                      onClick={() => handleNavigation(item.path)}
                    >
                      <Icon className="w-5 h-5 text-gray-400 group-hover:text-[#18A36C] transition-colors" />
                      <span className="text-base">{item.name}</span>
                    </motion.button>
                  );
                })}
              </nav>

              {/* CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-8 pt-6 border-t border-[#E8E6E3]"
              >
                <Button
                  className="w-full bg-[#18A36C] hover:bg-[#18A36C]/90 text-white py-3 h-auto"
                  onClick={() => setIsBurgerMenuOpen(false)}
                >
                  {contactsConfig.onlineBookingText}
                </Button>

                <div className="mt-4 flex items-center justify-center gap-2 text-[#18A36C]">
                  <User className="w-4 h-4" />
                  {isAuthenticated ? (
                    <button
                      onClick={() => handleNavigation("/account")}
                      className="text-sm hover:text-[#18A36C]/80 transition-colors"
                    >
                      Личный кабинет
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsAuthModalOpen(true);
                        setIsBurgerMenuOpen(false);
                      }}
                      className="text-sm hover:text-[#18A36C]/80 transition-colors"
                    >
                      Войти
                    </button>
                  )}
                </div>
              </motion.div>

              {/* Contact info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="mt-6 pt-6 border-t border-[#E8E6E3] text-center text-sm text-[#2E2E2E]"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-[#18A36C]" />
                  <span>{contacts?.address || contactsConfig.address}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4 text-[#18A36C]" />
                  <span>{contacts?.email || contactsConfig.email}</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SMBurgerMenu;

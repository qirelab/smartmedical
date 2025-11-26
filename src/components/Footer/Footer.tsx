'use client';

import { ChevronRight, Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "../common/SMButton/SMButton";
import SMLogo from "@/icons/SMLogo";
import { useRouter, usePathname } from "next/navigation";
import footerConfig from "@/config/footer.json";
import { useContacts } from "@/hooks/useContacts";

// Компонент скелетона для текста
function TextSkeleton({ className = '' }: { className?: string }) {
  return <span className={`inline-block animate-pulse bg-gray-200 rounded ${className}`}>&nbsp;</span>;
}

export function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  const { contacts, loading: contactsLoading } = useContacts();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  // Не показываем футер на страницах админки
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-[#F8F8F8] text-[#2E2E2E]">
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-8 lg:mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-4 lg:mb-6">
              <button onClick={() => handleNavigation("/")} className="mb-3">
                <SMLogo />
              </button>

              <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                {footerConfig.companyInfo.description}
              </p>
            </div>

            <div className="mb-4 lg:mb-6">
              <h4 className="text-lg text-[#2E2E2E] mb-2 lg:mb-3">
                {footerConfig.newsletter.title}
              </h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder={footerConfig.newsletter.placeholder}
                  className="flex-1 px-3 lg:px-4 py-2 bg-white border border-gray-300 text-[#2E2E2E] text-sm lg:text-base rounded-lg focus:outline-none focus:border-[#18A36C]"
                />
                <Button className="bg-[#18A36C] hover:bg-[#18A36C]/90 text-white px-4 lg:px-6 py-2 rounded-lg">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg text-[#2E2E2E] mb-3 lg:mb-4">Услуги</h4>
            <ul className="space-y-2 text-sm lg:text-base">
              {footerConfig.services.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigation(service.path)}
                    className="text-gray-600 hover:text-[#18A36C] transition-colors"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Information Links */}
          <div>
            <h4 className="text-lg text-[#2E2E2E] mb-3 lg:mb-4">Информация</h4>
            <ul className="space-y-2 text-sm lg:text-base">
              {footerConfig.informationLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigation(link.path)}
                    className="text-gray-600 hover:text-[#18A36C] transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg text-[#2E2E2E] mb-3 lg:mb-4">Контакты</h4>
            <div className="space-y-3 lg:space-y-4">
              <div className="flex items-start gap-2 lg:gap-3">
                <Phone className="w-4 h-4 lg:w-5 lg:h-5 mt-0.5 flex-shrink-0 text-[#18A36C]" />
                <div>
                  <div className="text-[#2E2E2E] text-sm lg:text-base">
                    {contactsLoading ? (
                      <TextSkeleton className="w-32 h-5" />
                    ) : (
                      contacts?.phone_number || footerConfig.contactInfo.phone.number
                    )}
                  </div>
                  <div className="text-gray-500 text-xs lg:text-sm">
                    {footerConfig.contactInfo.phone.workingHours}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2 lg:gap-3">
                <Mail className="w-4 h-4 lg:w-5 lg:h-5 mt-0.5 flex-shrink-0 text-[#18A36C]" />
                <div>
                  <div className="text-[#2E2E2E] text-sm lg:text-base">
                    {contactsLoading ? (
                      <TextSkeleton className="w-40 h-5" />
                    ) : (
                      contacts?.email || footerConfig.contactInfo.email.address
                    )}
                  </div>
                  <div className="text-gray-500 text-xs lg:text-sm">
                    {footerConfig.contactInfo.email.responseTime}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2 lg:gap-3">
                <MapPin className="w-4 h-4 lg:w-5 lg:h-5 mt-0.5 flex-shrink-0 text-[#18A36C]" />
                <div>
                  <div className="text-[#2E2E2E] text-sm lg:text-base">
                    {contactsLoading ? (
                      <TextSkeleton className="w-48 h-5" />
                    ) : (
                      contacts?.address || footerConfig.contactInfo.address.full
                    )}
                  </div>
                  <div className="text-gray-500 text-xs lg:text-sm">
                    {footerConfig.contactInfo.address.note}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2 lg:gap-3">
                <Clock className="w-4 h-4 lg:w-5 lg:h-5 mt-0.5 flex-shrink-0 text-[#18A36C]" />
                <div>
                  <div className="text-[#2E2E2E] text-sm lg:text-base">
                    {footerConfig.contactInfo.schedule.title}
                  </div>
                  <div className="text-gray-500 text-xs lg:text-sm">
                    {contactsLoading ? (
                      <TextSkeleton className="w-24 h-4" />
                    ) : (
                      contacts?.work_hours_main || footerConfig.contactInfo.schedule.hours
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center pt-6 lg:pt-8 border-t border-gray-300">
          <div className="mb-4 lg:mb-0">
            <div className="flex gap-2 lg:gap-3">
              {footerConfig.socialMedia.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-200 flex items-center justify-center text-[#2E2E2E] hover:bg-[#18A36C] hover:text-white transition-all rounded-lg"
                >
                  <span className="text-xs lg:text-sm">{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="text-center lg:text-right">
            <div className="text-gray-500 text-xs lg:text-sm">
              {footerConfig.companyInfo.copyright}
            </div>
            <div className="text-gray-400 text-xs mt-1">
              {footerConfig.companyInfo.license}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

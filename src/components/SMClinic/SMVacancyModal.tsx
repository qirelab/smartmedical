"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../common/SMDialog/SMDialog';
import { Button } from '../common/SMButton/SMButton';
import { DollarSign, Briefcase, Clock, CheckCircle2, Phone, Mail } from 'lucide-react';

interface Vacancy {
  id: number;
  name: string;
  category: string;
  description: string;
  payment: number;
  experience: number;
  requirements: string;
}

interface VacancyModalProps {
  vacancy: Vacancy | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VacancyModal({ vacancy, open, onOpenChange }: VacancyModalProps) {
  if (!vacancy) return null;

  // Разбираем требования на массив
  const requirementsList = vacancy.requirements.split('\n').filter(r => r.trim());

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto pt-12 [&>button]:w-12 [&>button]:h-12 [&>button]:top-6 [&>button]:right-6 [&_svg]:!size-6">
        <DialogHeader className="pt-4">
          <DialogTitle className="text-2xl text-[#2E2E2E]">
            {vacancy.name}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {vacancy.category}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Quick Info Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="w-10 h-10 bg-[#18A36C]/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-[#18A36C]" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Зарплата</div>
                <div className="font-semibold text-[#2E2E2E]">{vacancy.payment} BYN</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="w-10 h-10 bg-[#18A36C]/10 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#18A36C]" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Опыт работы</div>
                <div className="font-semibold text-[#2E2E2E]">
                  {vacancy.experience} {vacancy.experience === 1 ? 'год' : vacancy.experience < 5 ? 'года' : 'лет'}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-[#2E2E2E] mb-3">Описание вакансии</h3>
            <p className="text-gray-700 leading-relaxed">
              {vacancy.description}
            </p>
          </div>

          {/* Requirements */}
          <div>
            <h3 className="text-lg font-semibold text-[#2E2E2E] mb-3">Требования</h3>
            <ul className="space-y-2">
              {requirementsList.map((req, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#18A36C] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What We Offer */}
          <div>
            <h3 className="text-lg font-semibold text-[#2E2E2E] mb-3">Мы предлагаем</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#18A36C] mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Достойная заработная плата</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#18A36C] mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Социальный пакет</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#18A36C] mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Возможности для профессионального развития</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#18A36C] mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Современное оборудование</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#18A36C] mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Дружная команда профессионалов</span>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-[#2E2E2E] mb-3">Контактная информация</h3>
            <div className="space-y-3">
              <a
                href="tel:+375291610101"
                className="flex items-center gap-3 text-[#18A36C] hover:text-[#18A36C]/80 transition-colors group"
              >
                <div className="w-10 h-10 bg-[#18A36C]/10 rounded-lg flex items-center justify-center group-hover:bg-[#18A36C]/20 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Телефон</div>
                  <div className="font-medium">+375(29)161-01-01</div>
                </div>
              </a>

              <a
                href={`mailto:smartmedical.by@gmail.com?subject=Отклик на вакансию: ${vacancy.name}`}
                className="flex items-center gap-3 text-[#18A36C] hover:text-[#18A36C]/80 transition-colors group"
              >
                <div className="w-10 h-10 bg-[#18A36C]/10 rounded-lg flex items-center justify-center group-hover:bg-[#18A36C]/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Email</div>
                  <div className="font-medium">smartmedical.by@gmail.com</div>
                </div>
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-gray-200 space-y-3">
            <Button
              onClick={() => window.location.href = 'tel:+375291610101'}
              className="w-full bg-[#18A36C] hover:bg-[#18A36C]/90 text-white py-6 text-lg"
            >
              <Phone className="w-5 h-5 mr-2" />
              Позвонить
            </Button>
            <Button
              onClick={() => window.location.href = `mailto:smartmedical.by@gmail.com?subject=Отклик на вакансию: ${vacancy.name}`}
              variant="outline"
              className="w-full border-2 border-[#18A36C] text-[#18A36C] hover:bg-[#18A36C] hover:text-white py-6 text-lg"
            >
              <Mail className="w-5 h-5 mr-2" />
              Написать письмо
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

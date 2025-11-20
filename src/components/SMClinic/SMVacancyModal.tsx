"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../common/SMDialog/SMDialog';
import { Button } from '../common/SMButton/SMButton';
import { DollarSign, Briefcase, Clock, FileText, CheckCircle2, Phone, Mail } from 'lucide-react';
import { Badge } from '../common/SMBadge/SMBadge';

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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl text-[#2E2E2E] mb-2">
                {vacancy.name}
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                {vacancy.category}
              </DialogDescription>
            </div>
            <Badge className="bg-[#18A36C] text-white text-lg px-4 py-2 whitespace-nowrap">
              {vacancy.payment} BYN
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Quick Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-[#18A36C]/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-[#18A36C]" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Заработная плата</div>
                <div className="font-semibold text-[#2E2E2E]">{vacancy.payment} BYN</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-[#18A36C]/10 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#18A36C]" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Опыт работы</div>
                <div className="font-semibold text-[#2E2E2E]">{vacancy.experience} {vacancy.experience === 1 ? 'год' : vacancy.experience < 5 ? 'года' : 'лет'}</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Briefcase className="w-5 h-5 text-[#18A36C]" />
              <h3 className="text-lg font-semibold text-[#2E2E2E]">Описание вакансии</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {vacancy.description}
            </p>
          </div>

          {/* Requirements */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-[#18A36C]" />
              <h3 className="text-lg font-semibold text-[#2E2E2E]">Требования</h3>
            </div>
            <ul className="space-y-2">
              {requirementsList.map((req, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#18A36C] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Conditions */}
          <div className="bg-gradient-to-r from-[#18A36C]/5 to-[#18A36C]/10 rounded-lg p-6">
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

          {/* Contact Section */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Как откликнуться?</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-700">
                <Phone className="w-5 h-5 text-[#18A36C]" />
                <span>Позвоните нам: <strong>+375(29)161-01-01</strong></span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="w-5 h-5 text-[#18A36C]" />
                <span>Напишите: <strong>smartmedical.by@gmail.com</strong></span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button
                onClick={() => window.location.href = 'tel:+375291610101'}
                className="bg-[#18A36C] hover:bg-[#18A36C]/90 text-white py-6 text-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                Позвонить
              </Button>
              <Button
                onClick={() => window.location.href = 'mailto:smartmedical.by@gmail.com?subject=Отклик на вакансию: ' + vacancy.name}
                variant="outline"
                className="border-2 border-[#18A36C] text-[#18A36C] hover:bg-[#18A36C] hover:text-white py-6 text-lg"
              >
                <Mail className="w-5 h-5 mr-2" />
                Написать
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

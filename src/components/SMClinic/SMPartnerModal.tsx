"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../common/SMDialog/SMDialog';
import { Button } from '../common/SMButton/SMButton';
import { ExternalLink, Globe, MapPin, Phone } from 'lucide-react';
import { ImageWithFallback } from '../SMImage/ImageWithFallback';

interface Partner {
  id: number;
  name: string;
  description: string;
  image_url: string;
  website_url: string;
  number: number;
  category: {
    name: string;
    slug: string;
  };
}

interface PartnerModalProps {
  partner: Partner | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PartnerModal({ partner, open, onOpenChange }: PartnerModalProps) {
  if (!partner) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto pt-12 [&>button]:w-12 [&>button]:h-12 [&>button]:top-6 [&>button]:right-6 [&_svg]:!size-6">
        <DialogHeader className="pt-4">
          <DialogTitle className="text-2xl text-[#2E2E2E]">
            {partner.name}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {partner.category.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Image */}
          <div className="relative h-64 rounded-lg overflow-hidden">
            <ImageWithFallback
              src={partner.image_url}
              alt={partner.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-[#2E2E2E] mb-3">О партнёре</h3>
            <p className="text-gray-700 leading-relaxed">
              {partner.description}
            </p>
          </div>

          {/* Contact Information */}
          {partner.website_url && (
            <div>
              <h3 className="text-lg font-semibold text-[#2E2E2E] mb-3">Контактная информация</h3>
              <div className="space-y-3">
                <a
                  href={partner.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#18A36C] hover:text-[#18A36C]/80 transition-colors group"
                >
                  <div className="w-10 h-10 bg-[#18A36C]/10 rounded-lg flex items-center justify-center group-hover:bg-[#18A36C]/20 transition-colors">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Веб-сайт</div>
                    <div className="font-medium">{partner.website_url}</div>
                  </div>
                </a>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-4 border-t border-gray-200">
            <Button
              onClick={() => window.open(partner.website_url, '_blank')}
              className="w-full bg-[#18A36C] hover:bg-[#18A36C]/90 text-white py-6 text-lg"
            >
              Перейти на сайт партнёра
              <ExternalLink className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

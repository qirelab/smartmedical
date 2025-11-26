'use client';

import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import { Button } from '../common/SMButton/SMButton';
import { Card } from '../common/SMCard/SMCard';
import { ImageWithFallback } from '../SMImage/ImageWithFallback';
import { useRouter } from 'next/navigation';

interface Specialist {
  id: number;
  name: string;
  specialization: string;
  qualification: string;
  experience: number;
  grade: number;
  image_url: string;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
}

interface SpecialistCardProps {
  specialist: Specialist;
  index?: number;
  onDoctorClick?: (doctorId: number) => void;
  onBookAppointment?: (doctorId: number, doctorName: string) => void;
}

export function SpecialistCard({
  specialist,
  index = 0,
  onDoctorClick,
  onBookAppointment,
}: SpecialistCardProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group border border-[#E8E6E3] hover:border-[#18A36C] rounded-lg">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-shrink-0 mx-auto sm:mx-0">
            <div
              className="w-24 h-24 rounded-lg overflow-hidden transition-all duration-300"
              onClick={() => onDoctorClick?.(specialist.id)}
            >
              <ImageWithFallback
                src={specialist.image_url}
                alt={specialist.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div
              className="cursor-pointer"
              onClick={() => onDoctorClick?.(specialist.id)}
            >
              <h3 className="text-lg text-[#2E2E2E] mb-1 group-hover:text-[#18A36C] transition-colors">
                {specialist.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{specialist.specialization}</p>

              <div className="text-sm text-gray-600 mb-3 flex flex-col gap-1 items-center sm:items-start">
                <span>{specialist.qualification}</span>
                <span>Стаж: {specialist.experience} {specialist.experience === 1 ? 'год' : specialist.experience < 5 ? 'года' : 'лет'}</span>
              </div>

              <div className="flex items-center gap-1 justify-center sm:justify-start mb-4">
                {[...Array(specialist.grade)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#18A36C] text-[#18A36C]"
                  />
                ))}
                {[...Array(5 - specialist.grade)].map((_, i) => (
                  <Star
                    key={i + specialist.grade}
                    className="w-4 h-4 fill-gray-200 text-gray-200"
                  />
                ))}
                <span className="text-sm text-gray-600 ml-1">
                  ({specialist.grade}/5)
                </span>
              </div>
            </div>

            <Button
              onClick={() => router.push('/contacts')}
              className="w-full sm:w-auto bg-[#18A36C] hover:bg-[#18A36C]/90 text-white px-8 py-4 h-auto text-lg rounded-lg transition-all duration-300"
            >
              Связаться с нами
              <ArrowRight className="w-5 h-5 ml-[2.5px]" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

'use client'

import { Breadcrumb } from '../../components/SMBreadcrumb/SMBreadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/common/SMTabs/SMTabs';
import { Button } from '../../components/common/SMButton/SMButton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/common/SMAccordion/SMAccordion';
import { Card } from '../../components/common/SMCard/SMCard';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/common/SMAvatar/SMAvatar';
import { Badge } from '../../components/common/SMBadge/SMBadge';
import { ImageWithFallback } from '../../components/SMImage/ImageWithFallback';
import { NavigableServicesMenu } from '../../components/SMServices/SMNavigableServicesMenu';
import { ServicesContent } from '../../components/SMServices/SMServicesContent';
import { useRouter } from "@/components/SMRouter/SMRouter";

import { Star, Play, Award, Calendar, FileText, HelpCircle, MessageSquare } from 'lucide-react';
import { getServiceData, ServiceData } from '@/data/SMServicesData/SMServicesData';
import { useEffect, useState } from 'react';
import { mapServiceFromDBToServiceData, ServiceFromDB } from '@/utils/serviceMapper';

interface ServicePageProps {
  serviceId: string;
  categoryId: string;
}

export function ServicePage({ serviceId, categoryId }: ServicePageProps) {
  const [serviceData, setServiceData] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServiceData() {
      try {
        setLoading(true);
        setError(null);

        // Пытаемся получить услугу из API
        const response = await fetch(`/api/services/by-category/${categoryId}/${serviceId}`);
        
        if (response.ok) {
          const serviceFromDB: ServiceFromDB = await response.json();
          const mappedData = mapServiceFromDBToServiceData(serviceFromDB);
          setServiceData(mappedData);
        } else if (response.status === 404) {
          // Если услуга не найдена в БД, используем статический fallback
          const fallbackData = getServiceData(serviceId, categoryId);
          setServiceData(fallbackData);
        } else {
          throw new Error('Failed to fetch service');
        }
      } catch (err) {
        console.error('Error fetching service:', err);
        // В случае ошибки используем статический fallback
        const fallbackData = getServiceData(serviceId, categoryId);
        setServiceData(fallbackData);
        setError('Не удалось загрузить данные из базы. Используются статические данные.');
      } finally {
        setLoading(false);
      }
    }

    if (serviceId && categoryId) {
      fetchServiceData();
    } else {
      // Если нет serviceId или categoryId, используем fallback
      setLoading(false);
      const fallbackData = getServiceData(serviceId || '', categoryId || '');
      setServiceData(fallbackData);
    }
  }, [serviceId, categoryId]);

  // Показываем загрузку только если данные еще не загружены
  if (loading && !serviceData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#18A36C] mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка данных...</p>
        </div>
      </div>
    );
  }

  // Если данных нет после загрузки, показываем fallback
  if (!serviceData) {
    const fallbackData = getServiceData(serviceId || '', categoryId || '');
    return (
      <div className="min-h-screen bg-white">
        <Breadcrumb items={fallbackData.breadcrumbs} />
        <div className="max-w-6xl mx-auto px-4 py-6 lg:py-8">
          <p className="text-gray-600">Услуга не найдена</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {error && (
        <div className="max-w-6xl mx-auto px-4 pt-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-yellow-800">{error}</p>
          </div>
        </div>
      )}
      <Breadcrumb items={serviceData.breadcrumbs} />
      
      <div className="max-w-6xl mx-auto px-4 py-6 lg:py-8">
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8 border border-gray-100">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="bg-[#18A36C]/10 text-[#18A36C]">
                    {serviceData.category}
                  </Badge>
                  {serviceData.price && (
                    <Badge className="bg-[#18A36C] text-white text-lg px-4 py-1">
                      {serviceData.price}
                    </Badge>
                  )}
                </div>
                <h1 className="text-2xl lg:text-3xl text-[#2E2E2E] mb-4">{serviceData.title}</h1>
                <p className="text-gray-600 leading-relaxed">
                  {serviceData.description}
                </p>
              </div>

              <div className="mb-6">
                <ImageWithFallback
                  src={serviceData.image}
                  alt={serviceData.title}
                  className="w-full h-64 lg:h-80 object-cover rounded-lg"
                />
              </div>
            </div>

            <Card className="overflow-hidden border border-gray-100">
              <Tabs defaultValue="description" className="w-full">
                <div className="border-b border-gray-200">
                  <TabsList className="grid w-full grid-cols-3 bg-white p-2 rounded-none h-auto gap-2">
                    <TabsTrigger 
                      value="description" 
                      className="data-[state=active]:bg-[#18A36C] data-[state=active]:text-white data-[state=active]:border-[#18A36C] data-[state=inactive]:text-[#2E2E2E] data-[state=inactive]:hover:text-[#18A36C] data-[state=inactive]:hover:bg-[#18A36C]/5 data-[state=inactive]:hover:border-[#18A36C] data-[state=inactive]:border-2 data-[state=inactive]:border-gray-300 transition-all duration-300 rounded-lg py-3 px-4"
                    >
                      <span className="flex items-center justify-center gap-2">
                        Описание
                        <FileText className="w-5 h-5" />
                      </span>
                    </TabsTrigger>
                    
                    <TabsTrigger 
                      value="faq" 
                      className="data-[state=active]:bg-[#18A36C] data-[state=active]:text-white data-[state=active]:border-[#18A36C] data-[state=inactive]:text-[#2E2E2E] data-[state=inactive]:hover:text-[#18A36C] data-[state=inactive]:hover:bg-[#18A36C]/5 data-[state=inactive]:hover:border-[#18A36C] data-[state=inactive]:border-2 data-[state=inactive]:border-gray-300 transition-all duration-300 rounded-lg py-3 px-4"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span className="hidden sm:inline">Вопросы и ответы</span>
                        <span className="sm:hidden">Вопросы</span>
                        <HelpCircle className="w-5 h-5" />
                      </span>
                    </TabsTrigger>
                    
                    <TabsTrigger 
                      value="reviews" 
                      className="data-[state=active]:bg-[#18A36C] data-[state=active]:text-white data-[state=active]:border-[#18A36C] data-[state=inactive]:text-[#2E2E2E] data-[state=inactive]:hover:text-[#18A36C] data-[state=inactive]:hover:bg-[#18A36C]/5 data-[state=inactive]:hover:border-[#18A36C] data-[state=inactive]:border-2 data-[state=inactive]:border-gray-300 transition-all duration-300 rounded-lg py-3 px-4"
                    >
                      <span className="flex items-center justify-center gap-2">
                        Отзывы
                        <MessageSquare className="w-5 h-5" />
                      </span>
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="description" className="p-6 lg:p-8">
                  <div className="space-y-6">
                    <div className="prose max-w-none">
                      <p className="text-[#2E2E2E] leading-relaxed whitespace-pre-line">
                        {serviceData.fullDescription}
                      </p>
                    </div>
                    
                    {serviceData.videoUrl ? (
                      <div className="relative">
                        <div className="aspect-video bg-black rounded-lg overflow-hidden">
                          <iframe
                            src={serviceData.videoUrl}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="aspect-video bg-[#F4F4F4] rounded-lg flex items-center justify-center border-2 border-dashed border-[#CACACA]">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-[#18A36C] rounded-full flex items-center justify-center mx-auto mb-3">
                              <Play className="w-8 h-8 text-white" />
                            </div>
                            <p className="text-[#2E2E2E] mb-2">Видео о процедуре</p>
                            <p className="text-sm text-gray-600">Скоро будет добавлено</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="text-lg text-[#2E2E2E] mb-4">Фотографии</h3>
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        {serviceData.gallery.map((imageUrl, index) => (
                          <div key={index} className="aspect-square">
                            <ImageWithFallback
                              src={imageUrl}
                              alt={`${serviceData.title} фото ${index + 1}`}
                              className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="faq" className="p-6 lg:p-8">
                  <Accordion type="single" collapsible className="w-full">
                    {serviceData.faq.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left text-[#2E2E2E] hover:text-[#18A36C]">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-[#2E2E2E] leading-relaxed">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
                
                <TabsContent value="reviews" className="p-6 lg:p-8">
                  <div className="space-y-6">
                    {serviceData.reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#18A36C]/10 rounded-full flex items-center justify-center">
                              <span className="text-[#18A36C] font-medium">
                                {review.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-700">{review.name}</h4>
                              <p className="text-sm text-gray-500">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'fill-[#18A36C] text-[#18A36C]'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{review.text}</p>
                      </div>
                    ))}
                    
                    <div className="text-center pt-6">
                      <Button variant="outline" className="border-[#18A36C] text-[#18A36C] hover:bg-[#18A36C] hover:text-white">
                        Показать все отзывы
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            <Card className="p-6 lg:p-8 border border-gray-100">
              <div className="text-center mb-8">
                <h3 className="text-2xl text-[#2E2E2E] mb-2">Наши специалисты</h3>
                <p className="text-gray-600">Профессиональная команда врачей высшей категории</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {serviceData.doctors.slice(0, 2).map((doctor) => (
                  <Card key={doctor.id} className="p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="mb-6">
                      <div className="w-28 h-28 mx-auto">
                        <Avatar className="w-full h-full ring-4 ring-white shadow-lg">
                          <AvatarImage src={doctor.image} className="object-cover" />
                          <AvatarFallback className="bg-[#18A36C] text-white text-xl">
                            {doctor.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>

                    <div className="text-center mb-6">
                      <h4 className="text-xl text-[#2E2E2E] mb-2 hover:text-[#18A36C] transition-colors">{doctor.name}</h4>
                      <p className="text-gray-600 mb-3">{doctor.position}</p>
                      
                      <div className="inline-flex items-center gap-2 bg-[#18A36C]/10 px-4 py-2 rounded-lg mb-4">
                        <Award className="w-4 h-4 text-[#18A36C]" />
                        <span className="text-sm text-gray-600">Опыт: {doctor.experience}</span>
                      </div>

                      <div className="flex justify-center gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-[#18A36C] text-[#18A36C]" />
                        ))}
                      </div>
                    </div>

                    <div className="text-center">
                      <Button className="bg-[#18A36C] hover:bg-[#18A36C]/90 text-white px-8 py-4 h-auto">
                        Записаться на приём
                        <Calendar className="w-4 h-4 ml-[2.5px]" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
              
              {serviceData.doctors.length > 2 && (
                <div className="text-center mt-10">
                  <Button 
                    variant="outline" 
                    className="border-2 border-[#18A36C] text-[#18A36C] hover:bg-[#18A36C] hover:text-white px-8 py-4 h-auto transition-all duration-300"
                  >
                    Показать всех специалистов
                  </Button>
                </div>
              )}
            </Card>

            <div className="p-6 bg-gradient-to-r from-[#F4F4F4] to-white rounded-2xl border border-gray-100">
              <div className="text-center">
                <HelpCircle className="w-12 h-12 text-[#18A36C] mx-auto mb-3" />
                <h3 className="text-lg text-gray-700 mb-2">Не нашли ответа на свой вопрос?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Свяжитесь с нами, и мы предоставим необходимую информацию.
                </p>
                <Button className="bg-[#18A36C] hover:bg-[#18A36C]/90 text-white px-8 py-4 h-auto">
                  Задать вопрос
                  <MessageSquare className="w-4 h-4 ml-[2.5px]" />
                </Button>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default function SMServicesPage() {
  const { currentRoute } = useRouter();
  const pathParts = currentRoute.replace(/^\/+|\/+$/g, '').split('/');

  let categoryId = '';
  let serviceId = '';
  if (pathParts[0] === 'services') {
    categoryId = pathParts[1] || '';
    serviceId = pathParts[2] || '';
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
        <NavigableServicesMenu />
      <div className="flex-1">
        {categoryId && serviceId ? (
          <ServicePage categoryId={categoryId} serviceId={serviceId} />
        ) : (
          <ServicesContent />
        )}
      </div>
    </div>
  );
}

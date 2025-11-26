'use client';

import React from 'react';
import { ServicePage } from '../../page';
import { NavigableServicesMenu } from '@/components/SMServices/SMNavigableServicesMenu';

interface PageProps {
  params: Promise<{
    categorySlug: string;
    serviceId: string;
  }>;
}

export default function ServiceDetailPage({ params }: PageProps) {
  const [resolvedParams, setResolvedParams] = React.useState<{
    categorySlug: string;
    serviceId: string;
  } | null>(null);

  React.useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  if (!resolvedParams) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#18A36C] mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <NavigableServicesMenu />
      <div className="flex-1">
        <ServicePage
          categoryId={resolvedParams.categorySlug}
          serviceId={resolvedParams.serviceId}
        />
      </div>
    </div>
  );
}

'use client';

import { ClinicPage } from "@/components/SMClinic/SMClinicPage";
import { ClinicContent } from "@/components/SMClinic/SMClinicContent";
import { NavigableClinicMenu } from "@/components/SMClinic/SMNavigableClinicMenu";
import { useRouter } from "@/components/SMRouter/SMRouter";

export default function Clinic() {
    const { currentRoute } = useRouter();
    const pathParts = currentRoute.replace(/^\/+|\/+$/g, '').split('/');

    let categoryId = '';
    let itemId = '';
    if (pathParts[0] === 'clinic') {
        categoryId = pathParts[1] || '';
        itemId = pathParts[2] || pathParts[1] || '';
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <NavigableClinicMenu />
            <div className="flex-1">
                {categoryId || itemId ? (
                    <ClinicPage itemId={itemId} categoryId={categoryId || itemId} />
                ) : (
                    <ClinicContent />
                )}
            </div>
        </div>
    );
}
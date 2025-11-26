'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { AnimatePresence } from 'framer-motion';
import { Users, Loader2 } from 'lucide-react';
import { Pagination } from '@/components/common/SMPagination/SMPagination';
import { ImageUploader } from '@/components/ImageUploader';
import { ImageWithFallback } from '@/components/SMImage/ImageWithFallback';
import { AdminMenu } from '@/components/SMAdmin/SMAdminMenu';
import {
  AdminSection,
  EmptyState,
  ItemCard,
  CardActions,
  FormModal,
  FormField,
  FormInput,
  FormTextarea,
  FormSelect,
  Badge,
} from '@/components/SMAdmin/SMAdminSection';
import { AdminAuthForm } from '@/components/SMAdmin/SMAdminAuthForm';
import { useAdminSession } from '@/hooks/useAdminSession';
import { AdminAccessSkeleton, AdminSectionSkeleton } from '@/components/SMAdmin/SMAdminSkeleton';
import { ConfirmDialog } from '@/components/SMAdmin/SMConfirmDialog';
import { useConfirmDialog } from '@/hooks/useConfirmDialog';
import { useAlert } from '@/components/common/SMAlert';
import NotFound from '../not-found';

// Types
interface Specialist {
  id: number;
  name: string;
  specialization: string;
  qualification: string;
  experience: number;
  grade: number;
  image_url: string;
  activity_area: string | null;
  education_details: string | null;
  conferences: string[];
  specializations: string[];
  education: string[];
  work_examples: Array<{ title: string; images: string[] }> | null;
  category_id: number;
  category: {
    id: number;
    name: string;
    slug: string;
  };
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function AdminPage() {
  const { status } = useSession();
  const { sessionVerified, isLoading: sessionLoading, verifySession } = useAdminSession();
  const [hasAdminRole, setHasAdminRole] = useState<boolean | null>(null);
  const [isCheckingRole, setIsCheckingRole] = useState(true);
  const confirmDialog = useConfirmDialog();
  const { success, error: showError } = useAlert();

  // Data states
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  // Form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSpecialist, setEditingSpecialist] = useState<Specialist | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    qualification: '',
    experience: '',
    grade: '5',
    image_url: '',
    activity_area: '',
    education_details: '',
    conferences: '',
    specializations: '',
    education: '',
    category_id: '',
  });

  // Check admin role
  useEffect(() => {
    if (status === 'authenticated') {
      checkAdminRole();
    } else if (status === 'unauthenticated') {
      setHasAdminRole(false);
    }
  }, [status]);

  // Load data when session is verified
  useEffect(() => {
    if (sessionVerified && hasAdminRole) {
      loadData();
    }
  }, [sessionVerified, hasAdminRole]);

  const checkAdminRole = async () => {
    setIsCheckingRole(true);
    try {
      const res = await fetch('/api/admin/auth');
      const data = await res.json();
      setHasAdminRole(data.isAdmin);
    } catch (error) {
      setHasAdminRole(false);
    } finally {
      setIsCheckingRole(false);
    }
  };

  const handleAuthSuccess = () => {
    verifySession();
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [specialistsRes, categoriesRes] = await Promise.all([
        fetch('/api/admin/specialists'),
        fetch('/api/categories'),
      ]);

      if (specialistsRes.ok) {
        const data = await specialistsRes.json();
        setSpecialists(data);
      }

      if (categoriesRes.ok) {
        const data = await categoriesRes.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filtered specialists
  const filteredSpecialists = useMemo(() => {
    if (!searchQuery) return specialists;
    const query = searchQuery.toLowerCase();
    return specialists.filter(
      (s) =>
        s.name.toLowerCase().includes(query) ||
        s.specialization.toLowerCase().includes(query) ||
        s.category.name.toLowerCase().includes(query)
    );
  }, [specialists, searchQuery]);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredSpecialists.length / ITEMS_PER_PAGE);
  const paginatedSpecialists = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredSpecialists.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredSpecialists, currentPage]);

  // Form handlers
  const resetForm = () => {
    setFormData({
      name: '',
      specialization: '',
      qualification: '',
      experience: '',
      grade: '5',
      image_url: '',
      activity_area: '',
      education_details: '',
      conferences: '',
      specializations: '',
      education: '',
      category_id: '',
    });
    setEditingSpecialist(null);
    setIsModalOpen(false);
  };

  const handleAdd = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleEdit = (specialist: Specialist) => {
    setEditingSpecialist(specialist);
    setFormData({
      name: specialist.name,
      specialization: specialist.specialization,
      qualification: specialist.qualification,
      experience: specialist.experience.toString(),
      grade: specialist.grade.toString(),
      image_url: specialist.image_url,
      activity_area: specialist.activity_area || '',
      education_details: specialist.education_details || '',
      conferences: specialist.conferences.join('\n'),
      specializations: specialist.specializations.join('\n'),
      education: specialist.education.join('\n'),
      category_id: specialist.category_id.toString(),
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    setFormLoading(true);
    try {
      const payload = {
        ...formData,
        specializations: formData.specializations.split('\n').filter((s) => s.trim()),
        education: formData.education.split('\n').filter((e) => e.trim()),
        conferences: formData.conferences.split('\n').filter((c) => c.trim()),
      };

      const url = editingSpecialist
        ? `/api/admin/specialists/${editingSpecialist.id}`
        : '/api/admin/specialists';

      const method = editingSpecialist ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        await loadData();
        resetForm();
        success(editingSpecialist ? 'Специалист обновлен' : 'Специалист создан');
      } else {
        const error = await res.json();
        showError(error.error || 'Ошибка сохранения');
      }
    } catch (error) {
      showError('Ошибка сохранения');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: number, specialistName: string) => {
    const confirmed = await confirmDialog.confirm({
      title: 'Удаление специалиста',
      message: `Вы уверены, что хотите удалить специалиста "${specialistName}"? Это действие нельзя отменить.`,
      confirmText: 'Удалить',
      cancelText: 'Отмена',
      variant: 'danger',
    });

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/admin/specialists/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        await loadData();
        success('Специалист удален');
      } else {
        const error = await res.json();
        showError(error.error || 'Ошибка удаления');
      }
    } catch (error) {
      showError('Ошибка удаления');
    }
  };

  // Loading state - показываем skeleton с блюром пока проверяем права
  if (status === 'loading' || hasAdminRole === null || sessionLoading || isCheckingRole) {
    return <AdminAccessSkeleton />;
  }

  // Not admin - show 404 (только после завершения проверки)
  if (status === 'unauthenticated' || hasAdminRole === false) {
    return <NotFound />;
  }

  // Admin login form (only if session not verified)
  if (!sessionVerified) {
    return <AdminAuthForm onSuccess={handleAuthSuccess} />;
  }

  // Admin panel
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminMenu />

      <div className="flex-1 p-4 lg:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <AdminSection
            title="Специалисты"
            icon={Users}
            count={specialists.length}
            loading={loading}
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            onAdd={handleAdd}
            addButtonText="Добавить специалиста"
          >
            {filteredSpecialists.length === 0 ? (
              <EmptyState
                icon={Users}
                title="Специалисты не найдены"
                description={searchQuery ? 'Попробуйте изменить поисковый запрос' : 'Добавьте первого специалиста'}
                actionText={!searchQuery ? 'Добавить специалиста' : undefined}
                onAction={!searchQuery ? handleAdd : undefined}
              />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  <AnimatePresence>
                    {paginatedSpecialists.map((specialist) => (
                      <ItemCard key={specialist.id}>
                        <div className="flex gap-4">
                          {/* Photo */}
                          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                            <ImageWithFallback
                              src={specialist.image_url}
                              alt={specialist.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-800 truncate">{specialist.name}</h3>
                            <p className="text-sm text-gray-500 truncate">{specialist.specialization}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="primary">{specialist.category.name}</Badge>
                              <Badge variant="secondary">{specialist.experience} лет</Badge>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                          <span className="text-xs text-gray-400">{specialist.qualification}</span>
                          <CardActions
                            onEdit={() => handleEdit(specialist)}
                            onDelete={() => handleDelete(specialist.id, specialist.name)}
                          />
                        </div>
                      </ItemCard>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    className="mt-6"
                  />
                )}
              </>
            )}
          </AdminSection>

          {/* Form Modal */}
          <FormModal
            isOpen={isModalOpen}
            onClose={resetForm}
            title={editingSpecialist ? 'Редактирование специалиста' : 'Новый специалист'}
            onSubmit={handleSave}
            loading={formLoading}
            disabled={!formData.name || !formData.specialization || !formData.category_id}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="ФИО" required>
                <FormInput
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Иванов Иван Иванович"
                />
              </FormField>

              <FormField label="Специализация" required>
                <FormInput
                  type="text"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  placeholder="Стоматолог-терапевт"
                />
              </FormField>

              <FormField label="Квалификация" required>
                <FormInput
                  type="text"
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  placeholder="Врач высшей категории"
                />
              </FormField>

              <FormField label="Категория" required>
                <FormSelect
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                >
                  <option value="">Выберите категорию</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </FormSelect>
              </FormField>

              <FormField label="Стаж (лет)" required>
                <FormInput
                  type="number"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="10"
                />
              </FormField>

              <FormField label="Рейтинг (1-5)">
                <FormInput
                  type="number"
                  min="1"
                  max="5"
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                />
              </FormField>

              <div className="md:col-span-2">
                <FormField label="Фото специалиста">
                  <ImageUploader
                    value={formData.image_url}
                    onChange={(url) => setFormData({ ...formData, image_url: url })}
                    folder="smartmedical/specialists"
                    placeholder="Загрузите фото специалиста"
                    maxSizeMB={10}
                  />
                </FormField>
              </div>

              <div className="md:col-span-2">
                <FormField label="Направления (каждое с новой строки)">
                  <FormTextarea
                    value={formData.specializations}
                    onChange={(e) => setFormData({ ...formData, specializations: e.target.value })}
                    rows={3}
                    placeholder="Терапевтическая стоматология&#10;Эстетическая реставрация"
                  />
                </FormField>
              </div>

              <div className="md:col-span-2">
                <FormField label="Образование (каждое с новой строки)">
                  <FormTextarea
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    rows={3}
                    placeholder="МГУ, Медицинский факультет, 2010&#10;Ординатура по стоматологии, 2012"
                  />
                </FormField>
              </div>

              <div className="md:col-span-2">
                <FormField label="Конференции (каждая с новой строки)">
                  <FormTextarea
                    value={formData.conferences}
                    onChange={(e) => setFormData({ ...formData, conferences: e.target.value })}
                    rows={3}
                    placeholder="Международная конференция стоматологов 2023&#10;DentalTech Summit 2024&#10;European Dental Congress 2024"
                  />
                </FormField>
              </div>
            </div>
          </FormModal>

          {/* Confirm Dialog */}
          <ConfirmDialog
            isOpen={confirmDialog.isOpen}
            onClose={confirmDialog.handleCancel}
            onConfirm={confirmDialog.handleConfirm}
            title={confirmDialog.options.title}
            message={confirmDialog.options.message}
            confirmText={confirmDialog.options.confirmText}
            cancelText={confirmDialog.options.cancelText}
            variant={confirmDialog.options.variant}
            loading={confirmDialog.loading}
          />
        </div>
      </div>
    </div>
  );
}

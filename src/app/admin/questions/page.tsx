'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { AnimatePresence } from 'framer-motion';
import { HelpCircle, Loader2 } from 'lucide-react';
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
import NotFound from '../../not-found';
import { AdminAuthForm } from '@/components/SMAdmin/SMAdminAuthForm';
import { useAdminSession } from '@/hooks/useAdminSession';
import { AdminAccessSkeleton, AdminQuestionsGridSkeleton } from '@/components/SMAdmin/SMAdminSkeleton';
import { ConfirmDialog } from '@/components/SMAdmin/SMConfirmDialog';
import { useConfirmDialog } from '@/hooks/useConfirmDialog';
import { useAlert } from '@/components/common/SMAlert';

interface Question {
  id: number;
  question: string;
  answer: string | null;
  category: string | null;
  service_id: number | null;
  service: {
    id: number;
    title: string;
  } | null;
}

interface Service {
  id: number;
  title: string;
}

// Захардкоженные категории FAQ (соответствуют категориям на странице Клиники)
const FAQ_CATEGORIES: Record<string, string> = {
  'children-teeth': 'Детские зубы',
  'girls-hygiene': 'Гигиена девочек',
  'boys-hygiene': 'Гигиена мальчиков',
  'girls-puberty': 'Половое созревание девочек',
  'culdocentesis': 'Кульдоцентез',
  'stomatology': 'Стоматология',
  'polyp-removal': 'Удаления полипов | Полипэктомия',
  'ultrasound': 'УЗИ',
  'womens-health': 'Женское здоровье',
  'curettage': 'Раздельное диагностическое выскабливание',
};

// Функция для получения русского названия категории
const getCategoryLabel = (category: string | null): string => {
  if (!category) return '';
  return FAQ_CATEGORIES[category] || category;
};

export default function AdminQuestionsPage() {
  const { status } = useSession();
  const { sessionVerified, isLoading: sessionLoading, verifySession } = useAdminSession();
  const [hasAdminRole, setHasAdminRole] = useState<boolean | null>(null);
  const confirmDialog = useConfirmDialog();
  const { success, error: showError } = useAlert();

  // Data states
  const [questions, setQuestions] = useState<Question[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: '',
    service_id: '',
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
    try {
      const res = await fetch('/api/admin/auth');
      const data = await res.json();
      setHasAdminRole(data.isAdmin);
    } catch (error) {
      setHasAdminRole(false);
    }
  };

  const handleAuthSuccess = () => {
    verifySession();
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [questionsRes, servicesRes] = await Promise.all([
        fetch('/api/admin/questions'),
        fetch('/api/services'),
      ]);

      if (questionsRes.ok) {
        const data = await questionsRes.json();
        setQuestions(data);
      }

      if (servicesRes.ok) {
        const data = await servicesRes.json();
        setServices(data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filtered questions
  const filteredQuestions = useMemo(() => {
    if (!searchQuery) return questions;
    const query = searchQuery.toLowerCase();
    return questions.filter(
      (q) =>
        q.question.toLowerCase().includes(query) ||
        q.answer?.toLowerCase().includes(query) ||
        getCategoryLabel(q.category).toLowerCase().includes(query)
    );
  }, [questions, searchQuery]);

  // Form handlers
  const resetForm = () => {
    setFormData({
      question: '',
      answer: '',
      category: '',
      service_id: '',
    });
    setEditingQuestion(null);
    setIsModalOpen(false);
  };

  const handleAdd = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
    setFormData({
      question: question.question,
      answer: question.answer || '',
      category: question.category || '',
      service_id: question.service_id?.toString() || '',
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    setFormLoading(true);
    try {
      const url = editingQuestion
        ? `/api/admin/questions/${editingQuestion.id}`
        : '/api/admin/questions';

      const method = editingQuestion ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        await loadData();
        resetForm();
        success(editingQuestion ? 'Вопрос обновлен' : 'Вопрос создан');
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

  const handleDelete = async (id: number, questionText: string) => {
    const confirmed = await confirmDialog.confirm({
      title: 'Удаление вопроса',
      message: `Вы уверены, что хотите удалить вопрос "${questionText.substring(0, 50)}${questionText.length > 50 ? '...' : ''}"? Это действие нельзя отменить.`,
      confirmText: 'Удалить',
      cancelText: 'Отмена',
      variant: 'danger',
    });

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/admin/questions/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        await loadData();
        success('Вопрос удален');
      } else {
        const error = await res.json();
        showError(error.error || 'Ошибка удаления');
      }
    } catch (error) {
      showError('Ошибка удаления');
    }
  };

  // Loading state
  if (status === 'loading' || hasAdminRole === null || sessionLoading) {
    return <AdminAccessSkeleton />;
  }

  // Not admin - show 404
  if (status === 'unauthenticated' || !hasAdminRole) {
    return <NotFound />;
  }

  // Admin login form (only if session not verified)
  if (!sessionVerified) {
    return <AdminAuthForm onSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminMenu />

      <div className="flex-1 p-4 lg:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <AdminSection
            title="Вопросы (FAQ)"
            icon={HelpCircle}
            count={questions.length}
            loading={loading}
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            onAdd={handleAdd}
            addButtonText="Добавить вопрос"
            loadingSkeleton={<AdminQuestionsGridSkeleton count={12} />}
          >
            {filteredQuestions.length === 0 ? (
              <EmptyState
                icon={HelpCircle}
                title="Вопросы не найдены"
                description={searchQuery ? 'Попробуйте изменить поисковый запрос' : 'Добавьте первый вопрос'}
                actionText={!searchQuery ? 'Добавить вопрос' : undefined}
                onAction={!searchQuery ? handleAdd : undefined}
              />
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {filteredQuestions.map((question) => (
                    <ItemCard key={question.id}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          {/* Question */}
                          <h3 className="font-semibold text-gray-800 mb-2">{question.question}</h3>

                          {/* Answer */}
                          {question.answer && (
                            <p className="text-sm text-gray-500 line-clamp-2 mb-3">{question.answer}</p>
                          )}

                          {/* Tags */}
                          <div className="flex items-center gap-2 flex-wrap">
                            {question.category && (
                              <Badge variant="primary">{getCategoryLabel(question.category)}</Badge>
                            )}
                            {question.service && (
                              <Badge variant="secondary">{question.service.title}</Badge>
                            )}
                            {!question.answer && (
                              <Badge variant="warning">Без ответа</Badge>
                            )}
                          </div>
                        </div>

                        <CardActions
                          onEdit={() => handleEdit(question)}
                          onDelete={() => handleDelete(question.id, question.question)}
                        />
                      </div>
                    </ItemCard>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </AdminSection>

          {/* Form Modal */}
          <FormModal
            isOpen={isModalOpen}
            onClose={resetForm}
            title={editingQuestion ? 'Редактирование вопроса' : 'Новый вопрос'}
            onSubmit={handleSave}
            loading={formLoading}
            disabled={!formData.question}
          >
            <div className="space-y-6">
              <FormField label="Вопрос" required>
                <FormTextarea
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  rows={2}
                  placeholder="Введите вопрос"
                />
              </FormField>

              <FormField label="Ответ">
                <FormTextarea
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  rows={4}
                  placeholder="Введите ответ на вопрос"
                />
              </FormField>

              <FormField label="Категория FAQ (для страницы Клиника)">
                <FormSelect
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="">Не выбрано</option>
                  {Object.entries(FAQ_CATEGORIES).map(([slug, name]) => (
                    <option key={slug} value={slug}>
                      {name}
                    </option>
                  ))}
                </FormSelect>
              </FormField>

              <FormField label="Привязка к услуге (опционально)">
                <FormSelect
                  value={formData.service_id}
                  onChange={(e) => setFormData({ ...formData, service_id: e.target.value })}
                >
                  <option value="">Не привязан к услуге</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.title}
                    </option>
                  ))}
                </FormSelect>
              </FormField>
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

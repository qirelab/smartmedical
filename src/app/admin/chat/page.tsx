'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AdminAccessSkeleton } from '@/components/SMAdmin/SMAdminSkeleton';
import { MessagesSquare, Clock, User, CheckCheck, MessageCircle, Ban, UserX, Loader2, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/common/SMBadge/SMBadge';
import { Button } from '@/components/common/SMButton/SMButton';
import { ChatModal } from '@/components/SMAdmin/ChatModal';
import { useAlert } from '@/components/common/SMAlert/AlertProvider';
import { Pagination } from '@/components/common/SMPagination/SMPagination';

interface ChatMessage {
  id: number;
  chat_id: number;
  sender_id: number;
  sender_type: 'patient' | 'operator';
  content: string;
  created_at: string;
  is_read: boolean;
}

interface Chat {
  id: number;
  patient_id: number;
  operator_id: number | null;
  status: 'WAITING' | 'ACTIVE' | 'CLOSED';
  created_at: string;
  updated_at: string;
  last_message_at: string | null;
  has_unread_operator: boolean;
  has_unread_patient: boolean;
  patient: {
    id: number;
    name: string;
    email: string;
    avatar_url: string | null;
    is_messages_blocked: boolean;
  };
  operator: {
    id: number;
    name: string;
  } | null;
  messages: ChatMessage[];
}

interface BlockedUser {
  id: number;
  name: string;
  email: string;
  avatar_url: string | null;
  phone: string | null;
  registration_date: string;
}

export default function AdminChatPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const alert = useAlert();

  const [hasAdminRole, setHasAdminRole] = useState<boolean | null>(null);
  const [isCheckingRole, setIsCheckingRole] = useState(true);
  const [chats, setChats] = useState<Chat[]>([]);
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'WAITING' | 'ACTIVE' | 'CLOSED' | 'BLOCKED'>('ALL');
  const [unblockingUserId, setUnblockingUserId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  // Check admin role
  const checkAdminRole = useCallback(async () => {
    setIsCheckingRole(true);
    try {
      const res = await fetch('/api/admin/auth');
      const data = await res.json();
      setHasAdminRole(data.isAdmin || false);
    } catch (error) {
      console.error('Error checking admin role:', error);
      setHasAdminRole(false);
    } finally {
      setIsCheckingRole(false);
    }
  }, []);

  useEffect(() => {
    if (status === 'authenticated') {
      checkAdminRole();
    } else if (status === 'unauthenticated') {
      setIsCheckingRole(false);
      setHasAdminRole(false);
    }
  }, [status, checkAdminRole]);

  // Load chats
  const loadChats = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/operator-chat');
      if (response.ok) {
        const data = await response.json();
        setChats(data.chats || []);
      } else {
        alert.error('Не удалось загрузить чаты', 'Ошибка');
      }
    } catch (error) {
      console.error('Error loading chats:', error);
      alert.error('Ошибка при загрузке чатов', 'Ошибка');
    } finally {
      setLoading(false);
    }
  }, [alert]);

  // Load blocked users
  const loadBlockedUsers = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/blocked-users');
      if (response.ok) {
        const data = await response.json();
        setBlockedUsers(data.users || []);
      } else {
        alert.error('Не удалось загрузить заблокированных пользователей', 'Ошибка');
      }
    } catch (error) {
      console.error('Error loading blocked users:', error);
      alert.error('Ошибка при загрузке заблокированных пользователей', 'Ошибка');
    }
  }, [alert]);

  // Unblock user
  const handleUnblockUser = async (userId: number) => {
    setUnblockingUserId(userId);
    try {
      const response = await fetch('/api/admin/blocked-users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientId: userId }),
      });

      if (response.ok) {
        alert.success('Пользователь разблокирован', 'Успех');
        loadBlockedUsers(); // Reload blocked users
      } else {
        const data = await response.json();
        alert.error(data.error || 'Не удалось разблокировать пользователя', 'Ошибка');
      }
    } catch (error) {
      console.error('Error unblocking user:', error);
      alert.error('Ошибка при разблокировке пользователя', 'Ошибка');
    } finally {
      setUnblockingUserId(null);
    }
  };

  useEffect(() => {
    if (hasAdminRole) {
      loadChats();
      loadBlockedUsers();
      // Автообновление убрано - список обновляется через уведомления и при закрытии модалки
    }
  }, [hasAdminRole, loadChats, loadBlockedUsers]);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/account?section=login');
    }
  }, [status, router]);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus]);

  // Show loading skeleton while checking role
  if (status === 'loading' || hasAdminRole === null || isCheckingRole) {
    return <AdminAccessSkeleton />;
  }

  // Redirect to home if no admin access
  if (!hasAdminRole) {
    router.push('/');
    return <AdminAccessSkeleton />;
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'WAITING':
        return <Badge variant="outline" className="border-amber-400 text-amber-700 bg-amber-50">Ожидает</Badge>;
      case 'ACTIVE':
        return <Badge variant="default" className="bg-emerald-500 text-white border-transparent shadow-sm">Активный</Badge>;
      case 'CLOSED':
        return <Badge variant="secondary" className="bg-gray-200 text-gray-700">Закрыт</Badge>;
      default:
        return null;
    }
  };

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffInMinutes = Math.floor((now.getTime() - messageDate.getTime()) / 60000);

    if (diffInMinutes < 1) return 'только что';
    if (diffInMinutes < 60) return `${diffInMinutes} мин назад`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} ч назад`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} д назад`;
  };

  // Фильтрация - исключаем заблокированных из обычных чатов
  let filteredChats = filterStatus === 'ALL'
    ? chats
    : chats.filter(chat => chat.status === filterStatus);

  const waitingCount = chats.filter(c => c.status === 'WAITING').length;
  const activeCount = chats.filter(c => c.status === 'ACTIVE').length;
  const blockedCount = blockedUsers.length;

  // Pagination for chats
  const totalChatPages = Math.ceil(filteredChats.length / ITEMS_PER_PAGE);
  const paginatedChats = filteredChats.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Pagination for blocked users
  const totalBlockedPages = Math.ceil(blockedUsers.length / ITEMS_PER_PAGE);
  const paginatedBlockedUsers = blockedUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                <MessagesSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Чат с пациентами</h1>
                <p className="text-xs sm:text-sm text-gray-600">Управление обращениями</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => router.push('/admin')}
              className="flex items-center gap-2 hover:bg-gray-50 self-start sm:self-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Назад в админ-панель</span>
              <span className="sm:hidden">Назад</span>
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filterStatus === 'ALL' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('ALL')}
              className={filterStatus === 'ALL' ? 'bg-emerald-500 hover:bg-emerald-600 shadow-sm text-white' : 'hover:bg-gray-50'}
            >
              Все ({chats.length})
            </Button>
            <Button
              variant={filterStatus === 'WAITING' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('WAITING')}
              className={filterStatus === 'WAITING' ? 'bg-emerald-500 hover:bg-emerald-600 shadow-sm text-white' : 'hover:bg-gray-50'}
            >
              Ожидают ({waitingCount})
            </Button>
            <Button
              variant={filterStatus === 'ACTIVE' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('ACTIVE')}
              className={filterStatus === 'ACTIVE' ? 'bg-emerald-500 hover:bg-emerald-600 shadow-sm text-white' : 'hover:bg-gray-50'}
            >
              Активные ({activeCount})
            </Button>
            <Button
              variant={filterStatus === 'CLOSED' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('CLOSED')}
              className={filterStatus === 'CLOSED' ? 'bg-emerald-500 hover:bg-emerald-600 shadow-sm text-white' : 'hover:bg-gray-50'}
            >
              Закрытые
            </Button>
            <Button
              variant={filterStatus === 'BLOCKED' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('BLOCKED')}
              className={filterStatus === 'BLOCKED' ? 'bg-red-500 hover:bg-red-600 shadow-sm text-white' : 'hover:bg-gray-50 text-red-600 border-red-300'}
            >
              Заблокированные ({blockedCount})
            </Button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg p-6 border border-gray-200 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : filterStatus === 'BLOCKED' ? (
          // Blocked Users Cards
          blockedUsers.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Нет заблокированных пользователей
              </h3>
              <p className="text-gray-600">
                Заблокированные пользователи появятся здесь
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedBlockedUsers.map((user) => (
                <div
                  key={user.id}
                  className="bg-white rounded-xl p-5 border-2 border-red-300 bg-red-50/20 shadow-sm"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {user.avatar_url ? (
                        <img
                          src={user.avatar_url}
                          alt={user.name}
                          className="w-12 h-12 rounded-full object-cover shadow-sm"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center shadow-sm">
                          <User className="w-6 h-6 text-white" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-900">{user.name}</h3>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="mb-4">
                    <Badge variant="secondary" className="bg-red-100 text-red-700 border-red-300 mb-2">
                      <Ban className="w-3 h-3 mr-1" />
                      Заблокирован
                    </Badge>
                    {user.phone && (
                      <p className="text-sm text-gray-600 mt-2">{user.phone}</p>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{new Date(user.registration_date).toLocaleDateString('ru-RU')}</span>
                    </div>
                    <Button
                      onClick={() => handleUnblockUser(user.id)}
                      disabled={unblockingUserId === user.id}
                      className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1.5 flex items-center gap-1.5"
                    >
                      {unblockingUserId === user.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <UserX className="w-3.5 h-3.5" />
                      )}
                      Разблокировать
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination for blocked users */}
            {totalBlockedPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalBlockedPages}
                onPageChange={setCurrentPage}
                className="mt-6"
              />
            )}
          </>
          )
        ) : (
          // Chat Cards
          filteredChats.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {filterStatus === 'ALL' && 'Нет чатов'}
                {filterStatus === 'WAITING' && 'Нет ожидающих чатов'}
                {filterStatus === 'ACTIVE' && 'Нет активных чатов'}
                {filterStatus === 'CLOSED' && 'Нет закрытых чатов'}
              </h3>
              <p className="text-gray-600">
                {filterStatus === 'WAITING' && 'Когда пациенты напишут, их чаты появятся здесь'}
                {filterStatus === 'ACTIVE' && 'Нет активных чатов в данный момент'}
                {filterStatus === 'CLOSED' && 'Нет закрытых чатов'}
                {filterStatus === 'ALL' && 'Чаты появятся когда пациенты начнут писать'}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedChats.map((chat) => (
                <div
                  key={chat.id}
                  className={`bg-white rounded-xl p-5 border-2 transition-all cursor-pointer ${
                    chat.has_unread_operator
                      ? 'border-emerald-400 bg-emerald-50/30 shadow-sm hover:shadow-md'
                      : 'border-gray-200 hover:border-emerald-300 hover:shadow-md'
                  }`}
                  onClick={() => setSelectedChatId(chat.id)}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {chat.patient.avatar_url ? (
                        <img
                          src={chat.patient.avatar_url}
                          alt={chat.patient.name}
                          className="w-12 h-12 rounded-full object-cover shadow-sm"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-sm">
                          <User className="w-6 h-6 text-white" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-900">{chat.patient.name}</h3>
                        <p className="text-xs text-gray-500">{chat.patient.email}</p>
                      </div>
                    </div>
                    {chat.has_unread_operator && (
                      <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                    )}
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    {getStatusBadge(chat.status)}
                    {chat.operator && (
                      <span className="text-xs text-gray-500">
                        Оператор: {chat.operator.name}
                      </span>
                    )}
                  </div>

                  {/* Last Message */}
                  {chat.messages.length > 0 && (
                    <div className="mb-3">
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {chat.messages[0].content}
                      </p>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{chat.last_message_at ? getTimeAgo(chat.last_message_at) : 'Нет сообщений'}</span>
                    </div>
                    {chat.has_unread_operator ? (
                      <span className="text-emerald-600 font-semibold">Новое</span>
                    ) : (
                      <CheckCheck className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination for chats */}
            {totalChatPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalChatPages}
                onPageChange={setCurrentPage}
                className="mt-6"
              />
            )}
          </>
          )
        )}
      </div>

      {/* Chat Modal */}
      {selectedChatId && (
        <ChatModal
          chatId={selectedChatId}
          onClose={() => {
            setSelectedChatId(null);
            loadChats(); // Перезагружаем список чатов после закрытия
            loadBlockedUsers(); // Перезагружаем заблокированных пользователей
          }}
        />
      )}
    </div>
  );
}

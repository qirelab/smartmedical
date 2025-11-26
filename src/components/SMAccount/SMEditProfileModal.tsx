'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../common/SMDialog/SMDialog';
import { Button } from '../common/SMButton/SMButton';
import { Input } from '../common/SMInput/SMInput';
import { Label } from '../common/SMLabel/SMLabel';
import {
  User,
  Mail,
  Phone,
  AtSign,
  Camera,
  Trash2,
  Save,
  Loader2,
  Lock
} from 'lucide-react';
import { useAlert } from '../common/SMAlert/AlertProvider';
import { AvatarCropModal } from './SMAvatarCropModal';
import { ChangePasswordModal } from './SMChangePasswordModal';

interface UserData {
  id: number;
  login: string;
  email: string;
  name: string;
  phone: string;
  registration_date: string;
  avatar_url?: string | null;
}

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserData | null;
  onProfileUpdate: (updatedUser: UserData) => void;
}

export function EditProfileModal({ isOpen, onClose, user, onProfileUpdate }: EditProfileModalProps) {
  const alert = useAlert();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    login: '',
  });
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (user && isOpen) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        login: user.login || '',
      });
      setAvatarUrl(user.avatar_url || null);
    }
  }, [user, isOpen]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatPhoneNumber = (value: string) => {
    // Убираем все символы кроме цифр
    const numbers = value.replace(/\D/g, '');

    // Форматируем для белорусского номера
    if (numbers.startsWith('375')) {
      const rest = numbers.slice(3);
      if (rest.length <= 2) return `+375 (${rest}`;
      if (rest.length <= 5) return `+375 (${rest.slice(0, 2)}) ${rest.slice(2)}`;
      if (rest.length <= 7) return `+375 (${rest.slice(0, 2)}) ${rest.slice(2, 5)}-${rest.slice(5)}`;
      return `+375 (${rest.slice(0, 2)}) ${rest.slice(2, 5)}-${rest.slice(5, 7)}-${rest.slice(7, 9)}`;
    }

    return value;
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Проверяем тип файла
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert.error('Недопустимый формат файла. Разрешены: JPEG, PNG, GIF, WebP', 'Ошибка');
        return;
      }

      // Проверяем размер файла (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert.error('Размер файла не должен превышать 5MB', 'Ошибка');
        return;
      }

      setSelectedFile(file);
      setShowCropModal(true);
    }
    // Сбрасываем input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAvatarSave = async (croppedBlob: Blob) => {
    setShowCropModal(false);
    setIsUploadingAvatar(true);

    try {
      const formData = new FormData();
      formData.append('avatar', croppedBlob, 'avatar.png');

      const response = await fetch('/api/auth/avatar', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setAvatarUrl(data.avatar_url);
        alert.success('Аватар успешно загружен', 'Успех');
      } else {
        alert.error(data.error || 'Ошибка при загрузке аватара', 'Ошибка');
      }
    } catch (error) {
      alert.error('Произошла ошибка при загрузке аватара', 'Ошибка');
    } finally {
      setIsUploadingAvatar(false);
      setSelectedFile(null);
    }
  };

  const handleAvatarDelete = async () => {
    setIsUploadingAvatar(true);

    try {
      const response = await fetch('/api/auth/avatar', {
        method: 'DELETE',
      });

      if (response.ok) {
        setAvatarUrl(null);
        alert.success('Аватар успешно удален', 'Успех');
      } else {
        const data = await response.json();
        alert.error(data.error || 'Ошибка при удалении аватара', 'Ошибка');
      }
    } catch (error) {
      alert.error('Произошла ошибка при удалении аватара', 'Ошибка');
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert.success('Профиль успешно обновлен', 'Успех');
        onProfileUpdate(data.user);
        onClose();
      } else {
        alert.error(data.error || 'Ошибка при обновлении профиля', 'Ошибка');
      }
    } catch (error) {
      alert.error('Произошла ошибка при обновлении профиля', 'Ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  // Получаем инициалы пользователя (первая буква имени + первая буква фамилии)
  // Формат: "Фамилия Имя Отчество" -> parts[0]=Фамилия, parts[1]=Имя
  const getInitials = () => {
    if (!formData.name) return 'U';
    const parts = formData.name.trim().split(' ').filter(p => p.length > 0);
    if (parts.length >= 2) {
      // Имя (parts[1]) + Фамилия (parts[0])
      return `${parts[1][0]}${parts[0][0]}`.toUpperCase();
    }
    return parts[0]?.[0]?.toUpperCase() || 'U';
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl text-[#2E2E2E]">
              Редактирование профиля
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Измените данные вашего профиля
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-24 h-24 aspect-square rounded-full bg-[#18A36C] flex items-center justify-center overflow-hidden border-4 border-gray-100 shadow-lg flex-shrink-0">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="Avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-3xl text-white font-medium">
                      {getInitials()}
                    </span>
                  )}
                </div>
                {isUploadingAvatar && (
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  className="hidden"
                  onChange={handleFileSelect}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingAvatar}
                  className="border-[#18A36C] text-[#18A36C] hover:bg-[#18A36C] hover:text-white"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Загрузить фото
                </Button>
                {avatarUrl && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAvatarDelete}
                    disabled={isUploadingAvatar}
                    className="border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#18A36C]" />
                  ФИО
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Иванов Иван Иванович"
                  className="border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="login" className="text-gray-700 flex items-center gap-2">
                  <AtSign className="w-4 h-4 text-[#18A36C]" />
                  Логин
                </Label>
                <Input
                  id="login"
                  value={formData.login}
                  onChange={(e) => handleInputChange('login', e.target.value)}
                  placeholder="Ваш логин"
                  className="border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  Email
                  <span className="text-xs text-gray-400">(нельзя изменить)</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  disabled
                  className="border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  Телефон
                  <span className="text-xs text-gray-400">(нельзя изменить)</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  disabled
                  className="border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Change Password Button */}
            <div className="pt-2 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowChangePasswordModal(true)}
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <Lock className="w-4 h-4 mr-2" />
                Сменить пароль
              </Button>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full sm:w-auto border-gray-300"
            >
              Отмена
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full sm:w-auto bg-[#18A36C] hover:bg-[#18A36C]/90 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Сохранение...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Сохранить
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Avatar Crop Modal */}
      <AvatarCropModal
        isOpen={showCropModal}
        onClose={() => {
          setShowCropModal(false);
          setSelectedFile(null);
        }}
        onSave={handleAvatarSave}
        imageFile={selectedFile}
      />

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={showChangePasswordModal}
        onClose={() => setShowChangePasswordModal(false)}
      />
    </>
  );
}

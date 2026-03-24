'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Cookie, X } from 'lucide-react';
import Link from 'next/link';
import SMLogo from '@/icons/SMLogo';
import {
  readCookiePreferences,
  revokeTargetCookies,
  writeCookiePreferences,
} from '@/lib/cookieConsent';

type CookieView = 'banner' | 'settings';
type CookieSection = 'technical' | 'target';

export function CookieConsent() {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [view, setView] = useState<CookieView>('banner');
  const [targetEnabled, setTargetEnabled] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<CookieSection, boolean>>({
    technical: true,
    target: false,
  });
  const [hasSavedPreferences, setHasSavedPreferences] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const existing = readCookiePreferences();
    if (!existing) {
      setIsVisible(true);
      setView('banner');
      return;
    }

    setHasSavedPreferences(true);
    setTargetEnabled(existing.target);
  }, [isMounted]);

  useEffect(() => {
    const openSettings = () => {
      const existing = readCookiePreferences();
      setHasSavedPreferences(Boolean(existing));
      setTargetEnabled(Boolean(existing?.target));
      setView('settings');
      setIsVisible(true);
    };

    window.addEventListener('open-cookie-settings', openSettings);
    return () => window.removeEventListener('open-cookie-settings', openSettings);
  }, []);

  useEffect(() => {
    if (!isVisible || view !== 'settings') return;

    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;

    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
    };
  }, [isVisible, view]);

  const savePreferences = (preferences: { target: boolean }) => {
    writeCookiePreferences(preferences);
    if (!preferences.target) {
      revokeTargetCookies();
    }
    setHasSavedPreferences(true);
    setTargetEnabled(preferences.target);
    setIsVisible(false);
    setView('banner');
  };

  const handleClose = () => {
    if (view === 'settings' && !hasSavedPreferences) {
      setView('banner');
      return;
    }
    setIsVisible(false);
  };

  const toggleSection = (section: CookieSection) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (!isMounted) return null;

  return (
    <>
      {!isVisible && (
        <button
          onClick={() => {
            setView('banner');
            setIsVisible(true);
          }}
          className="fixed bottom-6 left-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#18A36C] text-white shadow-lg transition hover:bg-[#15905f] md:left-6"
          aria-label="Открыть настройки cookie"
        >
          <Cookie className="h-6 w-6" />
        </button>
      )}

      <AnimatePresence>
        {isVisible && (
          view === 'banner' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-0 left-0 right-0 z-50 h-[100px] border-t border-[#18A36C]/25 bg-white/80 px-4 text-[#2E2E2E] shadow-2xl backdrop-blur"
            >
              <button
                onClick={() => setIsVisible(false)}
                className="absolute right-0 top-0 rounded-bl-md bg-white/80 p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                aria-label="Закрыть баннер cookie"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex h-full w-full flex-col justify-center gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                  <div className="hidden md:block">
                    <SMLogo />
                  </div>
                  <div className="text-sm leading-6">
                    Для обеспечения корректной и удобной работы сайта doctorfamily.by, предоставления лучшего
                    пользовательского опыта и анализа интереса пользователей к услугам ООО "Доктор Фемели"
                    используются файлы cookie.
                  </div>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <button
                    onClick={() => savePreferences({ target: true })}
                    className="rounded-lg bg-[#18A36C] px-4 py-2 text-sm font-semibold text-white hover:bg-[#15905f]"
                  >
                    Согласен со всеми
                  </button>
                  <button
                    onClick={() => savePreferences({ target: false })}
                    className="rounded-lg border border-[#18A36C] bg-white px-4 py-2 text-sm font-semibold text-[#18A36C] hover:bg-[#18A36C]/5"
                  >
                    Отклонить
                  </button>
                  <button
                    onClick={() => setView('settings')}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-[#2E2E2E] hover:bg-gray-50"
                  >
                    Настройки
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-end justify-center bg-black/35 p-4 sm:items-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                  <h4 className="text-2xl font-semibold text-[#1F2937]">Настройка файлов cookie</h4>
                  <button
                    onClick={handleClose}
                    className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    aria-label="Закрыть настройки cookie"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="max-h-[65vh] overflow-y-auto px-5 py-4">
                  <p className="mb-4 text-sm leading-6 text-[#4B5563]">
                    Для корректной и удобной работы сайта мы используем файлы cookie. Ниже вы можете выбрать,
                    разрешить ли использование целевых/маркетинговых cookie.
                  </p>
                  <p className="mb-4 text-sm leading-6 text-[#4B5563]">
                    Подробнее:{' '}
                    <Link href="/cookie-policy" className="text-[#18A36C] underline-offset-2 hover:underline">
                      Политика в отношении файлов cookie
                    </Link>{' '}
                    и{' '}
                    <Link href="/privacy-policy" className="text-[#18A36C] underline-offset-2 hover:underline">
                      Политика по обработке персональных данных
                    </Link>
                    .
                  </p>

                  <div className="space-y-3">
                    <div className="overflow-hidden rounded-lg border border-gray-200">
                      <button
                        onClick={() => toggleSection('technical')}
                        className="flex w-full items-center justify-between bg-[#F3F4F6] px-4 py-3 text-left text-lg text-[#1F2937]"
                      >
                        <span>Технические файлы cookie</span>
                        {expandedSections.technical ? (
                          <ChevronUp className="h-4 w-4 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                      <AnimatePresence initial={false}>
                        {expandedSections.technical && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="bg-white px-4 py-4 text-base leading-7 text-[#2E2E2E]">
                              <p className="mb-4">
                                Технические файлы cookie обеспечивают нормальную работу функций сайта.
                                ООО "Доктор Фемели" использует собственные технические файлы cookie,
                                а также технические файлы cookie автоматизированной платформы безопасности.
                              </p>
                              <p>
                                Технические файлы cookie используются на сайте doctorfamily.by исключительно
                                в технических целях, всегда включены и не могут быть деактивированы.
                                В противном случае сайт будет работать некорректно.
                              </p>
                              <p className="mt-4">
                                Технические файлы cookie хранятся не дольше 13 месяцев с момента их установки
                                в браузере пользователя.
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="overflow-hidden rounded-lg border border-gray-200">
                      <button
                        onClick={() => toggleSection('target')}
                        className="flex w-full items-center justify-between bg-[#F3F4F6] px-4 py-3 text-left text-lg text-[#1F2937]"
                      >
                        <span>Целевые (маркетинговые) файлы cookie</span>
                        {expandedSections.target ? (
                          <ChevronUp className="h-4 w-4 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                      <AnimatePresence initial={false}>
                        {expandedSections.target && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="bg-white px-4 py-4 text-base leading-7 text-[#2E2E2E]">
                              <p className="mb-4">
                                Данный тип файлов cookie включает аналитику и маркетинговые технологии:
                                веб-аналитику, ретаргетинг, пиксели социальных сетей, коллтрекинг и иные
                                необязательные сервисы.
                              </p>
                              <p className="mb-4">
                                До получения согласия пользователя такие cookie не загружаются и не создаются.
                                При отказе или отзыве согласия обработка прекращается.
                              </p>
                              <p className="mb-4">
                                Срок хранения целевых файлов cookie — не более 2 лет с момента установки
                                в браузере пользователя.
                              </p>
                              <div className="mt-2 flex items-center gap-6 text-base">
                                <label className="flex cursor-pointer items-center gap-2">
                                  <input
                                    type="radio"
                                    name="target-cookie-choice"
                                    checked={targetEnabled}
                                    onChange={() => setTargetEnabled(true)}
                                    className="h-4 w-4 accent-[#18A36C]"
                                  />
                                  Принять
                                </label>
                                <label className="flex cursor-pointer items-center gap-2">
                                  <input
                                    type="radio"
                                    name="target-cookie-choice"
                                    checked={!targetEnabled}
                                    onChange={() => setTargetEnabled(false)}
                                    className="h-4 w-4 accent-[#18A36C]"
                                  />
                                  Отклонить
                                </label>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-5 py-4">
                  <div className="flex flex-wrap justify-end gap-2">
                    <button
                      onClick={() => savePreferences({ target: false })}
                      className="rounded-lg border border-[#18A36C] px-4 py-2 text-sm font-medium text-[#18A36C] hover:bg-[#18A36C]/5"
                    >
                      Только необходимые
                    </button>
                    <button
                      onClick={() => savePreferences({ target: targetEnabled })}
                      className="rounded-lg bg-[#18A36C] px-6 py-2 text-base font-semibold text-white hover:bg-[#15905f]"
                    >
                      Сохранить настройки
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </>
  );
}

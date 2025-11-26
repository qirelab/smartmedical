'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, FileText, Users, Star, Building2, HelpCircle, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../common/SMButton/SMButton';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '../common/SMSheet/SMSheet';
import { Tooltip, TooltipTrigger, TooltipContent } from '../common/SMTooltip/SMTooltip';
import { useRouter } from '../SMRouter/SMRouter';
import { useMenu } from '../SMMenuContext/SMMenuContext';

interface MenuItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

const menuData: MenuItem[] = [
  {
    id: 'licenses',
    title: 'Лицензии',
    icon: <FileText className="w-4 h-4" />,
    children: []
  },
  {
    id: 'partners',
    title: 'Партнёры',
    icon: <Users className="w-4 h-4" />,
    children: [
      { id: 'medical-labs', title: 'Медицинские лаборатории' },
      { id: 'insurance', title: 'Страховые компании' },
      { id: 'dental-labs', title: 'Зуботехнические лаборатории' }
    ]
  },
  {
    id: 'reviews',
    title: 'Отзывы',
    icon: <Star className="w-4 h-4" />,
    children: []
  },
  {
    id: 'requisites',
    title: 'Реквизиты',
    icon: <Building2 className="w-4 h-4" />,
    children: []
  },
  {
    id: 'faq',
    title: 'Вопрос ответ',
    icon: <HelpCircle className="w-4 h-4" />,
    children: [
      { id: 'children-teeth', title: 'Детские зубы' },
      { id: 'girls-hygiene', title: 'Гигиена девочек' },
      { id: 'boys-hygiene', title: 'Гигиена мальчиков' },
      { id: 'girls-puberty', title: 'Половое созревание девочек' },
      { id: 'culdocentesis', title: 'Кульдоцентез' },
      { id: 'stomatology', title: 'Стоматология' },
      { id: 'polyp-removal', title: 'Удаления полипов | Полипэктомия' },
      { id: 'ultrasound', title: 'УЗИ' },
      { id: 'womens-health', title: 'Женское здоровье' },
      { id: 'curettage', title: 'Раздельное диагностическое выскабливание' }
    ]
  },
  {
    id: 'vacancies',
    title: 'Вакансии',
    icon: <Briefcase className="w-4 h-4" />,
    children: []
  }
];

interface MenuItemProps {
  item: MenuItem;
  level: number;
  activeItem: string | null;
  onItemClick: (itemId: string, item: MenuItem) => void;
  expandedItems: Set<string>;
  onToggleExpand: (itemId: string) => void;
  currentRoute: string;
}

function MenuItemComponent({ item, level, activeItem, onItemClick, expandedItems, onToggleExpand, currentRoute }: MenuItemProps) {
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expandedItems.has(item.id);
  const isActive = activeItem === item.id;

  const isRouteActive = currentRoute.includes(`/clinic/${item.id}`);

  const paddingLeft = level === 0 ? 'pl-4' : level === 1 ? 'pl-8' : 'pl-12';

  return (
    <div className="px-2">
      <Button
        variant="ghost"
        className={`w-full justify-start px-4 py-3 h-auto text-left transition-all duration-300 rounded-lg mb-1 ${isActive || isRouteActive
          ? 'bg-[#18A36C]/10 text-[#18A36C] shadow-sm'
          : 'text-gray-700 hover:bg-gray-50 hover:text-[#18A36C]'
          }`}
        onClick={() => {
          if (hasChildren) {
            onToggleExpand(item.id);
          } else {
            onItemClick(item.id, item);
          }
        }}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            {item.icon && (
              <div className={`transition-colors ${isActive || isRouteActive ? 'text-[#18A36C]' : 'text-gray-600'}`}>
                {item.icon}
              </div>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <span className={`text-sm lg:text-base transition-colors truncate max-w-[180px] ${isActive || isRouteActive ? 'text-[#18A36C] font-medium' : ''
                  }`}>
                  {item.title}
                </span>
              </TooltipTrigger>
              <TooltipContent side="right">
                {item.title}
              </TooltipContent>
            </Tooltip>
          </div>

          {hasChildren && (
            <ChevronRight
              className={`w-4 h-4 text-gray-400 transition-all duration-200 ${isExpanded ? 'rotate-90 text-[#18A36C]' : 'group-hover:text-[#18A36C] group-hover:translate-x-1'
                }`}
            />
          )}
        </div>
      </Button>

      <AnimatePresence initial={false}>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="bg-white">
              {item.children!.map((child) => (
                <div key={child.id}>
                  <MenuItemComponent
                    item={child}
                    level={level + 1}
                    activeItem={activeItem}
                    onItemClick={onItemClick}
                    expandedItems={expandedItems}
                    onToggleExpand={onToggleExpand}
                    currentRoute={currentRoute}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function NavigableClinicMenu() {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { navigate, currentRoute } = useRouter();
  const { isBurgerMenuOpen } = useMenu();

  // Auto-expand and select based on current route
  useEffect(() => {
    const routeParts = currentRoute.split('/').filter(Boolean);
    if (routeParts[0] === 'clinic' && routeParts.length >= 2) {
      const sectionId = routeParts[1];
      const itemId = routeParts[2] || sectionId;

      // Set active item
      setActiveItem(itemId);

      // Expand the parent section
      setExpandedItems(new Set([sectionId]));
    }
  }, [currentRoute]);

  const handleItemClick = (itemId: string, item: MenuItem) => {
    // Обновляем activeItem только если он изменился
    if (activeItem !== itemId) {
      setActiveItem(itemId);
    }

    let categoryId = '';
    let foundItem: MenuItem | null = null;

    const findCategory = (items: MenuItem[], parentId = ''): boolean => {
      for (const menuItem of items) {
        if (menuItem.id === itemId) {
          categoryId = parentId || menuItem.id;
          foundItem = item;
          return true;
        }
        if (menuItem.children && findCategory(menuItem.children, parentId || menuItem.id)) {
          return true;
        }
      }
      return false;
    };

    findCategory(menuData);

    if (foundItem) {
      // Если это элемент верхнего уровня (нет родителя), используем только itemId
      if (!categoryId || categoryId === itemId) {
        navigate(`/clinic/${itemId}`);
      } else {
        // Если это дочерний элемент, используем оба
        navigate(`/clinic/${categoryId}/${itemId}`);
      }
    }
  };

  const handleToggleExpand = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const MenuContent = ({ onItemClick: onItemClickProp }: { onItemClick?: (itemId: string, item: MenuItem) => void }) => (
    <div className="bg-white flex flex-col h-full overflow-hidden">
      <div className="p-4 lg:p-6 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#18A36C] to-[#15905f] rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div className="text-left flex-1 min-w-0 overflow-hidden">
            <h2 className="text-lg lg:text-xl font-semibold text-gray-800 whitespace-nowrap">Клиника</h2>
            <p className="text-xs lg:text-sm text-gray-500 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">Выберите нужный раздел</p>
          </div>
        </div>
      </div>

      <div className="py-2">
        {menuData.map((item) => (
          <MenuItemComponent
            key={item.id}
            item={item}
            level={0}
            activeItem={activeItem}
            onItemClick={onItemClickProp || handleItemClick}
            expandedItems={expandedItems}
            onToggleExpand={handleToggleExpand}
            currentRoute={currentRoute}
          />
        ))}
      </div>

      <div className="p-3 lg:p-4 mt-2 lg:mt-4 border-t border-[#E8E6E3] bg-white">
        <div className="text-center">
          <p className="text-xs text-gray-600 mb-2 lg:mb-3">Не нашли нужную информацию?</p>
          <Button
            size="sm"
            className="bg-[#18A36C] hover:bg-[#18A36C]/90 text-white w-full text-xs rounded-lg"
          >
            Связаться с нами
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden lg:block w-72 bg-white border-r border-[#E8E6E3] shadow-lg flex-shrink-0 sticky top-[80px] h-[calc(100vh-80px)] overflow-y-auto">
        <MenuContent />
      </div>

      <div className="lg:hidden fixed top-24 left-4 z-50">
        <Sheet open={mobileMenuOpen && !isBurgerMenuOpen} onOpenChange={(open) => !isBurgerMenuOpen && setMobileMenuOpen(open)}>
          <SheetTrigger asChild>
            <Button
              size="sm"
              disabled={isBurgerMenuOpen}
              className="bg-[#18A36C] hover:bg-[#18A36C]/90 text-white shadow-xl rounded-full w-14 h-14 p-0 transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Building2 className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0">
            <SheetHeader className="sr-only">
              <SheetTitle>Меню клиники</SheetTitle>
              <SheetDescription>Навигация по разделам клиники</SheetDescription>
            </SheetHeader>
            <MenuContent onItemClick={(itemId, item) => {
              handleItemClick(itemId, item);
              // Close the sheet after navigation (for leaf items)
              if (!item.children || item.children.length === 0) {
                setMobileMenuOpen(false);
              }
            }} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
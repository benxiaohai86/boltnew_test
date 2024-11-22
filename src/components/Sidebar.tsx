import React, { useEffect } from 'react';
import { Home, ListTodo, Calendar, Star, Settings, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activePage: string;
  onPageChange: (page: string) => void;
}

const menuItems = [
  { id: 'dashboard', icon: Home, label: 'Dashboard' },
  { id: 'tasks', icon: ListTodo, label: 'Tasks' },
  { id: 'calendar', icon: Calendar, label: 'Calendar' },
  { id: 'important', icon: Star, label: 'Important' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar({ isOpen, setIsOpen, activePage, onPageChange }: SidebarProps) {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsOpen]);

  const handleMenuClick = (pageId: string) => {
    onPageChange(pageId);
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static left-0 top-[73px] bottom-0 w-64 bg-white border-r z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex justify-between items-center p-4 lg:hidden">
          <h2 className="font-semibold text-gray-800">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activePage === item.id
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
                  }`}
                  onClick={() => handleMenuClick(item.id)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
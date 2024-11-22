import React from 'react';
import { Clover, Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import useToggle from './hooks/useToggle';
import useActivePage from './hooks/useActivePage';
import DashboardPage from './pages/DashboardPage';
import TasksPage from './pages/TasksPage';

function App() {
  const { isOpen, toggle, setIsOpen } = useToggle();
  const { activePage, setActivePage } = useActivePage();

  const renderPage = () => {
    switch (activePage) {
      case 'tasks':
        return <TasksPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <header className="fixed top-0 left-0 right-0 z-20 border-b bg-white/50 backdrop-blur-sm">
        <div className="px-4 py-4 flex items-center">
          <button
            onClick={toggle}
            className="p-2 hover:bg-gray-100 rounded-lg mr-2 lg:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <Clover className="w-6 h-6 text-emerald-500" />
            <span className="font-bold text-xl text-gray-800">luckyzc</span>
          </div>
        </div>
      </header>

      <div className="flex h-screen pt-[73px]">
        <Sidebar 
          isOpen={isOpen} 
          setIsOpen={setIsOpen}
          activePage={activePage}
          onPageChange={setActivePage}
        />
        
        <main className="flex-1 py-8 px-4 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
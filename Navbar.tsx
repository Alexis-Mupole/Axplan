import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTodoContext } from '../../features/todos/todoContext';
import { LayoutDashboard, ListTodo, FolderKanban, BarChart3, Settings, CheckCircle2, Sparkles, Home as HomeIcon } from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import { useTranslation } from '../../hooks/useTranslation';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { state } = useTodoContext();
  const location = useLocation();
  const { t } = useTranslation();

  const totalTodos = state.todos.length;
  const completedTodos = state.todos.filter(t => t.completed).length;
  const efficiency = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  const navItems = [
    { label: t('dashboard'), icon: LayoutDashboard, path: ROUTES.HOME },
    { label: t('myTasks'), icon: ListTodo, path: ROUTES.TODOS },
    { label: t('projects'), icon: FolderKanban, path: ROUTES.PROJECTS },
    { label: t('analytics'), icon: BarChart3, path: ROUTES.ANALYTICS },
    { label: t('tips'), icon: Sparkles, path: ROUTES.TIPS },
    { label: t('settings'), icon: Settings, path: ROUTES.SETTINGS },
  ];

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-slate-300 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full">
        <Link to={ROUTES.LANDING} className="flex items-center gap-3 px-6 py-8 hover:opacity-80 transition-opacity">
          <div className="bg-indigo-500 p-2 rounded-lg text-white shadow-lg shadow-indigo-500/20">
            <CheckCircle2 size={24} />
          </div>
          <span className="text-xl font-black text-white tracking-tight uppercase">AxPlan</span>
        </Link>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                    : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon size={20} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-white transition-colors'} />
                <span className="font-bold text-sm tracking-wide">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6">
          <div className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl">
            <p className="text-[10px] text-slate-400 mb-2 font-black uppercase tracking-[0.15em]">{t('productivity')}</p>
            <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-indigo-500 h-full shadow-[0_0_8px_rgba(99,102,241,0.5)] transition-all duration-1000"
                style={{ width: `${efficiency}%` }}
              ></div>
            </div>
            <p className="text-[11px] font-bold text-slate-300 mt-2">{efficiency}% efficiency reached</p>
          </div>
          <Link 
            to={ROUTES.LANDING} 
            className="mt-4 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors py-2"
          >
            <HomeIcon size={12} />
            Landing Page
          </Link>
        </div>
      </div>
    </aside>
  );
};
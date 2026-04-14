
import React from 'react';
import { Check, Trash2, Edit2, Calendar, Folder, Clock } from 'lucide-react';
import { Todo } from '../../types';
import { useTodoContext } from './todoContext';
import { PRIORITIES } from '../../constants/filters';

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onEdit }) => {
  const { state, dispatch } = useTodoContext();
  
  const category = state.categories.find(c => c.id === todo.categoryId) || state.categories[0];
  const priorityInfo = PRIORITIES.find(p => p.value === todo.priority);

  return (
    <div className={`group relative bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500/50 transition-all hover:shadow-lg ${todo.completed ? 'opacity-80' : ''}`}>
      <div className="flex gap-4">
        <button
          onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
          className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all mt-1 ${
            todo.completed 
              ? 'bg-emerald-500 border-emerald-500 text-white' 
              : 'border-slate-300 dark:border-slate-700 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/10'
          }`}
        >
          {todo.completed && <Check size={14} strokeWidth={3} />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-1">
            <h4 className={`font-bold text-slate-900 dark:text-slate-100 truncate text-base ${todo.completed ? 'line-through text-slate-400 dark:text-slate-500' : ''}`}>
              {todo.title}
            </h4>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => onEdit(todo)}
                className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
              >
                <Edit2 size={16} />
              </button>
              <button 
                onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
                className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {todo.description && (
            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-3 font-medium">
              {todo.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4">
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${priorityInfo?.color} shadow-sm`}>
              {todo.priority}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-semibold">
              <Folder size={12} style={{ color: category.color }} />
              <span>{category.name}</span>
            </div>
            {todo.dueDate && (
              <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-semibold">
                <Calendar size={12} className="text-indigo-500" />
                <span>{new Date(todo.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
            )}
            {todo.dueTime && (
              <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-semibold">
                <Clock size={12} className="text-amber-500" />
                <span>{todo.dueTime}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

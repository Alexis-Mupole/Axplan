
import React, { useState } from 'react';
import { useTodoContext } from './todoContext';
import { TodoItem } from './TodoItem';
import { Todo } from '../../types';
import { Modal } from '../../components/ui/Modal';
import { TodoForm } from './TodoForm';
import { Inbox } from 'lucide-react';

export const TodoList: React.FC = () => {
  const { state } = useTodoContext();
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const filteredTodos = state.todos.filter((todo) => {
    const matchesStatus = 
      state.filter === 'all' || 
      (state.filter === 'active' && !todo.completed) || 
      (state.filter === 'completed' && todo.completed);
    
    const matchesCategory = 
      !state.categoryFilter || todo.categoryId === state.categoryFilter;

    return matchesStatus && matchesCategory;
  });

  if (filteredTodos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-400">
        <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-full mb-4">
          <Inbox size={48} className="text-slate-300 dark:text-slate-600" />
        </div>
        <h3 className="text-lg font-medium text-slate-600 dark:text-slate-300">No tasks found</h3>
        <p className="text-sm text-center max-w-xs mt-1">
          {state.filter === 'all' 
            ? "You don't have any tasks yet. Create one to get started!" 
            : `You don't have any ${state.filter} tasks.`}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {filteredTodos.map((todo) => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          onEdit={(t) => setEditingTodo(t)}
        />
      ))}

      <Modal 
        isOpen={!!editingTodo} 
        onClose={() => setEditingTodo(null)} 
        title="Edit Task"
      >
        {editingTodo && (
          <TodoForm 
            initialData={editingTodo} 
            onSuccess={() => setEditingTodo(null)} 
          />
        )}
      </Modal>
    </div>
  );
};

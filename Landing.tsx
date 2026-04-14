
import React, { useState } from 'react';
import { useTodoContext } from './todoContext';
import { Input, Select } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { generateId } from '../../utils/generateId';
import { Todo, Priority } from '../../types';
import { useTranslation } from '../../hooks/useTranslation';

interface TodoFormProps {
  onSuccess: () => void;
  initialData?: Todo;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onSuccess, initialData }) => {
  const { state, dispatch } = useTodoContext();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    priority: initialData?.priority || 'medium' as Priority,
    categoryId: initialData?.categoryId || state.categoryFilter || 'default',
    dueDate: initialData?.dueDate || new Date().toISOString().split('T')[0],
    dueTime: initialData?.dueTime || "12:00",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (initialData) {
      dispatch({
        type: 'UPDATE_TODO',
        payload: { ...initialData, ...formData, notified: false },
      });
    } else {
      dispatch({
        type: 'ADD_TODO',
        payload: {
          id: generateId(),
          ...formData,
          completed: false,
          createdAt: new Date().toISOString(),
          notified: false,
        },
      });
    }
    onSuccess();
  };

  const priorityOptions = [
    { label: t('low'), value: 'low' },
    { label: t('medium'), value: 'medium' },
    { label: t('high'), value: 'high' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label={t('title')}
        placeholder="What needs to be done?"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
        autoFocus
      />
      
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('description')} (Optional)</label>
        <textarea
          className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none min-h-[100px] text-sm dark:text-slate-100"
          placeholder="Add details..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Select
          label={t('priority')}
          value={formData.priority}
          onChange={(e) => setFormData({ ...formData, priority: e.target.value as Priority })}
          options={priorityOptions}
        />
        <Select
          label={t('project')}
          value={formData.categoryId}
          onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
          options={state.categories.map(c => ({ label: c.name, value: c.id }))}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label={t('dueDate')}
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
        />
        <Input
          label="Due Time"
          type="time"
          value={formData.dueTime}
          onChange={(e) => setFormData({ ...formData, dueTime: e.target.value })}
        />
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button type="button" variant="ghost" onClick={onSuccess}>{t('cancel')}</Button>
        <Button type="submit">{initialData ? t('update') : t('create')}</Button>
      </div>
    </form>
  );
};

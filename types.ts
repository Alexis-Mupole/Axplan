
export type Priority = 'low' | 'medium' | 'high';
export type Language = 'en' | 'fr' | 'sw';
export type NotifSound = 'bell' | 'digital' | 'chime' | 'success' | 'alert' | 'zen' | 'pop';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  categoryId: string;
  dueDate: string;
  dueTime: string; // Added for precise reminders
  createdAt: string;
  notified?: boolean; // Track if reminder was fired
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface TodoState {
  todos: Todo[];
  categories: Category[];
  filter: string;
  categoryFilter: string | null;
  theme: 'light' | 'dark';
  language: Language;
  notificationsEnabled: boolean;
  notificationSound: NotifSound;
  notificationVolume: number; // 0 to 1
  reminderOffset: number; // in minutes
}

export type TodoAction =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'UPDATE_TODO'; payload: Todo }
  | { type: 'SET_FILTER'; payload: string }
  | { type: 'ADD_CATEGORY'; payload: Category }
  | { type: 'UPDATE_CATEGORY'; payload: Category }
  | { type: 'DELETE_CATEGORY'; payload: string }
  | { type: 'SET_CATEGORY_FILTER'; payload: string | null }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_LANGUAGE'; payload: Language }
  | { type: 'TOGGLE_NOTIFICATIONS' }
  | { type: 'SET_NOTIF_SOUND'; payload: NotifSound }
  | { type: 'SET_NOTIF_VOLUME'; payload: number }
  | { type: 'SET_REMINDER_OFFSET'; payload: number }
  | { type: 'MARK_NOTIFIED'; payload: string }
  | { type: 'RESET_DATA' }
  | { type: 'IMPORT_DATA'; payload: Partial<TodoState> };

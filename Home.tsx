
import { TodoState, TodoAction } from '../../types';

export const initialState: TodoState = {
  todos: [],
  categories: [
    { id: 'default', name: 'General', color: '#6366f1' },
    { id: 'work', name: 'Work', color: '#ef4444' },
    { id: 'personal', name: 'Personal', color: '#10b981' },
  ],
  filter: 'all',
  categoryFilter: null,
  theme: 'light',
  language: 'en',
  notificationsEnabled: true,
  notificationSound: 'bell',
  notificationVolume: 0.5,
  reminderOffset: 10,
};

export const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [action.payload, ...state.todos] };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case 'DELETE_TODO':
      return { ...state, todos: state.todos.filter((t) => t.id !== action.payload) };
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map((t) => (t.id === action.payload.id ? action.payload : t)),
      };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'ADD_CATEGORY':
      return { ...state, categories: [...state.categories, action.payload] };
    case 'UPDATE_CATEGORY':
      return {
        ...state,
        categories: state.categories.map((c) => (c.id === action.payload.id ? action.payload : c)),
      };
    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter((c) => c.id !== action.payload),
        todos: state.todos.map((t) =>
          t.categoryId === action.payload ? { ...t, categoryId: 'default' } : t
        ),
      };
    case 'SET_CATEGORY_FILTER':
      return { ...state, categoryFilter: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'TOGGLE_NOTIFICATIONS':
      return { ...state, notificationsEnabled: !state.notificationsEnabled };
    case 'SET_NOTIF_SOUND':
      return { ...state, notificationSound: action.payload };
    case 'SET_NOTIF_VOLUME':
      return { ...state, notificationVolume: action.payload };
    case 'SET_REMINDER_OFFSET':
      return { ...state, reminderOffset: action.payload };
    case 'MARK_NOTIFIED':
      return {
        ...state,
        todos: state.todos.map((t) => 
          t.id === action.payload ? { ...t, notified: true } : t
        ),
      };
    case 'RESET_DATA':
      return { ...initialState };
    case 'IMPORT_DATA':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

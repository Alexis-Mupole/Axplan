import React, { createContext, useContext, useReducer, useEffect, useLayoutEffect, useCallback } from 'react';
import { todoReducer, initialState } from './todoReducer';
import { TodoState, TodoAction, NotifSound } from '../../types';

const STORAGE_KEY = 'axplan_data';

// Updated to more reliable sample sounds
const SOUND_MAP: Record<NotifSound, string> = {
  bell: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
  digital: 'https://www.soundjay.com/buttons/sounds/button-3.mp3',
  chime: 'https://www.soundjay.com/buttons/sounds/button-16.mp3',
  success: 'https://www.soundjay.com/buttons/sounds/button-09.mp3',
  alert: 'https://www.soundjay.com/buttons/sounds/button-10.mp3',
  zen: 'https://www.soundjay.com/buttons/sounds/button-11.mp3',
  pop: 'https://www.soundjay.com/buttons/sounds/button-14.mp3',
};

interface TodoContextType {
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
  playNotificationSound: (sound?: NotifSound) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState, (initial) => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return initial;
    try {
      const parsed = JSON.parse(saved);
      return { ...initial, ...parsed };
    } catch (e) {
      console.error("Failed to parse storage", e);
      return initial;
    }
  });

  const playNotificationSound = useCallback((soundOverride?: NotifSound) => {
    try {
      const soundKey = soundOverride || state.notificationSound;
      const soundUrl = SOUND_MAP[soundKey];
      
      if (!soundUrl) return;

      const audio = new Audio(soundUrl);
      audio.volume = state.notificationVolume;
      
      // Preload to ensure it's ready
      audio.load();
      
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Audio playback blocked or failed:", err);
          // This is common if the user hasn't interacted with the page yet
        });
      }
    } catch (e) {
      console.error("Error playing notification sound:", e);
    }
  }, [state.notificationSound, state.notificationVolume]);

  useLayoutEffect(() => {
    if (state.theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [state.theme]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Request notification permissions on mount
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // Background Reminder Engine
  useEffect(() => {
    if (!state.notificationsEnabled) return;

    const interval = setInterval(() => {
      const now = new Date();
      
      state.todos.forEach(todo => {
        if (todo.completed || todo.notified || !todo.dueDate || !todo.dueTime) return;

        const dueDateTime = new Date(`${todo.dueDate}T${todo.dueTime}`);
        const reminderTime = new Date(dueDateTime.getTime() - state.reminderOffset * 60000);

        if (now >= reminderTime && now < dueDateTime) {
          // Trigger Notification
          if ("Notification" in window && Notification.permission === "granted") {
            new Notification(`Task Reminder: ${todo.title}`, {
              body: `Due in ${state.reminderOffset} minutes`,
              icon: '/favicon.ico'
            });
          }
          
          playNotificationSound();
          dispatch({ type: 'MARK_NOTIFIED', payload: todo.id });
        }
      });
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [state.todos, state.notificationsEnabled, state.reminderOffset, playNotificationSound]);

  return (
    <TodoContext.Provider value={{ state, dispatch, playNotificationSound }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodoContext must be used within TodoProvider');
  return context;
};
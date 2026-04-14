
import { useTodoContext } from '../features/todos/todoContext';
import { TRANSLATIONS } from '../constants/translations';

export const useTranslation = () => {
  const { state } = useTodoContext();
  const lang = state.language || 'en';
  
  const t = (key: keyof typeof TRANSLATIONS['en']): string => {
    return TRANSLATIONS[lang][key] || TRANSLATIONS['en'][key] || key;
  };

  return { t, lang };
};

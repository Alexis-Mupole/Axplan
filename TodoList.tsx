
export const FILTERS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
};

export const PRIORITIES: { label: string; value: 'low' | 'medium' | 'high'; color: string }[] = [
  { label: 'Low', value: 'low', color: 'bg-blue-100 text-blue-700' },
  { label: 'Medium', value: 'medium', color: 'bg-yellow-100 text-yellow-700' },
  { label: 'High', value: 'high', color: 'bg-red-100 text-red-700' },
];

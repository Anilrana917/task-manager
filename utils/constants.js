export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  TASKS: '/todos',
  USERS: '/users'
};

export const TASK_STATUS = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed'
};

export const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' }
];
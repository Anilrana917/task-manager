export const generateRandomDate = () => {
  const start = new Date();
  const end = new Date();
  end.setDate(end.getDate() + 30);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const validateTask = (task) => {
  const errors = {};
  if (!task.title?.trim()) errors.title = 'Title is required';
  if (!task.description?.trim()) errors.description = 'Description is required';
  if (!task.dueDate) errors.dueDate = 'Due date is required';
  return errors;
};
'use client';
import Link from 'next/link';
import { formatDate } from '../../utils/helpers';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800'
};

const statusLabels = {
  pending: 'Pending',
  'in-progress': 'In Progress',
  completed: 'Completed'
};

export default function TaskCard({ task, onMarkCompleted, onDelete }) {
  const isCompleted = task.status === 'completed';
  const isOverdue = new Date(task.dueDate) < new Date() && !isCompleted;

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
      isCompleted ? 'border-green-500' : isOverdue ? 'border-red-500' : 'border-blue-500'
    }`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className={`text-lg font-semibold ${isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
          {task.title}
        </h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
          {statusLabels[task.status]}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {task.description}
      </p>

      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
        <span>Due: {formatDate(task.dueDate)}</span>
        {isOverdue && !isCompleted && (
          <span className="text-red-500 font-medium">Overdue</span>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          {!isCompleted && (
            <>
              <Link
                href={`/edit-task/${task.id}`}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
              >
                Edit
              </Link>
              <button
                onClick={() => onMarkCompleted(task.id)}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
              >
                Complete
              </button>
            </>
          )}
        </div>
        
        <button
          onClick={() => onDelete(task.id)}
          className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
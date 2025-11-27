'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TaskForm from '../../components/TaskForm/TaskForm';
import { taskService } from '../../services/taskService';
import AuthGuard from '../../components/AuthGuard/AuthGuard';

export default function AddTaskPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (taskData) => {
    setLoading(true);
    try {
      await taskService.createTask(taskData);
      router.push('/tasks');
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Error creating task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Task</h1>
            <TaskForm 
              onSubmit={handleSubmit} 
              loading={loading}
              submitButtonText="Create Task"
            />
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
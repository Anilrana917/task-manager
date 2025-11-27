'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import TaskForm from '../../../components/TaskForm/TaskForm';
import { taskService } from '../../../services/taskService';
import AuthGuard from '../../../components/AuthGuard/AuthGuard';

export default function EditTaskPage() {
  const params = useParams();
  const router = useRouter();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadTask();
  }, [params.id]);

  const loadTask = async () => {
    try {
      const tasks = await taskService.getAllTasks();
      const foundTask = tasks.find(t => t.id === parseInt(params.id));
      if (foundTask) {
        setTask(foundTask);
      } else {
        router.push('/tasks');
      }
    } catch (error) {
      console.error('Error loading task:', error);
      router.push('/tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (taskData) => {
    setSubmitting(true);
    try {
      await taskService.updateTask(params.id, taskData);
      router.push('/tasks');
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Error updating task. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <AuthGuard>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AuthGuard>
    );
  }

  if (!task) {
    return null;
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Task</h1>
            <TaskForm 
              task={task}
              onSubmit={handleSubmit} 
              loading={submitting}
              submitButtonText="Update Task"
            />
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
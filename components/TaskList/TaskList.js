'use client';
import { useState, useEffect } from 'react';
import TaskCard from '../TaskCard/TaskCard';
import SearchBar from '../SearchBar/SearchBar';
import FilterSort from '../FilterSort/FilterSort';
import { taskService } from '../../services/taskService';
import ClientOnly from '../ClientOnly/ClientOnly';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    filterAndSortTasks();
  }, [tasks, searchTerm, statusFilter, sortBy]);

  const loadTasks = async () => {
    try {
      const tasksData = await taskService.getAllTasks();
      setTasks(tasksData);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortTasks = () => {
    let filtered = tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'dueDate':
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    setFilteredTasks(filtered);
  };

  const handleMarkCompleted = async (taskId) => {
    try {
      await taskService.markAsCompleted(taskId);
      await loadTasks();
    } catch (error) {
      console.error('Error marking task as completed:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(taskId);
        await loadTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <ClientOnly>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <FilterSort
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onMarkCompleted={handleMarkCompleted}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tasks found. Create a new task to get started!</p>
          </div>
        )}
      </div>
    </ClientOnly>
  );
}
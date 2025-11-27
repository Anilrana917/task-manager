import axios from 'axios';
import { generateRandomDate } from '../utils/helpers';

const API_BASE = 'https://jsonplaceholder.typicode.com';

let mockTasks = [];

export const taskService = {
  async getAllTasks() {
    try {
      const response = await axios.get(`${API_BASE}/todos?_limit=10`);
      const apiTasks = response.data.map(task => ({
        id: task.id,
        title: task.title,
        description: `This is a sample description for task: ${task.title}. This task needs to be completed as part of our project requirements.`,
        status: task.completed ? 'completed' : Math.random() > 0.5 ? 'in-progress' : 'pending',
        dueDate: generateRandomDate(),
        completed: task.completed,
        userId: task.userId
      }));
      
      const allTasks = [...mockTasks, ...apiTasks];
      const uniqueTasks = allTasks.filter((task, index, self) => 
        index === self.findIndex(t => t.id === task.id)
      );
      
      return uniqueTasks;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return mockTasks; 
    }
  },

  async createTask(taskData) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newTask = {
      id: Date.now(), 
      ...taskData,
      completed: taskData.status === 'completed',
      userId: 1
    };
    
    mockTasks.push(newTask);
    return newTask;
  },

  async updateTask(id, taskData) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const taskIndex = mockTasks.findIndex(task => task.id === parseInt(id));
    if (taskIndex !== -1) {
      mockTasks[taskIndex] = { 
        ...mockTasks[taskIndex], 
        ...taskData,
        completed: taskData.status === 'completed'
      };
      return mockTasks[taskIndex];
    }
    
    return { id, ...taskData, completed: taskData.status === 'completed' };
  },

  async deleteTask(id) {
    await new Promise(resolve => setTimeout(resolve, 500));
    mockTasks = mockTasks.filter(task => task.id !== parseInt(id));
    return { success: true };
  },

  async markAsCompleted(id) {
    return this.updateTask(id, { status: 'completed', completed: true });
  }
};
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const taskService = {
  async getAllTasks() {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks`);
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      throw error;
    }
  },

  async createTask(taskData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/tasks`, taskData);
      return response.data.data;
    } catch (error) {
      console.error('Failed to create task:', error);
      throw error;
    }
  },

  async updateTask(id, taskData) {
    try {
      const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, taskData);
      return response.data.data;
    } catch (error) {
      console.error('Failed to update task:', error);
      throw error;
    }
  },

  async deleteTask(id) {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${id}`);
    } catch (error) {
      console.error('Failed to delete task:', error);
      throw error;
    }
  },

  async getTaskById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch task:', error);
      throw error;
    }
  }
};
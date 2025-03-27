'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTasks } from '@/context/TaskContext';
import Link from 'next/link';

export default function TaskDetailPage() {
  const router = useRouter();
  const { id: taskId } = useParams(); // Correct way to extract taskId

  const { tasks, updateTask, deleteTask } = useTasks();
  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    completed: false,
    dueDate: '',
  });

  useEffect(() => {
    if (!taskId) return;

    const foundTask = tasks.find((t) => t._id === taskId);
    if (foundTask) {
      setTask(foundTask);
      setFormData({
        title: foundTask.title,
        description: foundTask.description || '',
        priority: foundTask.priority,
        completed: foundTask.completed,
        dueDate: foundTask.dueDate ? foundTask.dueDate.split('T')[0] : '',
      });
    } else {
      alert('Task not found');
      router.push('/');
    }
  }, [taskId, tasks, router]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: name === 'dueDate' ? value : value
      }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.title.trim()) {
      alert('Title is required');
      setIsLoading(false);
      return;
    }

    try {
      const validatedFormData = {
        ...formData,
        dueDate: formData.dueDate || null, // Ensure correct format
      };

      await updateTask(taskId, validatedFormData);
      alert('Task updated successfully');
      setIsEditing(false);
    } catch (error) {
      alert('Failed to update task');
      console.error('Update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      await deleteTask(taskId);
      alert('Task deleted successfully');
      router.push('/');
    } catch (error) {
      alert('Failed to delete task');
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Task Details</h1>
      {task ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            disabled={!isEditing}
            className="border p-2 w-full"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            disabled={!isEditing}
            className="border p-2 w-full"
          />
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            disabled={!isEditing}
            className="border p-2 w-full"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="completed"
              checked={formData.completed}
              onChange={handleChange}
              disabled={!isEditing}
            />
            Completed
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
            {isEditing && (
              <button
                type="submit"
                disabled={isLoading}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                {isLoading ? 'Saving...' : 'Save'}
              </button>
            )}
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

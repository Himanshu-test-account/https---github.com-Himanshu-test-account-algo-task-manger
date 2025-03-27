'use client';

import Link from 'next/link';
import { useTasks } from '@/context/TaskContext';

export default function TaskItem({ task }) {
  const { deleteTask, toggleTaskCompletion } = useTasks();

  // Helper function to get priority color
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-200 text-red-800';
      case 'Medium': return 'bg-yellow-200 text-yellow-800';
      case 'Low': return 'bg-green-200 text-green-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div 
      className={`
        border rounded-lg p-4 mb-4 
        ${task.completed ? 'bg-gray-100' : 'bg-white'}
        transition-all duration-300 hover:shadow-md
      `}
    >
      <div className="flex justify-between items-start">
        <div className="flex-grow">
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task)}
              className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <h3 
              className={`
                text-lg font-semibold 
                ${task.completed ? 'line-through text-gray-500' : ''}
              `}
            >
              {task.title}
            </h3>
          </div>

          {task.description && (
            <p className="text-gray-600 text-sm mb-2">
              {task.description}
            </p>
          )}

          <div className="flex space-x-2 mb-2">
            <span 
              className={`
                text-xs px-2 py-1 rounded 
                ${getPriorityColor(task.priority)}
              `}
            >
              {task.priority} Priority
            </span>

            {task.dueDate && (
              <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                Due: {formatDate(task.dueDate)}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <Link 
            href={`/tasks/${task._id}`}
            className="
              bg-blue-500 text-white 
              px-3 py-1 rounded 
              text-xs hover:bg-blue-600 
              transition-colors
            "
          >
            View
          </Link>
          <button
            onClick={() => deleteTask(task._id)}
            className="
              bg-red-500 text-white 
              px-3 py-1 rounded 
              text-xs hover:bg-red-600 
              transition-colors
            "
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
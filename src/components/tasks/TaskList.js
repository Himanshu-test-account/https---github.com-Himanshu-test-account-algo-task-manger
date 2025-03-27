'use client';

import { useTasks } from '@/context/TaskContext';
import Link from 'next/link';

export default function TaskList() {
  const { 
    tasks, 
    loading, 
    error, 
    deleteTask, 
    toggleTaskCompletion 
  } = useTasks();

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      
      <Link 
        href="/tasks/create" 
        className="mb-4 inline-block bg-green-500 text-white px-4 py-2 rounded"
      >
        Create New Task
      </Link>

      {tasks.length === 0 ? (
        <p>No tasks found. Create a new task!</p>
      ) : (
        <div className="grid gap-4">
          {tasks.map((task) => (
            <div 
              key={task._id} 
              className={`
                border rounded p-4 
                ${task.completed ? 'bg-gray-100' : 'bg-white'}
                flex justify-between items-center
              `}
            >
              <div>
                <input 
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task)}
                  className="mr-2"
                />
                <span 
                  className={task.completed ? 'line-through text-gray-500' : ''}
                >
                  {task.title}
                </span>
                {task.description && (
                  <p className="text-sm text-gray-600 mt-1">
                    {task.description}
                  </p>
                )}
                <span 
                  className={`
                    text-xs px-2 py-1 rounded 
                    ${task.priority === 'High' ? 'bg-red-200 text-red-800' : 
                      task.priority === 'Medium' ? 'bg-yellow-200 text-yellow-800' : 
                      'bg-green-200 text-green-800'}
                  `}
                >
                  {task.priority}
                </span>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => deleteTask(task._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                >
                  Delete
                </button>
                <Link 
                  href={`/tasks/${task._id}`}
                  className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
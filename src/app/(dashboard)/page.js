'use client';

import { useTasks } from '@/context/TaskContext';
import TaskItem from '@/components/TaskItem';
import Link from 'next/link';

export default function DashboardPage() {
  const { tasks, loading, error } = useTasks();

  // Task Statistics
  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    pending: tasks.filter(task => !task.completed).length,
    highPriority: tasks.filter(task => task.priority === 'High').length
  };

  // Task Categorization
  const categorizedTasks = {
    today: tasks.filter(task => {
      if (!task.dueDate) return false;
      const today = new Date();
      const dueDate = new Date(task.dueDate);
      return dueDate.toDateString() === today.toDateString();
    }),
    overdue: tasks.filter(task => {
      if (!task.dueDate || task.completed) return false;
      const today = new Date();
      const dueDate = new Date(task.dueDate);
      return dueDate < today;
    }),
    upcoming: tasks.filter(task => {
      if (!task.dueDate || task.completed) return false;
      const today = new Date();
      const dueDate = new Date(task.dueDate);
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);
      return dueDate > today && dueDate <= nextWeek;
    })
  };

  if (loading) return <div className="text-center mt-10">Loading tasks...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Tasks</h3>
          <p className="text-3xl font-bold">{taskStats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Completed</h3>
          <p className="text-3xl font-bold text-green-600">{taskStats.completed}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">{taskStats.pending}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">High Priority</h3>
          <p className="text-3xl font-bold text-red-600">{taskStats.highPriority}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <h2 className="text-xl font-bold mb-4 text-blue-600">Today's Tasks</h2>
          {categorizedTasks.today.length === 0 ? (
            <p className="text-gray-500">No tasks due today</p>
          ) : (
            categorizedTasks.today.map(task => (
              <TaskItem key={task._id} task={task} />
            ))
          )}
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4 text-red-600">Overdue Tasks</h2>
          {categorizedTasks.overdue.length === 0 ? (
            <p className="text-gray-500">No overdue tasks</p>
          ) : (
            categorizedTasks.overdue.map(task => (
              <TaskItem key={task._id} task={task} />
            ))
          )}
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4 text-green-600">Upcoming Tasks</h2>
          {categorizedTasks.upcoming.length === 0 ? (
            <p className="text-gray-500">No upcoming tasks in the next week</p>
          ) : (
            categorizedTasks.upcoming.map(task => (
              <TaskItem key={task._id} task={task} />
            ))
          )}
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link 
          href="/tasks/create" 
          className="
            bg-blue-500 text-white 
            px-6 py-3 rounded-lg 
            hover:bg-blue-600 
            transition-colors
          "
        >
          Create New Task
        </Link>
      </div>
    </div>
  );
}
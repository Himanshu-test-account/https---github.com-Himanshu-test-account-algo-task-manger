"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { taskService } from "@/lib/api";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const fetchedTasks = await taskService.getAllTasks();
      setTasks(fetchedTasks);
      setError(null);
    } catch (err) {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  // Create task
  const createTask = async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks((prevTasks) => [...prevTasks, newTask]);
      return newTask;
    } catch (err) {
      setError("Failed to create task");
      throw err;
    }
  };

  // Update task
  const updateTask = async (id, updatedData) => {
    try {
      const updatedTask = await taskService.updateTask(id, updatedData);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? updatedTask : task))
      );
      return updatedTask;
    } catch (err) {
      setError("Failed to update task");
      throw err;
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (err) {
      setError("Failed to delete task");
      throw err;
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = async (task) => {
    if (task._id) {
      await updateTask(task._id, { completed: !task.completed });
    }
  };

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use the TaskContext
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

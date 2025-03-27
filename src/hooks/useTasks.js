import { useState, useEffect } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '@/services/taskService';

export const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getTasks = async () => {
            try {
                const data = await fetchTasks();
                setTasks(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        getTasks();
    }, []);

    const addTask = async (taskData) => {
        const newTask = await createTask(taskData);
        setTasks([...tasks, newTask]);
    };

    const editTask = async (taskId, updates) => {
        const updatedTask = await updateTask(taskId, updates);
        setTasks(tasks.map(task => task._id === taskId ? updatedTask : task));
    };

    const removeTask = async (taskId) => {
        await deleteTask(taskId);
        setTasks(tasks.filter(task => task._id !== taskId));
    };

    return { tasks, loading, error, addTask, editTask, removeTask };
};
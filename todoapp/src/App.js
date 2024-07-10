import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './styles.css';  // Import styles

const App = () => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:8888/tasks');
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const addTask = async (newTask) => {
      try {
          const response = await fetch('http://localhost:8888/tasks', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(newTask),
          });
          if (!response.ok) {
              throw new Error('Failed to add task');
          }
          fetchTasks();
      } catch (error) {
          console.error('Error adding task:', error);
      }
  };

    const updateTask = async (id, updatedTask) => {
        try {
            const response = await fetch(`http://localhost:8888/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask),
            });
            if (!response.ok) {
                throw new Error('Failed to update task');
            }
            // Fetch tasks again after successful PUT to update the list
            fetchTasks();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const deleteTask = async (id) => {
        try {
            const response = await fetch(`http://localhost:8888/tasks/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete task');
            }
            // Fetch tasks again after successful DELETE to update the list
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    useEffect(() => {
      fetchTasks();
  }, []);

    return (
        <div className="app-container">
            <div className="task-form-container">
                <TaskForm addTask={addTask} />
            </div>
            <div className="task-list-container">
                <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
            </div>
        </div>
    );
};

export default App;


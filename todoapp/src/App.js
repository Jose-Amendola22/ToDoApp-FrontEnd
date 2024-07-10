import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './styles.css';  

const App = () => {
    //Esto son los estados que se usarn para casi toda la app
    const [tasks, setTasks] = useState([]);

    //Esta función hace un simple get a la api y lo que obtiene lo guarda en la variable de tasks
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

    //La función hace una llamada a la api y agrega el task
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

    //Función para actulizar algún task conforme a su edit
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
            
            fetchTasks();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    //función para borrar un task con su id
    const deleteTask = async (id) => {
        try {
            const response = await fetch(`http://localhost:8888/tasks/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete task');
            }
           
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    //a penas se carga la app se hace un get a la api para conseguir los tasks
    useEffect(() => {
      fetchTasks();
  }, []);

    return (
        //un simple contenedor para que el form este a la izquierda y los tasks a la derecha
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


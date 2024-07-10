import React, { useState } from 'react';
import '../styles.css';  

const TaskItem = ({ task, updateTask, deleteTask }) => {
    //Este isEditing nos permite hacer una renderización condicional
    //Sí se encuentra en true esto permite que el usuario pueda editar el task y enviarlo al api
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [completed, setCompleted] = useState(task.completed);

    const handleUpdate = () => {
        updateTask(task.id, { title, description, completed });
        setIsEditing(false);
    };

    return (
        <div className="task-card">
            
            {isEditing ? (
                <div className="edit-mode">
                    <input
                        className="edit-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        className="edit-textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <label>
                        Completed:
                        <input
                            className="edit-checkbox"
                            type="checkbox"
                            checked={completed}
                            onChange={(e) => setCompleted(e.target.checked)}
                        />
                    </label>
                    <button className="edit-button" onClick={handleUpdate}>Save</button>
                </div>
            ) : (
                <div className="view-mode">
                    <h2>{task.title}</h2>
                    <p>{task.description}</p>
                    <p>{task.completed ? 'Completed' : 'Not Completed'}</p>
                    <div className="button-container">
                        <button className="edit-button" onClick={() => setIsEditing(true)}>Edit</button>
                        <button className="delete-button" onClick={() => deleteTask(task.id)}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskItem;

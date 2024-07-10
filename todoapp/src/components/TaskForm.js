import React, { useState } from 'react';
import '../styles.css';  

const TaskForm = ({ addTask }) => {
    //Las variables que se le enviarán a la api y sus estados
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);

    //sí se aprieta el botón de submit se envía los datos del form a la api
    const handleSubmit = (e) => {
        e.preventDefault();
        addTask({ title, description, completed });
        //una vez enviados se cambia el form a su estado original
        setTitle('');
        setDescription('');
        setCompleted(false);
    };

    return (
        <div className="task-form">
            <h2>Add Task</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                ></textarea>
                <label>
                    Completed:
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={(e) => setCompleted(e.target.checked)}
                    />
                </label>
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
};

export default TaskForm;

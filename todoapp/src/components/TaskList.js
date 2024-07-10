import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import '../styles.css';

const TaskList = ({ tasks, updateTask, deleteTask }) => {
    //simple lista de tasks que usa el get de el app para mapearse
    return (
        <div className="container">
            <h1>Task List</h1>
            <ul className="task-list">
                {tasks.map(task => (
                    <TaskItem key={task.id} task={task} updateTask={updateTask} deleteTask={deleteTask} />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;

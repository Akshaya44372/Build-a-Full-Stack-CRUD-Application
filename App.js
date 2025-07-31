import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:5000/api/tasks');
    setTasks(res.data);
  };

  const createTask = async () => {
    await axios.post('http://localhost:5000/api/tasks', { title: newTitle });
    setNewTitle('');
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks();
  };

  const toggleTask = async (task) => {
    await axios.put(`http://localhost:5000/api/tasks/${task._id}`, {
      ...task,
      completed: !task.completed
    });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Task Manager</h1>
      <input value={newTitle} onChange={e => setNewTitle(e.target.value)} />
      <button onClick={createTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task._id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.title}
            <button onClick={() => toggleTask(task)}>✓</button>
            <button onClick={() => deleteTask(task._id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

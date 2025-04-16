import React, { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newText, setNewText] = useState('');

  // Get all tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/api/tasks'); // Update with your backend port
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newText }),
    });
    const data = await res.json();
    setTasks(prev => [...prev, data]);
    setNewText('');
  };

  // Toggle complete
  const toggleTask = async (task) => {
    const res = await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !task.completed }),
    });
    const updated = await res.json();
    setTasks(prev => prev.map(t => (t._id === task._id ? updated : t)));
  };

  // Edit task text
  const editTask = async (task) => {
    const updatedText = prompt('Edit task:', task.text);
    if (!updatedText) return;
    const res = await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: updatedText }),
    });
    const updated = await res.json();
    setTasks(prev => prev.map(t => (t._id === task._id ? updated : t)));
  };

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, { method: 'DELETE' });
    setTasks(prev => prev.filter(t => t._id !== id));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📝 To-Do App</h1>

      <form onSubmit={handleAdd}>
        <input
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Add a task"
          required
        />
        <button type="submit">Add</button>
      </form>

      <ul style={{ marginTop: '1rem' }}>
        {tasks.map(task => (
          <li key={task._id}>
            <span
              onClick={() => toggleTask(task)}
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
            >
              {task.text}
            </span>
            &nbsp;
            <button onClick={() => editTask(task)}>✏️</button>
            <button onClick={() => deleteTask(task._id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

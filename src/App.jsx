import { useEffect, useState } from 'react'
import './App.css'
import Search from './components/Search'
import TaskPage from './components/TaskPage';
import { createTodo, fetchTodo } from './axios';

function App() {
  const [search, setSearch] = useState('');
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('tasks')) || []
  )
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTodo();
        setTasks(data);
        setIsLoading(false);
      } catch (err) { 
        console.error("Error: ", err);
      } finally {
        setIsLoading(false);
      }
    }

    getTasks();
  }, [])

  const submitTask = async (search) => {
    if (!search.trim()) return;

    try {
      const newTask = await createTodo(search);
      setTasks([...tasks, newTask]);
    } catch (err) {
      console.error("Error");
    }
  }

  const completeTask = (id) => {
    console.log(id);
    
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed }
      }
      return task
    })
    setTasks(newTasks)
    localStorage.setItem('tasks', JSON.stringify(newTasks))
  }

  const deleteTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id)
    setTasks(newTasks)

    localStorage.setItem('tasks', JSON.stringify(newTasks))
  }

  const editTask = (id, newDescription) => {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, description: newDescription }
      }
      return task
    })
    setTasks(newTasks)
    localStorage.setItem('tasks', JSON.stringify(newTasks))
  }

  if (isLoading) return "Loading";

  return (
    <div>
      <header className='text-4xl text-black text-center py-4'>
        TODO-MERN
      </header>
      <Search search={search} setSearch={setSearch} submitTask={submitTask}/>
      <TaskPage tasks={tasks} completeTask={completeTask} deleteTask={deleteTask} editTask={editTask}/>
    </div>
  )
}

export default App

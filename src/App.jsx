import { useState } from 'react'
import './App.css'
import Search from './components/Search'
import TaskPage from './components/TaskPage';

function App() {
  const [search, setSearch] = useState('');
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('tasks')) || []
  )

  const submitTask = (search) => {
    const current_id = tasks.length + 1
    // console.log(tasks);
    const newTask = {
      id: current_id,
      // title: search,
      description: search,
      completed: false
    }
    // console.log(newTask);
    
    setTasks([...tasks, newTask])
    localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]))
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

  return (
    <div>
      <header>
        TODO-MERN
      </header>
      <Search search={search} setSearch={setSearch} submitTask={submitTask}/>
      <TaskPage tasks={tasks} completeTask={completeTask} deleteTask={deleteTask} editTask={editTask}/>
    </div>
  )
}

export default App

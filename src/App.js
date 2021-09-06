import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import About from './components/About';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import Header from "./components/Header";
import Tasks from "./components/Tasks";

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

const onDelete = async (id) => {
  await fetch(`http://localhost:4000/tasks/${id}`, {method: 'DELETE'})
  setTasks(tasks.filter(task => task.id !== id))
}

// Fetch Tasks
const fetchTasks = async () => {
  const res = await fetch('http://localhost:4000/tasks')
  const data = await res.json()
  return data
}

// Fetch Tasks
const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:4000/tasks/${id}`)
  const data = await res.json()
  return data
}

// Add Data
const addTask = async task => {
  const id = Math.floor(Math.random() * 10000) + 1
  const newTask = {id, ...task}
  const res = await fetch('http://localhost:4000/tasks', {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(newTask)
  })
  const data = await res.json();
  setTasks([...tasks, data])
}
// Toggle Reminder
const toggleReminder = async id => {
  const taskToToggle = await fetchTask(id)
  const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}
  const res = await fetch(`http://localhost:4000/tasks/${id}`, {
    method: 'PUT',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(updatedTask)
  })

  const data = await res.json()
  setTasks(tasks.map(task => task.id === id ? {...task, reminder: !data.reminder} : task))
}
  return (
    <Router>
    <div className="container">
        <Header toggleAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        {showAddTask && <AddTask onAdd={addTask} />}
        <Route path='/' exact render={props => (
          <>
          {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={onDelete} onToggle={toggleReminder} /> : 'No tasks to show'}
          </>
        )} />
        <Route path='/about' component={About} />
        <Footer />
    </div>
    </Router>
  )
}

export default App;

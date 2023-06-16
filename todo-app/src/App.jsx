import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

const Task = ({ children, onDelete }) => {
  return (
    <li className="task">
      <span>{children}</span>
      <button type='button' className='button-style' onClick={onDelete}>×</button>
    </li>
  )
}

const TodoList = () => {
  const [tasks, setTasks] = useState([])
  const [taskText, setTaskText] = useState('')
  useEffect(() => {
    axios.get('http://localhost:3000')
      .then(resp => setTasks(resp.data))
      .catch(err => console.error('get request error', err)), []})


  const handleDelete = (taskIdx) => {
    axios.delete(`http://localhost:3000/tasks?id=${taskIdx}`)
      .then(() => setTasks(tasks.filter((_, idx) => idx != taskIdx)))
      .catch(err => console.log(err))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText!=''){
      axios.post(`http://localhost:3000/tasks?task=${taskText}`)
        .then(() => {
          setTasks([ ...tasks, taskText ])
          setTaskText('')
        })
        .catch(err => console.log('post request error', err))
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='task-manager'>
        <input
          autoComplete='off'
          className='task-text'
          name='tasktext'
          value={taskText}
          onChange={e => setTaskText(e.target.value)}
          placeholder='What needs to be done?'
        />

        <ul>
          {tasks.map((task, idx) => <Task onDelete={() => handleDelete(idx)} key={task + idx}>{task}</Task>)}
        </ul>
      </form>
    </>
  )
}

export const App = () => {
  return (
    <div>
      <h1 className='todos-text'>todos</h1>
      <TodoList />
    </div>
  )
}



import { useState } from 'react'
import PropTypes from 'prop-types'

function NewTaskForm({ addTask }) {
  const [userInput, setUserInput] = useState('')
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)

  const handleChange = (e) => {
    setUserInput(e.currentTarget.value)
  }

  const handleChangeSec = (e) => {
    setSeconds(parseInt(e.currentTarget.value, 10))
  }

  const handleChangeMin = (e) => {
    setMinutes(parseInt(e.currentTarget.value, 10))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addTask(userInput, seconds, minutes)
    setUserInput('')
    setSeconds(0)
    setMinutes(0)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <form className="header">
      <h1>Todos</h1>
      <input
        onSubmit={handleSubmit}
        value={userInput}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        className="new-todo"
        placeholder="What needs to be done?"
      />
      <input
        type="number"
        value={minutes}
        min={0}
        max={59}
        className="new-todo-form__timer"
        onChange={handleChangeMin}
        onKeyDown={handleKeyPress}
        placeholder="Min"
      />
      <input
        type="number"
        value={seconds}
        min={0}
        max={59}
        className="new-todo-form__timer"
        onChange={handleChangeSec}
        onKeyDown={handleKeyPress}
        placeholder="Sec"
      />
    </form>
  )
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
}

export default NewTaskForm

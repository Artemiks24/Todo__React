import { useState, useRef, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import en from 'date-fns/locale/en-AU'
import PropTypes from 'prop-types'

import Timer from './Timer'

function Task({ todos, todo, setTodos, removeTask, startTimer, stopTimer }) {
  const [todoEditing, setTodoEditing] = useState(null)
  const [editingText, setEditingText] = useState(todo.task)

  const editInputRef = useRef(null)
  const handleToggle = (id) => {
    setTodos([
      ...todos.map((item) =>
        item.id === id ? { ...item, complete: !item.complete, checked: !item.checked } : { ...item }
      ),
    ])
  }

  const handleStart = () => {
    startTimer(todo.id)
  }

  const handleStop = () => {
    stopTimer(todo.id)
  }

  /*  eslint no-param-reassign: "error" */ const updateTodos = (id) => {
    const updateTodosList = [...todos].map((item) => {
      if (item.id === id) item.task = editingText
      return item
    })
    setTodos(updateTodosList)
    setTodoEditing(null)
    setEditingText(editingText)
  }

  const editTodo = (e) => {
    if (e.key === 'Enter') {
      updateTodos(todo.id)
    } else if (e.key === 'Escape') {
      setTodoEditing(null)
      setEditingText(todo.task)
    }
  }

  const handleClickOutside = (e) => {
    if (editInputRef.current && !editInputRef.current.contains(e.target)) {
      updateTodos(todo.id)
    }
  }

  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      setTodoEditing(null)
      setEditingText(todo.task)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <li className={todo.complete ? 'completed' : 'view'}>
      {todoEditing === todo.id ? (
        <input
          ref={editInputRef}
          onKeyDown={editTodo}
          type="text"
          className="new-todo"
          placeholder="Update your task"
          onChange={(e) => setEditingText(e.target.value)}
          value={editingText}
        />
      ) : (
        <div className="view">
          <input
            id={todo.id}
            onChange={() => handleToggle(todo.id)}
            checked={todo.checked}
            className="toggle"
            type="checkbox"
          />
          <label htmlFor={todo.id}>
            <span className="description">{todo.task}</span>
            <Timer handleStart={handleStart} handleStop={handleStop} todo={todo} />
            <span className="created">
              {' '}
              {`created ${formatDistanceToNow(todo.date, {
                includeSeconds: true,
                locale: en,
                addSuffix: true,
              })}`}
            </span>
          </label>
          <button type="button" aria-label="Save" onClick={() => setTodoEditing(todo.id)} className="icon icon-edit" />
          <button type="button" aria-label="Save" className="icon icon-destroy" onClick={() => removeTask(todo.id)} />
        </div>
      )}
    </li>
  )
}

Task.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({})),
  todo: PropTypes.shape({
    checked: PropTypes.bool,
    complete: PropTypes.bool,
    id: PropTypes.string,
    task: PropTypes.string,
    date: PropTypes.instanceOf(Date),
  }),
  setTodos: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
}

Task.defaultProps = {
  todos: [],
  todo: {},
}

export default Task

import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import en from 'date-fns/locale/en-AU'
import PropTypes from 'prop-types'

import Timer from './Timer'

class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editingText: '',
    }
    this.stopTimer = this.stopTimer.bind(this)
    this.handlePlayButtonClick = this.handlePlayButtonClick.bind(this)
  }

  componentDidMount() {
    const { todo } = this.props
    const { isRun } = todo
    if (isRun) {
      this.startTimer()
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  handlePlayButtonClick() {
    const { setNewTodos, todo } = this.props

    setNewTodos({ ...todo, isRun: true })
    this.startTimer()
  }

  handleToggle = (id) => {
    const { todos, setTodos } = this.props
    setTodos([
      ...todos.map((item) =>
        item.id === id ? { ...item, complete: !item.complete, checked: !item.checked } : { ...item }
      ),
    ])
  }

  updateTodos = (id) => {
    const { todos, setTodos, setTodoEditing, setEditingText, todo } = this.props
    const { editingText } = this.state
    const updateTodosList = [...todos].map((item) => {
      if (item.id === id) todo.task = editingText
      return item
    })

    setTodos(updateTodosList)
    setTodoEditing(null)
    setEditingText('')
  }

  editTodo = (e, id) => {
    if (e.key === 'Enter') {
      this.updateTodos(id)
    }
  }

  startTimer() {
    this.timer = setInterval(() => {
      const { todo, setNewTodos } = this.props
      const { seconds, minutes } = todo
      if (seconds === 59) {
        setNewTodos({ ...todo, minutes: minutes + 1, seconds: 0 })
      } else {
        setNewTodos({ ...todo, seconds: seconds + 1 })
      }
    }, 1000)
  }

  stopTimer() {
    const { setNewTodos, todo } = this.props
    setNewTodos({ ...todo, isRun: false })
    clearInterval(this.timer)
  }

  render() {
    const { todo, removeTask, setTodoEditing, todoEditing } = this.props
    const { editingText } = this.state

    return (
      <li className={todo.complete ? 'completed' : 'view'}>
        {todoEditing === todo.id ? (
          <input
            onKeyDown={(e) => this.editTodo(e, todo.id)}
            type="text"
            className="new-todo"
            placeholder="Update your task"
            onChange={(e) => this.setState({ editingText: e.target.value })}
            value={editingText}
          />
        ) : (
          <div className="view">
            <input
              id={todo.id}
              onChange={() => this.handleToggle(todo.id)}
              checked={todo.checked}
              className="toggle"
              type="checkbox"
            />
            <label htmlFor={todo.id}>
              <span className="description">{todo.task}</span>
              <Timer todo={todo} onStart={this.handlePlayButtonClick} onStop={this.stopTimer} />
              <span className="created">
                {' '}
                {`created ${formatDistanceToNow(todo.date, {
                  includeSeconds: true,
                  locale: en,
                  addSuffix: true,
                })}`}
              </span>
            </label>
            <button
              type="button"
              aria-label="Save"
              onClick={() => setTodoEditing(todo.id)}
              className="icon icon-edit"
            />
            <button type="button" aria-label="Save" className="icon icon-destroy" onClick={() => removeTask(todo.id)} />
          </div>
        )}
      </li>
    )
  }
}

Task.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({})),
  todo: PropTypes.shape({
    checked: PropTypes.bool,
    complete: PropTypes.bool,
    id: PropTypes.string,
    task: PropTypes.string,
    seconds: PropTypes.number,
    minutes: PropTypes.number,
    isRun: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
  }),
  setTodos: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
  todoEditing: PropTypes.string,
  setTodoEditing: PropTypes.func.isRequired,
  setEditingText: PropTypes.func.isRequired,
  setNewTodos: PropTypes.func.isRequired,
}

Task.defaultProps = {
  todos: [],
  todo: {},
  todoEditing: null,
}

export default Task

import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import en from 'date-fns/locale/en-AU'
import PropTypes from 'prop-types'

import Timer from './Timer'

class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todoEditing: null,
      editingText: props.todo.task,
    }
    this.editInputRef = React.createRef()
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
    document.addEventListener('keydown', this.handleEscape)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
    document.removeEventListener('keydown', this.handleEscape)
  }

  handleStart = () => {
    const { todo, startTimer } = this.props
    startTimer(todo.id)
  }

  handleStop = () => {
    const { todo, stopTimer } = this.props
    stopTimer(todo.id)
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
    const { todos, setTodos } = this.props
    const { editingText } = this.state
    const updateTodosList = [...todos].map((item) => {
      // eslint-disable-next-line no-param-reassign
      if (item.id === id) item.task = editingText
      return item
    })
    setTodos(updateTodosList)
    this.setState({ todoEditing: null })
  }

  editTodo = (e) => {
    const { todo } = this.props
    if (e.key === 'Enter') {
      this.updateTodos(todo.id)
    } else if (e.key === 'Escape') {
      this.setState({ todoEditing: null, editingText: todo.task })
    }
  }

  handleClickOutside = (e) => {
    const { todo } = this.props
    if (this.editInputRef.current && !this.editInputRef.current.contains(e.target)) {
      this.setState({ todoEditing: null, editingText: todo.task })
    }
  }

  handleEscape = (e) => {
    const { todo } = this.props
    if (e.key === 'Escape') {
      this.setState({ todoEditing: null, editingText: todo.task })
    }
  }

  render() {
    const { todo, removeTask } = this.props
    const { editingText, todoEditing } = this.state

    return (
      <li className={todo.complete ? 'completed' : 'view'}>
        {todoEditing === todo.id ? (
          <input
            ref={this.editInputRef}
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
              <Timer todo={todo} onStart={this.handleStart} onStop={this.handleStop} />
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
              onClick={() => this.setState({ todoEditing: todo.id })}
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
}

Task.defaultProps = {
  todos: [],
  todo: {},
}

export default Task

import React from 'react'
import PropTypes from 'prop-types'

import Task from './Task'
import Footer from './Footer'

function TaskList({
  todos,
  displayTodos,
  setTodos,
  setDisplayTodos,
  removeTask,
  todoEditing,
  setTodoEditing,
  setEditingText,
  editingText,
  setNewTodos,
  startTimer,
  stopTimer,
}) {
  return (
    <section className="main">
      <ul className="todo-list">
        {displayTodos.map((todo) => (
          <Task
            todoEditing={todoEditing}
            setTodoEditing={setTodoEditing}
            setEditingText={setEditingText}
            editingText={editingText}
            todos={todos}
            todo={todo}
            key={todo.id}
            setTodos={setTodos}
            removeTask={removeTask}
            setNewTodos={setNewTodos}
            startTimer={startTimer}
            stopTimer={stopTimer}
          />
        ))}
      </ul>
      <Footer todos={todos} setTodos={setTodos} displayTodos={displayTodos} setDisplayTodos={setDisplayTodos} />
    </section>
  )
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({})),
  displayTodos: PropTypes.arrayOf(PropTypes.shape({})),
  setTodos: PropTypes.func.isRequired,
  setDisplayTodos: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
  todoEditing: PropTypes.string,
  editingText: PropTypes.string,
  setTodoEditing: PropTypes.func.isRequired,
  setEditingText: PropTypes.func.isRequired,
  setNewTodos: PropTypes.func.isRequired,
}

TaskList.defaultProps = {
  todos: [],
  displayTodos: [],
  editingText: '',
  todoEditing: null,
}

export default TaskList

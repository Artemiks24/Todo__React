import React, { Component } from 'react'

import NewTaskForm from './NewTaskForm'
import TaskList from './TaskList'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: [],
      displayTodos: [],
      todoEditing: null,
      editingText: '',
    }
  }

  addTask = (userInput) => {
    if (userInput) {
      const newItem = {
        id: Math.random().toString(36).substr(2, 9),
        task: userInput,
        complete: false,
        checked: false,
        date: new Date(),
        seconds: 0,
        minutes: 0,
        isRun: false,
      }

      this.setState((prevState) => ({
        todos: [...prevState.todos, newItem],
      }))
    }
  }

  removeTask = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo.id !== id),
    }))
  }

  setNewTodos = (todo) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((currentTodo) => {
        if (currentTodo.id === todo.id) {
          return todo
        }
        return currentTodo
      }),
    }))
  }

  render() {
    const { todos, displayTodos, todoEditing, editingText } = this.state

    return (
      <section className="todoapp">
        <NewTaskForm addTask={this.addTask} />
        <TaskList
          todoEditing={todoEditing}
          setTodoEditing={(todo) => this.setState({ todoEditing: todo })}
          setEditingText={(text) => this.setState({ editingText: text })}
          editingText={editingText}
          displayTodos={displayTodos}
          todos={todos}
          removeTask={this.removeTask}
          setTodos={(updatedTodos) => this.setState({ todos: updatedTodos })}
          setDisplayTodos={(updatedTodos) => this.setState({ displayTodos: updatedTodos })}
          setNewTodos={this.setNewTodos}
        />
      </section>
    )
  }
}

export default App

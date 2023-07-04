import React, { Component } from 'react'

import NewTaskForm from './components/NewTaskForm'
import TaskList from './components/TaskList'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: [],
      displayTodos: [],
    }
    this.timers = {}
  }

  // eslint-disable-next-line react/sort-comp
  addTask = (userInput, seconds, minutes) => {
    if (userInput && (seconds || minutes)) {
      const newItem = {
        id: Math.random().toString(36).substr(2, 9),
        task: userInput,
        complete: false,
        checked: false,
        date: new Date(),
        isRun: false,
        seconds,
        minutes,
      }

      this.setState((prevState) => ({
        todos: [...prevState.todos, newItem],
      }))
    } else {
      const newItem = {
        id: Math.random().toString(36).substr(2, 9),
        task: userInput,
        complete: false,
        checked: false,
        date: new Date(),
        isRun: false,
        seconds: 0,
        minutes: 10,
      }

      this.setState((prevState) => ({
        todos: [...prevState.todos, newItem],
      }))
    }
  }

  timerUpdate = (id) => {
    const timerId = setInterval(() => {
      this.setState((prevState) => ({
        todos: prevState.todos.map((todo) => {
          if (todo.id === id && todo.isRun) {
            const { minutes, seconds } = todo
            let totalSeconds = minutes * 60 + seconds
            if (totalSeconds === 0) {
              clearInterval(this.timers[id])
              if (todo.id === id) {
                return {
                  ...todo,
                  isRun: false,
                }
              }
              delete this.timers[id]
            }
            totalSeconds -= 1

            const updatedMinutes = Math.floor(totalSeconds / 60)
            const updatedSeconds = totalSeconds % 60

            return {
              ...todo,
              minutes: updatedMinutes,
              seconds: updatedSeconds,
            }
          }
          return todo
        }),
      }))
    }, 1000)

    this.timers[id] = timerId
  }

  startTimer = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isRun: true,
          }
        }
        return todo
      }),
    }))
    this.timerUpdate(id)
  }

  stopTimer = (id) => {
    clearInterval(this.timers[id])

    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isRun: false,
          }
        }
        return todo
      }),
    }))

    delete this.timers[id]
  }

  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.state.todos.forEach((todo) => {
      if (todo.isRun) {
        this.startTimer(todo.id)
      }
    })
  }

  componentWillUnmount() {
    Object.values(this.timers).forEach((timerId) => {
      clearInterval(timerId)
    })
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
    const { todos, displayTodos } = this.state

    return (
      <section className="todoapp">
        <NewTaskForm addTask={this.addTask} />
        <TaskList
          displayTodos={displayTodos}
          todos={todos}
          removeTask={this.removeTask}
          setTodos={(updatedTodos) => this.setState({ todos: updatedTodos })}
          setDisplayTodos={(updatedTodos) => this.setState({ displayTodos: updatedTodos })}
          setNewTodos={this.setNewTodos}
          startTimer={this.startTimer}
          stopTimer={this.stopTimer}
        />
      </section>
    )
  }
}

export default App

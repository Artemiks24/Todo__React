import { useState, useEffect } from 'react'

import NewTaskForm from './components/NewTaskForm'
import TaskList from './components/TaskList'

function App() {
  const [todos, setTodos] = useState([])
  const [timers, setTimers] = useState({})
  const [filterMode, setFilterMode] = useState('All')

  const handleFilter = (e) => {
    const filter = e.target.innerText
    setFilterMode(filter)
  }

  const filteredTodos = () => {
    if (filterMode === 'Active') {
      return todos.filter((el) => !el.complete)
    }
    if (filterMode === 'Completed') {
      return todos.filter((el) => el.complete)
    }
    return todos
  }

  const todosFiltered = filteredTodos()

  const addTask = (userInput, seconds, minutes) => {
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
      setTodos((prevState) => [...prevState, newItem])
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

      setTodos((prevState) => [...prevState, newItem])
    }
  }

  const timerUpdate = (id) => {
    const timerId = setInterval(() => {
      setTodos((prevState) =>
        prevState.map((todo) => {
          if (todo.id === id && todo.isRun) {
            const { minutes, seconds } = todo
            let totalSeconds = minutes * 60 + seconds

            if (totalSeconds === 0) {
              clearInterval(timerId)
              return {
                ...todo,
                isRun: false,
              }
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
        })
      )
    }, 1000)

    timers[id] = timerId
  }
  const startTimer = (id) => {
    setTodos((prevState) =>
      prevState.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isRun: true,
          }
        }
        return todo
      })
    )
    timerUpdate(id)
  }

  const stopTimer = (id) => {
    clearInterval(timers[id])
    setTodos((prevState) =>
      prevState.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isRun: false,
          }
        }
        return todo
      })
    )

    setTimers((prevTimers) => ({ ...prevTimers, [id]: null }))
  }

  useEffect(() => {
    todos.forEach((todo) => {
      if (todo.isRun) {
        startTimer(todo.id)
      }
    })

    return () => {
      if (timers && Object.keys(timers).length > 0) {
        Object.values(timers).forEach((timerId) => {
          clearInterval(timerId)
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const removeTask = (id) => {
    setTodos([...todos.filter((todo) => todo.id !== id)])
  }

  return (
    <section className="todoapp">
      <NewTaskForm addTask={addTask} />
      <TaskList
        todos={todosFiltered}
        removeTask={removeTask}
        setTodos={setTodos}
        startTimer={startTimer}
        stopTimer={stopTimer}
        handleFilter={handleFilter}
        filterMode={filterMode}
      />
    </section>
  )
}

export default App

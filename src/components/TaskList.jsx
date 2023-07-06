import PropTypes from 'prop-types'

import Task from './Task'
import Footer from './Footer'

function TaskList({ todos, setTodos, removeTask, startTimer, stopTimer, filterMode, handleFilter }) {
  return (
    <section className="main">
      <ul className="todo-list">
        {todos.map((todo) => (
          <Task
            todos={todos}
            todo={todo}
            key={todo.id}
            setTodos={setTodos}
            removeTask={removeTask}
            startTimer={startTimer}
            stopTimer={stopTimer}
          />
        ))}
      </ul>
      <Footer handleFilter={handleFilter} filterMode={filterMode} todos={todos} setTodos={setTodos} />
    </section>
  )
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({})),
  setTodos: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
}

TaskList.defaultProps = {
  todos: [],
}
export default TaskList

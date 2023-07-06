import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import getActiveTodos from '../helper'

import TaskFilters from './TasksFilter'

function Footer({ todos, setTodos, filterMode, handleFilter }) {
  const [activeLengths, setActiveLengths] = useState(0)

  useEffect(() => {
    setActiveLengths(getActiveTodos(todos).length)
  }, [todos, setActiveLengths])

  const clearComplete = () => {
    setTodos(getActiveTodos(todos))
  }

  return (
    <footer className="footer">
      <span className="todo-count"> {activeLengths} items left</span>
      <button type="button" className="clear-completed" onClick={clearComplete}>
        Clear completed
      </button>
      <TaskFilters handleFilter={handleFilter} filterMode={filterMode} todos={todos} />
    </footer>
  )
}

Footer.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({})),
  setTodos: PropTypes.func.isRequired,
}

Footer.defaultProps = {
  todos: [],
}

export default Footer

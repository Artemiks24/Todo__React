import React from 'react'
import PropTypes from 'prop-types'

import { getCompletedTodos, getActiveTodos } from '../helper'

const ACTIVE = 'Active'
const ALL = 'All'
const COMPLETED = 'Complete'

class TaskFilters extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filterMode: ALL,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { todos, setDisplayTodos } = this.props
    const { filterMode } = this.state
    if (prevState.filterMode !== filterMode || prevProps.todos !== todos) {
      if (filterMode === ALL) {
        setDisplayTodos(todos)
      }
      if (filterMode === COMPLETED) {
        setDisplayTodos(getCompletedTodos(todos))
      }
      if (filterMode === ACTIVE) {
        setDisplayTodos(getActiveTodos(todos))
      }
    }
  }

  handleFilter = (mode) => {
    this.setState({ filterMode: mode })
  }

  render() {
    const { filterMode } = this.state

    return (
      <ul className="filters">
        <li>
          <button
            type="button"
            onClick={() => this.handleFilter(ALL)}
            className={filterMode === ALL ? 'selected' : null}
          >
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => this.handleFilter(ACTIVE)}
            className={filterMode === ACTIVE ? 'selected' : null}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => this.handleFilter(COMPLETED)}
            className={filterMode === COMPLETED ? 'selected' : null}
          >
            Completed
          </button>
        </li>
      </ul>
    )
  }
}

TaskFilters.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({})),
  setDisplayTodos: PropTypes.func.isRequired,
}

TaskFilters.defaultProps = {
  todos: [],
}

export default TaskFilters

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { getActiveTodos } from '../helper'

import TaskFilters from './TasksFilter'

class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeLengths: 0,
    }
  }

  componentDidMount() {
    const { todos } = this.props
    this.setState({
      activeLengths: getActiveTodos(todos).length,
    })
  }

  componentDidUpdate(prevProps) {
    const { todos } = this.props
    if (todos !== prevProps.todos) {
      this.setState({
        activeLengths: getActiveTodos(todos).length,
      })
    }
  }

  clearComplete = () => {
    const { setTodos, todos } = this.props
    setTodos(getActiveTodos(todos))
  }

  render() {
    const { todos, setDisplayTodos } = this.props
    const { activeLengths } = this.state

    return (
      <footer className="footer">
        <span className="todo-count"> {activeLengths} items left</span>
        <button type="button" className="clear-completed" onClick={this.clearComplete}>
          Clear completed
        </button>
        <TaskFilters setDisplayTodos={setDisplayTodos} todos={todos} />
      </footer>
    )
  }
}

Footer.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({})),
  setTodos: PropTypes.func.isRequired,
  setDisplayTodos: PropTypes.func.isRequired,
}

Footer.defaultProps = {
  todos: [],
}

export default Footer

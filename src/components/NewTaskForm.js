import React, { Component } from 'react'
import PropTypes from 'prop-types'

class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userInput: '',
    }
  }

  handleChange = (e) => {
    this.setState({
      userInput: e.currentTarget.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { addTask } = this.props
    const { userInput } = this.state
    addTask(userInput)
    this.setState({
      userInput: '',
    })
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleSubmit(e)
    }
  }

  render() {
    const { userInput } = this.state

    return (
      <header className="header">
        <h1>Todos</h1>
        <input
          onSubmit={this.handleSubmit}
          value={userInput}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyPress}
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </header>
    )
  }
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
}

export default NewTaskForm

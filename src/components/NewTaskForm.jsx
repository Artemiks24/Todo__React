import React, { Component } from 'react'
import PropTypes from 'prop-types'

class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userInput: '',
      seconds: 0,
      minutes: 0,
    }
  }

  handleChange = (e) => {
    this.setState({
      userInput: e.currentTarget.value,
    })
  }

  handleChangeSec = (e) => {
    this.setState({
      seconds: parseInt(e.currentTarget.value, 10),
    })
  }

  handleChangeMin = (e) => {
    this.setState({
      minutes: parseInt(e.currentTarget.value, 10),
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { addTask } = this.props
    const { userInput, seconds, minutes } = this.state
    addTask(userInput, seconds, minutes)
    this.setState({
      userInput: '',
      seconds: 0,
      minutes: 0,
    })
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleSubmit(e)
    }
  }

  render() {
    const { userInput, seconds, minutes } = this.state

    return (
      <form className="header">
        <h1>Todos</h1>
        <input
          onSubmit={this.handleSubmit}
          value={userInput}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyPress}
          className="new-todo"
          placeholder="What needs to be done?"
        />
        <input
          type="number"
          value={minutes}
          min={0}
          max={59}
          className="new-todo-form__timer"
          onChange={this.handleChangeMin}
          onKeyDown={this.handleKeyPress}
          placeholder="Min"
        />
        <input
          type="number"
          value={seconds}
          min={0}
          max={59}
          className="new-todo-form__timer"
          onChange={this.handleChangeSec}
          onKeyDown={this.handleKeyPress}
          placeholder="Sec"
        />
      </form>
    )
  }
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
}

export default NewTaskForm

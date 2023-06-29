import React from 'react'
import PropTypes from 'prop-types'

function Timer({ todo, onStart, onStop }) {
  return (
    <span className="created">
      {todo.isRun ? (
        <button className="icon icon-pause" type="button" aria-label="pause" onClick={onStop} />
      ) : (
        <button className="icon icon-play" type="button" aria-label="play" onClick={onStart} />
      )}
      {todo.minutes < 10 ? `0${todo.minutes}` : todo.minutes}:{todo.seconds < 10 ? `0${todo.seconds}` : todo.seconds}
    </span>
  )
}

Timer.propTypes = {
  todo: PropTypes.shape({
    checked: PropTypes.bool,
    complete: PropTypes.bool,
    id: PropTypes.string,
    task: PropTypes.string,
    seconds: PropTypes.number,
    minutes: PropTypes.number,
    isRun: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
  }),
  onStart: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
}

Timer.defaultProps = {
  todo: {},
}

export default Timer

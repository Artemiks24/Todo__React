import PropTypes from 'prop-types'

function TaskFilters({ filterMode, handleFilter }) {
  return (
    <ul className="filters">
      <li>
        <button type="button" onClick={handleFilter} className={filterMode === 'All' ? 'selected' : null}>
          All
        </button>
      </li>
      <li>
        <button type="button" onClick={handleFilter} className={filterMode === 'Active' ? 'selected' : null}>
          Active
        </button>
      </li>
      <li>
        <button type="button" onClick={handleFilter} className={filterMode === 'Completed' ? 'selected' : null}>
          Completed
        </button>
      </li>
    </ul>
  )
}

TaskFilters.propTypes = {
  handleFilter: PropTypes.func.isRequired,
}

TaskFilters.defaultProps = {}

export default TaskFilters

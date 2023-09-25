import PropTypes from 'prop-types'

const TaskFilter = ({handleSelectChange, handleTextChange}) => {
  return (
    <div className="flex mb-2">
        <select 
          onChange={handleSelectChange}
          className="flex-1 mr-3 p-2 focus:outline-none bg-white border border-gray-400">
            <option value="1">Show all tasks</option>
            <option value="2">Show done</option>
            <option value="3">Show Remain</option>
        </select>

        <input 
            onChange={(e) => handleTextChange(e.target.value)}
            type="text" 
            className="flex-1 border border-gray-400 focus:outline-none"
            name="search-tasks"
            />
    </div>
  )
}

TaskFilter.propTypes = {
  handleSelectChange: PropTypes.func.isRequired,
  handleTextChange: PropTypes.func.isRequired,
}

export default TaskFilter
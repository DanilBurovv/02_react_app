import {useState, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import Task from './Task'
import TaskFilter from './TaskFilter'
import useClickOutside from '../hooks/useClickOutside'

function filterTasks(tasks, selectFilter, textFilter) {

    textFilter && 
      (tasks = tasks.filter((t) => 
        t.title.toLowerCase().includes(textFilter.toLowerCase())
      ));

  selectFilter === 2 && (tasks = tasks.filter((t) => t.done))
  selectFilter === 3 && (tasks = tasks.filter((t) => !t.done))
  return tasks;
}

const TasksList = ({tasks, toggleTask, removeTask, updateTask}) => {
    const [selectFilter, setSelectFilter] = useState(0)
    const [textFilter, setTextFilter] = useState("")
    const [isUpdated, setIsUpdated] = useState(null)

    const ref = useRef();
    useClickOutside(ref, () => setIsUpdated(null))

    const handleIsUpdated = id => setIsUpdated(x => x === id ? null : id)

    const filteredTasks = useMemo(() => 
    filterTasks(tasks, selectFilter, textFilter),
    [tasks, selectFilter, textFilter]
    );

    const handleSelectChange = (e) => {
        setSelectFilter(+e.target.value);
    };
    const handleTextChange = val => {
        setTextFilter(val);
    };

  return (
        <>
            <TaskFilter 
                handleSelectChange={handleSelectChange}
                handleTextChange={handleTextChange}
            />
            <ul ref={ref} className='mb-5'>
                {filteredTasks.map((task) => 
                    <Task key={task.id} task={task}
                    toggleTask={toggleTask}
                    removeTask={removeTask}
                    updateTask={updateTask}
                    handleIsUpdated={handleIsUpdated}
                    isUpdating = {isUpdated === task.id}
                    />
                )}
            </ul>
        </>
    );
}

TasksList.propTypes = {
    tasks: PropTypes.array.isRequired,
    toggleTask: PropTypes.func.isRequired,
    removeTask: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
}

export default TasksList
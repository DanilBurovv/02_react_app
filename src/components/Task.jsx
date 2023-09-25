import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { FaTrash, FaCheck, FaSave} from "react-icons/fa";
import {toast} from 'react-toastify'

const Task = ({task, toggleTask, removeTask, updateTask, isUpdating, handleIsUpdated}) => {
  const[updateVal, setUpdateVal] = useState("")

  const inputRef = useRef();

  useEffect (() => {
    if(isUpdating){
      inputRef.current.focus();
    }
  }, [isUpdating])

  const handleIsUpdating = e => {
    handleIsUpdated(task.id);
    setUpdateVal(task.title);
  }

  const handleUpdateVal = (e) => {
    setUpdateVal(e.target.value)
  }

  const handleClickUpdate = () => {
    updateTask(task.id, updateVal)
    handleIsUpdated(null)
  }

  let spanCls = "grow mr-6"
  if(task.done){
    spanCls += " text-red-800 line-through"
  }

  const removeTaskHandle = () => {
    removeTask(task.id).then(() => toast.success("Task has been removed"))
  }

  return (
    <li className="flex items-center border border-gray-300 p-2 shadow mb-2">
        <span onDoubleClick={handleIsUpdating} className={spanCls}>{isUpdating ? <input 
            value={updateVal}
            ref={inputRef}
            onChange={handleUpdateVal}
            className="custom-input"
          /> : task.title}
        </span>
        <div className="ml-auto flex">
          <div onClick={handleClickUpdate} className="mr-3">
            <FaSave />
          </div>
        </div>

        <div className="ml-auto flex">
            <div onClick={() => toggleTask(task.id)} className="mr-4">
                <FaCheck style={{color: task.done ? "orange" : "green"}} className="cursor-pointer" />
            </div>
            <div onClick={removeTaskHandle} className="mr-4">
                <FaTrash className="cursor-pointer" />
            </div>
        </div>
    </li>
  )
}

Task.propTypes = {
  task: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
  }).isRequired,
  toggleTask: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  isUpdating: PropTypes.bool.isRequired,
  handleIsUpdated: PropTypes.func.isRequired,
}

export default Task
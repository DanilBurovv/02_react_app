import {useState} from 'react'
import PropTypes from 'prop-types'
import {generate as id} from "shortid"
import {toast} from 'react-toastify'

const TaskForm = ({addTask}) => {
const [value, setValue] = useState('')

const handleChange = (e) => setValue(e.target.value)

const handleSubmit = (e) => {
    e.preventDefault();
    if(!value.trim().length) {
        toast.warn("Input tasks title");
        return;
    }

    const newTask = { id: id(), title: value, done: false };
    addTask(newTask).then(() => {
        setValue("");
        toast.success("Task has been added successfully")
    });
    setValue("")
} 

  return (
    <>
        <p className="text-amber-600 text-center mb-3 text-2xl">Add task</p>
        <form onSubmit={handleSubmit} className="" autoComplete="off">
            <div className="mb-3 flex">
                <input 
                    value={value}
                    onChange={handleChange}
                    type="text" 
                    name="title"
                    id="title"
                    placeholder="Add task"
                    className="border border-gray-300 px-3 py-2 mr-4 bg-white focus:outline-none"
                />
                <button
                    type="submite"
                    className="px-4 py-2 bg-blue-500 rounded-md text-white"
                >
                    Add task
                </button>
            </div>
        </form>
    </>
  )
}


TaskForm.propTypes = {
    addTask: PropTypes.func.isRequired,
}

export default TaskForm
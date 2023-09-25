import {useState} from 'react'
import TaskForm from "./components/TaskForm";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import TaskInfo from "./components/TaskInfo";
import TasksList from "./components/TasksList";
import data from './data'

function App() {
  const [tasks, setTasks] = useState([...data])

  const addTask = async (task) => setTasks((x) => [...x, task])

  const toggleTask = (id) => 
    setTasks(tasks => 
      tasks.map((t) => (t.id === id ? {...t, done : !t.done} : t)
  ));

  const removeTask = async (id) =>{ 
    if (!window.confirm('Are you sure?')){
      return
    }
    setTasks ((tasks) => tasks.filter((t) => t.id !== id));
}

const updateTask = async (id, title) => {
  setTasks ((tasks) => tasks.map(t => (t.id === id ? { ...t, title } : t)))
}

  return (
    <section className="w-[1200px] mx-auto">
      <h3 className="text-center mb-4 text-4xl">List of tasks</h3>
      <hr />

      <div className="grid grid-cols-2 gap-6">
        <div className="p-2">
          <TasksList tasks={tasks}
            toggleTask={toggleTask}
            removeTask={removeTask}
            updateTask={updateTask}
            />
        </div>
        <div className="p-2">
          <TaskInfo tasks={tasks}/>
          <hr className="h-[3px] bg-slate-100 mb-4"/>
          <TaskForm addTask={addTask} />
        </div>
      </div>
      <ToastContainer autoClose={2000} />
    </section>
  );
}

export default App;

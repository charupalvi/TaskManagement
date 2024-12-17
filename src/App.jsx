import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Task from './Task.jsx';
import Button from './Button.jsx';
import AddTask from './AddTask.jsx'
import EditTask from './EditTask.jsx';

function App() {
  const [taskList, setTaskList] = useState([]);
  const [showForm,setShowForm] = useState(false);
  const [editingTask,setEditingTask]=useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/todoapi/')
    .then(resp=>resp.json())
    .then(data => {
      setTaskList(data);
      console.log(data);
    });
  },[]);

 const toggleForm=()=>{
  setShowForm(!showForm);
 }

 const addTask = (task) => {
  alert("Task added succesfully")
  setTaskList((prevList) => ([...prevList, task]));
  setShowForm(false);
}

const handlingEditTask=(task) => {
  setEditingTask(task);
}

const afterUpdate=(editedTask)=>{
  setTaskList((prevList)=>(
    prevList.map(todo => {
      return (todo.id === editedTask.id) ? editedTask : todo
    })
  ));
  setEditingTask(null);
}

const deleteTask=async (taskId)=>{
  const [firstTask]=taskList.filter(task=>task.id === taskId);
  console.log(firstTask);
  
  if(confirm("Do you want to delete the task:- "+firstTask.title)){
    try{
  const response = await fetch(`http://localhost:8000/todoapi/${taskId}/`,{
    method: "DELETE"
  });
  if(response.ok) {
    alert("Task Deleted Successfully !!!");
    setTaskList((prevList)=>
      prevList.filter(todo => {
        return (todo.id !== taskId) 
      })
    );
  }

  else{
    console.log("Failed to delete the Task !!!");
  }
}
catch(err){
  console.error("Failed to deleted Tasl: ",err);
}
  }
}
  return (
    <>
     
      <h1><u>Project Tasks</u></h1> <br />
      <Button text={showForm ? "Close Form" : "Add Task"} onChange={toggleForm} />
      {
        showForm && <AddTask addTask={addTask} />
      }
      <div className='row'>{
              taskList && taskList.map(taskObj => {
                return <Task key={taskObj.id}
                task={taskObj} onEdit={handlingEditTask} deleteTask={deleteTask} />
              })}

      </div>
      {
        editingTask && <EditTask task={editingTask} afterEdit={afterUpdate} />
      }
    </>
  )
}

export default App

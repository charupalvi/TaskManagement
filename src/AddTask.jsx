import React, { useState } from 'react'

export default function AddTask({ addTask }) {
  const [newTask,setNewTask]=useState({
    title: "",
    description: "",
    is_completed: false,
  });

  const onInputChange=(event)=>{
    // console.log(event.target.name);
    // console.log(event.target.value);
    const {name,value} = event.target;
    setNewTask((prevTask)=>({
      ...prevTask,
      [name]:value}))
  
  }

  // const formSubmit=(event)=>{
  //   event.preventDefault();
  // }

  const handleSubmit = async (event)=>{
    event.preventDefault();
    console.log(newTask);
    
    try {
        const task = await fetch('http://localhost:8000/todoapi/',{
                                method:'POST',
                                headers:{
                                    "Content-Type":"application/json"
                                },
                                body:JSON.stringify(newTask)
                            })
                            .then(resp => resp.json())
                            .then(data => { 
                              console.log(data);
                              
                                return data; // return this to task obj
                            })
                            .catch(err => console.log("failed to create task !!!"));
        addTask(task);                    
        setNewTask({ title: "", description: "", is_completed: false });
    }      
    catch(err)  {
        console.error("Error: ",err);            
    }
}


  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Add New Task</h3>

      {/* Form Wrapper with Border, Background, and Smaller Width */}
      <div className="border rounded p-4 w-50 mx-auto shadow-sm bg-light">
        <form>
          <div className="mb-3">
            <label htmlFor="inputTaskName" className="form-label">
              <b>Task Name:</b>
            </label>
            <input
              type="text"
              className="form-control"
              id="inputTaskName"
              placeholder="Enter task name"
              name="title"
              onChange={onInputChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="taskDescription" className="form-label">
              <b>Task Description:</b>
            </label>
            <textarea
              className="form-control"
              id="taskDescription"
              rows="4"
              placeholder="Enter task description"
              name="description"
              onChange={onInputChange}
            ></textarea>
          </div>

          {/* Checkbox with Label Close to It */}
          {/* <div className="mb-3 d-flex align-items-center">
            <input
              className="form-check-input me-2 custom-checkbox"
              type="checkbox"
              id="gridCheck1"
            />
            <label className="form-check-label mb-0" htmlFor="gridCheck1">
              Is Completed?
            </label>
          </div> */}


          <div className="text-center">
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
              Add Task
            </button>
          </div>
        </form>
      </div>
      <style>
        {`
          /* Unchecked State: Yellow Border and Background */
          .custom-checkbox {
            border: 2px solid #ffc107; /* Bootstrap warning yellow */
            background-color: #fff3cd; /* Light yellow */
          }

          /* Checked State: Green Success Colors */
          .custom-checkbox:checked {
            background-color: #198754 !important; /* Bootstrap success green */
            border-color: #198754 !important; /* Bootstrap success green */
          }
        `}
      </style>
    </div>
  )
}

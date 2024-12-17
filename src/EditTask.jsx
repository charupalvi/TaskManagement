import React, { useState } from 'react'

export default function EditTask({ task, afterEdit }) {
  const [updatedTask, setUpdatedTask] = useState({ ...task })

  // Handle input change for text inputs and checkbox
  const handleInputChange = (event) => {
    setUpdatedTask((prevTask) => ({
      ...prevTask,
      [event.target.name]:
        event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    }))
  }

  // Submit handler
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch(`http://localhost:8000/todoapi/${updatedTask.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      })
      if (response.ok) {
        const editedTask = await response.json()
        alert('Task Updated Successfully !!!')
        afterEdit(editedTask)
      } else {
        console.error('Failed to Update Task !!!')
      }
    } catch (err) {
      console.error('Error: ', err)
    }
  }

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Update Task</h3>

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
              value={updatedTask.title}
              onChange={handleInputChange}
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
              value={updatedTask.description}
              onChange={handleInputChange}
            ></textarea>
          </div>

          {/* Checkbox with Dynamic Label */}
          <div className="mb-3 d-flex align-items-center">
            <input
              className="form-check-input me-2 custom-checkbox"
              type="checkbox"
              id="gridCheck1"
              name="is_completed"
              checked={updatedTask.is_completed}
              onChange={handleInputChange}
            />
            <label className="form-check-label mb-0" htmlFor="gridCheck1">
              {updatedTask.is_completed ? 'Completed' : 'Incomplete'}
            </label>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
              Update Task
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

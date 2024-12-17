import React from 'react'

export default function Task({ task, onEdit, deleteTask }) {
  return (
    <div className="col-md-4 mt-3">
      {/* Card with Fixed Height */}
      <div className="card h-100 d-flex flex-column" style={{ minHeight: '250px' }}>
        {/* Card Body */}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{task.title}</h5>
          <p className="card-text">{task.description}</p>

          {/* Fixed Badge */}
          <div className="position-absolute top-0 end-0 p-2">
            <span
              className={`badge ${
                task.is_completed ? 'bg-success' : 'bg-danger'
              }`}
            >
              {task.is_completed ? 'Completed' : 'Incomplete'}
            </span>
          </div>

          {/* Spacer pushes content upward */}
          <div className="mt-auto"></div>
        </div>

        {/* Footer with Buttons */}
        <div className="card-footer bg-white border-0">
          <div className="d-flex justify-content-between gap-2">
            <button
              className="btn btn-warning flex-grow-1"
              onClick={() => onEdit(task)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger flex-grow-1"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

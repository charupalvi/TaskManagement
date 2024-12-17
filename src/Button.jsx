import React from 'react'

export default function Button({text,onChange}) {
  return (
    <button className='btn btn-primary' onClick={onChange}>{text}</button>    
)
}

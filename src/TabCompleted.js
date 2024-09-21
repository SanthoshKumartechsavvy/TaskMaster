import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'

const TabCompleted = ({completed, handleCheckbox, handleDelete}) => {

  return (
    <ul className='todo'>
      {
        completed.map( (task) => (
            <li key={completed.id}>
                <input 
                    type="checkbox"
                    checked={task.checked}
                    onChange={() => handleCheckbox(task.id)}
                    />
                <div className='todocontent'>
                    <h2 className='completed-title'>{task.title}</h2>
                    <p className='completed-description'>{task.description}</p>
                </div>
                <div className="taskdetails">
                    <p> Task completed on {task.date} </p>
                    <p> Task completed wihtin {task.completedTime} </p>
                </div>     
                <div className="icons">
                    <div className="icondelete">
                       <FaTrashAlt
                        role='button'
                        onClick={() => handleDelete(task.id)}
                        tabIndex="0"
                        />  
                    </div>
                </div>             
            </li>
         ) )
      }
    </ul>
  )
}

export default TabCompleted

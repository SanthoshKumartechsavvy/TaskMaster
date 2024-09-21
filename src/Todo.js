import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'
import { FaStopwatch } from 'react-icons/fa'

const Todo = ({todo, handleCheckbox, handleDelete, handleEdit, handleDoing}) => {
  return (
    <ul className='todo'>
      {
        todo.map( (task) => (
            <li key={todo.id}>
                <input 
                    type="checkbox"
                    checked={task.checked}
                    onChange={() => handleCheckbox(task.id)}
                    />
                <div className='todocontent'>
                    <h2>{task.title}</h2>
                    <p>{task.description}</p>
                  <span className='taskposted'>Task posted on {task.datePosted} </span>
                </div>
                
                <div className='icons'>
                    <div className="icondoing">
                       <FaStopwatch
                        role='button'
                        onClick={() => handleDoing(task.id)}
                        tabIndex="0"
                        />  
                    </div>
                    <div className="icon">
                       <FaEdit
                        role='button'
                        onClick={() => handleEdit(task.id)}
                        tabIndex="0"
                        />  
                    </div>
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

export default Todo

import React from 'react'
import { FaTimes } from 'react-icons/fa'

const EditDialogbox = ({editDescription, setEditTitle, editTitle,  setEditDescription, handleSubmitEdit, selectedId, handleClose}) => {
  return (
    
    <form onSubmit={(e) => e.preventDefault()} id='edittask' className='edittask'>

      <FaTimes
        onClick={handleClose}
        style={{fontSize: '2rem',
                marginBottom: '1rem',
                // position: 'relative',
                left: '320px',
                top: '-10px',
                color: 'red',
                cursor: 'pointer'
        }}/>
      <div className='edittitle'>
        <label htmlFor="edittask"> Edit tasks</label>
        <h4>Title: </h4>
        <input 
          type="text" 
          id='edittask'
          placeholder='Edit the title of your task'
          required
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          />
      </div>
      
      <div className='editdescription'>
        <h4>Description: </h4>  
        <input 
          type="text" 
          id='edittask'
          placeholder='Edit the description of your task'
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          />
      </div>
      <button onClick={() => handleSubmitEdit(selectedId)} type='submit' > Edit Task </button> 
      
    </form>      
  )
}

export default EditDialogbox

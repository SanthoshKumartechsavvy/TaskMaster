import React from 'react'

const AddTasks = ({title, setTitle, description, setDescription, handleAdd}) => {
  return (
    <form id='addtask' onSubmit={handleAdd} className='addtasks'>
      <div className='title'>
        <label htmlFor="addtasks"> Add tasks</label>
        <h4>Title: </h4>
        <input 
          type="text" 
          id='addtasks'
          placeholder='Enter the title of your task'
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          />
      </div>
      
      <div className='description'>
        <h4>Description: </h4>  
        <input 
          type="text" 
          id='addtasks'
          placeholder='Enter the description of your task'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          />
      </div>
      <button type='submit' > Add Task </button>  
      
    </form>
  )
}

export default AddTasks

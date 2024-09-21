import React from 'react'
import { FaPause, FaPlay } from 'react-icons/fa'

const TabDoing = ({doing, handleCheckbox, formatTime, handleAbort, handlePause, handlePlay, pauseOn}) => {
    
  return (
    <ul className='doing'>
      {
        doing.map( (task) => (
            <li key={doing.id}>
                <input 
                    type="checkbox"
                    checked={task.checked}
                    onChange={() => handleCheckbox(task.id)}
                    />
                <div className='doingcontent'>
                    <h2>{task.title}</h2>
                    <p>{task.description}</p>
                    <span className='taskposted'>Task started on {task.dateDoing} </span>

                </div>  
                <div className='stopwatch'>{formatTime()}</div> 
                <div className="icons">
                  {

                  pauseOn ? 
                    <div className="pause">
                      <FaPlay
                        role='button'
                        onClick= {() => handlePlay(task.id)}
                        tabIndex="0"
                        />
                    </div>
                   : 
                    <div className="pause">
                      <FaPause
                        role='button'
                        onClick={() => handlePause(task.id)}
                        tabIndex="0"
                        />
                    </div>
                  }
                  

                </div>
                <button className='abort' onClick={() => handleAbort(task.id)}>Abort!</button>
            </li>
         ) )
      }
    </ul>
  )
}

export default TabDoing

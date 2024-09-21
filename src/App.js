import Header from "./Header";
import AddTasks from "./AddTasks";
import Nav from "./Nav";
import Search from "./Search";
import Todo from "./Todo";
import TabCompleted from "./TabCompleted";
import TabDoing from "./TabDoing";
import EditDialogbox from "./EditDialogbox";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { format } from 'date-fns'; 
import { Helmet } from 'react-helmet';


function App() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [search, setSearch] = useState('');
  const [todo, setTodo] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [doing, setDoing] = useState([]);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [active, setActive] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [pauseOn, setPauseOn] = useState(false);

  // timer for doing tab

  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    let storedTodo = JSON.parse(localStorage.getItem('Todo'));
    console.log(storedTodo);
    if(storedTodo) {
      setTodo(storedTodo);
    }
      
  }, []);

  useEffect(() => {

    if(isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      clearInterval(intervalIdRef.current);
    }
  }, [isRunning]);
 


  useEffect(() => {
    const filteredResults = todo.filter((task) => (task.title).toLowerCase().includes(search.toLowerCase())
      || (task.description).toLowerCase().includes(search.toLowerCase()));
    const todoResults = filteredResults.filter((task) => task.checked === false && task.isdoing === false);
    setSearchResults(todoResults.reverse());

  },[todo,search]);


  useEffect(() => {
    const filteredResults = todo.filter((task) => (task.title).toLowerCase().includes(search.toLowerCase())
      || (task.description).toLowerCase().includes(search.toLowerCase()));
    const completedTasks = filteredResults.filter((task) => task.checked === true);
    setCompleted(completedTasks);
  }, [todo,search]);

  useEffect(() => {
    const doingtasks = doing.filter((task) => task.checked === false);
    setDoing(doingtasks);
  },[completed]);

  useEffect(() => {
    const doingTasks = todo.filter((task) => task.isdoing === true);
    setDoing(doingTasks);
  }, [todo]);


  const handleAdd = (e) => {
    e.preventDefault();
    const newTaskId = todo.length ? todo[todo.length - 1].id + 1 : 1;
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'dd/MM/yyyy HH:mm ');
    const newTask = {
      id: newTaskId,
      title: title,
      description: description,
      checked: false,
      isdoing: false,
      isRunning: isRunning,
      datePosted: formattedDate
    }  
    const updatedTodo = [...todo];
    updatedTodo.push(newTask);
    setTodo(updatedTodo);
    localStorage.setItem('Todo', JSON.stringify(updatedTodo));
    setTitle('');
    setDescription('');
    navigate('/');
  }

  const handleCheckbox = (key) => {

    //Time format
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60 ) % 60);
    let seconds = Math.floor(elapsedTime / (1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);
    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    const currentDate = new Date();
    const formattedDate = format(currentDate, 'dd/MM/yyyy HH:mm ');
    const tasks = todo.map((task) => task.id === key ? {...task, checked: !task.checked, isdoing: false, date: formattedDate, completedTime: `${hours}:${minutes}:${seconds}:${milliseconds}` } : task);
    setTodo(tasks);
    localStorage.setItem('Todo', JSON.stringify(tasks));
    setIsRunning(false);
    setElapsedTime(0);
    navigate('/completed');
  }

  const handleDelete = (key) => {
    const tasks = todo.filter((task) => task.id !== key);
    setTodo(tasks);
    localStorage.setItem('Todo', JSON.stringify(tasks));
  }

  const handleEdit = (key) => {
    setActive(true);
    const selectedTask = todo.filter((task) => task.id === key);
    setEditTitle(selectedTask[0].title);
    setEditDescription(selectedTask[0].description);
    setSelectedId(selectedTask[0].id);
  }

  const handleClose = () => {
    setActive(false);
  }

  const handleSubmitEdit = (key) => {
    const currentTask = todo.filter((task) => task.id === key );
    const updatedTask = { 
      id: key,
      title: editTitle,
      description: editDescription,
      checked: false,
      isdoing: false,
      isRunning: isRunning,
      datePosted: currentTask[0].datePosted
     }
     const editedTodo = todo.map((task) => task.id === key ? {...updatedTask} : task);
     setTodo(editedTodo);
     localStorage.setItem('Todo', JSON.stringify(editedTodo));
     setActive(false);
  }

  const handleDoing = (key) => {
    if(!doing.length) {

      const currentDate = new Date();
      const formattedDate = format(currentDate, 'dd/MM/yyyy HH:mm ');
      const tasks = todo.map((task) => task.id === key ? {...task, isdoing: true, isRunning: true, datePosted: todo[0].datePosted, dateDoing: formattedDate} : task);
      setTodo(tasks);
      setIsRunning(true);
      navigate('/doing');
      localStorage.setItem('Todo', JSON.stringify(tasks));

      startTimeRef.current = Date.now() - elapsedTime;
    }
    else {
      alert("You are already doing a task....Abort that to start a new task");
    }
  }

  const handleAbort = (key) => {
    const notDoing = doing.map((task) => task.id === key ? {...task, isdoing: false, isRunning: false} : task);
    setIsRunning(notDoing[0].isRunning);
    const updatedTodo = [...todo];
    updatedTodo.push(notDoing[0]);
    setTodo(updatedTodo);
    const NotDoingTodo = todo.map((task) => task.id === key ? {...task, isdoing: false, isRunning: false}: task);
    setTodo(NotDoingTodo);
    localStorage.setItem('Todo', JSON.stringify(NotDoingTodo));
    setElapsedTime(0);
    setDoing(notDoing);
    navigate('/');
  }

  const formatTime = () => {
    
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60 ) % 60);
    let seconds = Math.floor(elapsedTime / (1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");


    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  }

  const handlePause = (key) => {
    const paused = doing.map((task) => task.id === key ? {...task, isRunning: false} : task);
    setDoing(paused);
    setIsRunning(paused[0].isRunning);
    setPauseOn(true);
    }
  const handlePlay = (key) => {
    const paused = doing.map((task) => task.id === key ? {...task, isRunning: true} : task);
    setDoing(paused);
    setIsRunning(paused[0].isRunning);
    startTimeRef.current = Date.now() - elapsedTime;
    setElapsedTime(Date.now() - startTimeRef.current);
    setPauseOn(false);
  }

  return (
    <div className="App">
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <Header/>
      <div className="content">
        <AddTasks
          title = {title}
          setTitle = {setTitle}
          description = {description}
          setDescription = {setDescription}
          handleAdd = {handleAdd}
          />
        <Search
          search = {search}
          setSearch = {setSearch}
          />
        <Nav/>
        
      </div>
      <div className="tasks-cont">
        <Routes>
            <Route path='/' element={<Todo
              todo = {searchResults}
              handleCheckbox = {handleCheckbox}
              handleDelete = {handleDelete}
              handleEdit = {handleEdit}
              handleDoing = {handleDoing}
              />}/>
            <Route path='/completed' element={<TabCompleted
              completed = {completed}
              handleCheckbox={handleCheckbox}
              handleDelete = {handleDelete}
              formatTime={formatTime}
              search = {search}
              setSearchResults = {setSearchResults}
              />}/>
            <Route path='/doing' element={<TabDoing
              doing = {doing}
              handleAbort = {handleAbort}
              handleCheckbox={handleCheckbox}
              setIsRunning = {setIsRunning}
              formatTime = {formatTime}
              handlePause = {handlePause}
              handlePlay = {handlePlay}
              pauseOn = {pauseOn}
              
              />}/>
        </Routes>
      </div>
        {
          active && <EditDialogbox
            setEditTitle = {setEditTitle}
            editTitle = {editTitle}
            setEditDescription = {setEditDescription}
            editDescription = {editDescription}
            handleSubmitEdit = {handleSubmitEdit}
            selectedId = {selectedId}
            handleClose = {handleClose}
            />
        }

      
    </div>
    
  );
}

export default App;

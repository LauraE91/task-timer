import React, { useState, useEffect } from 'react'
import './App.css';
import StartView from './StartView';
import Stopwatch from './Stopwatch';


// Things I want to do:

// Automatically capitalize the taskInput
// Possibly change the color of the newest task?


function App() {
  const [ view, setView ] = useState("startView");
  const [ taskInput, setTaskInput] = useState();
  //const [taskHistory, setTaskHistory] = useState();




  const handleStartTask = (taskInput) => {
    setView("startClicked");
    setTaskInput(taskInput);
  }

  const handleBackClick = () => {
    setView("startView");
    setTaskInput()
  }

  const handleChange = e => {
    setTaskInput(e.target.value)
  }

  const display = () => {
    switch(view) {
      case "startClicked":
        return (
          <Stopwatch taskInput={taskInput} handleBackClick={handleBackClick}
          />
        )
        break;

      default:
      return (
        <StartView
        taskInput={taskInput}
        handleChange={handleChange}
        handleStartTask={handleStartTask}/>

      )
      break;
        }
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">Task Timer</div>
      </nav>
      {display()}
    </div>
  )
}



export default App;
//

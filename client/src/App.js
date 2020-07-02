import React, { useState, useEffect } from 'react'
import './App.css';
import StartView from './StartView';
import Stopwatch from './Stopwatch';
import GlobalStateContext from './GlobalStateContext';

// Things I want to do:

/*
Add a tasks to the time. So it's kind of like labeling it.
Add notes. Also Edit both the task and the notes.
Also remove notes. But there HAS to be a label for the time.


It will give the total time spent on a task.
It will record it in a history.

That's it.
*/

// When I hit "done" go to a screen with a history box and record the task with the time and date. Save these to local storage.


function App() {
  const [ view, setView ] = useState("startView");
  const [ taskInput, setTaskInput] = useState();
  const [taskHistory, setTaskHistory] = useState();



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
        {display()}
    </div>
  )
}



export default App;

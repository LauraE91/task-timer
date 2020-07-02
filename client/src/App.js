import React, { useState, useEffect } from 'react'
import {
  useHistory,
  withRouter,
} from "react-router-dom";
import './App.css';

import StartView from './StartView';
import Stopwatch from './Stopwatch';

// Things I want to do:

/*
Add a tasks to the time. So it's kind of like labeling it.
Add notes. Also Edit both the task and the notes.
Also remove notes. But there HAS to be a label for the time.


It will give the total time spent on a task.
It will record it in a history.

That's it.
*/

// Add a back arrow from the stopwatch to the start view. useHistory?



function App() {
  const [ view, setView ] = useState("startView");
  const [ taskInput, setTaskInput] = useState();

  const handleStartTask = () => {
    setView("startClicked");
  }

  const handleBackClick = () => {
    setView("startView");
  }

  const handleChange = e => {
    setTaskInput(e.target.value)
    console.log(e.target.value)
  }

  const display = () => {
    switch(view) {
      case "startClicked":
        return (
          <Stopwatch handleBackClick={handleBackClick}/>
        )
        break;


      default:
      return (
        <StartView taskInput={taskInput} handleChange={handleChange} handleStartTask={handleStartTask}/>
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

const AppWithRouter = withRouter(App);

export default AppWithRouter;

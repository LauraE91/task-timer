import React, { useState, useEffect } from 'react'
import './globalStyles.css';
import './themeStyles.css';
import StartView from './StartView';
import Stopwatch from './Stopwatch';
import {ThemeContextConsumer} from './ThemeContext';



function App() {
  const [ view, setView ] = useState("startView");
  const [ taskInput, setTaskInput] = useState();



  const handleStartTask = (taskInput) => {
    setView("startClicked");

    if(!taskInput) {
      setTaskInput(taskInput)
    } else {
      // Lowercase taskInput
      const lowerCaseTask = taskInput.toLowerCase();

      //Capitlize first letter of taskInput
      const firstLetter = taskInput.charAt(0).toUpperCase();
      // Combine to capitalize taskInput
      const capitalizedTaskInput = firstLetter + lowerCaseTask.slice(1)

      setTaskInput(capitalizedTaskInput);
    }

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


    <ThemeContextConsumer>
      {context => (
        <div className={`app app-${context.theme}-theme`}>
        <nav className={`navbar navbar-${context.theme}-theme`}>
          <div className="logo">Task Timer</div>
          <div onClick={context.handleToggleTheme} className="toggle-mode">
            <span className={`material-icons material-icons-${context.theme}-theme`}>
            brightness_6
            </span>
          </div>
        </nav>
        {display()}
      </div>
      )}
    </ThemeContextConsumer>


  )
}



export default App;
//

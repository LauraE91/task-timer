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
          <div className="nav-left">
            <h1 className="logo">Task Timer</h1>
            <p className="nav-link"><span className="down-arrow material-icons">
            keyboard_arrow_down
            </span> How To
            <div className={`how-to-box how-to-box-${context.theme}-theme`}>
              <ul>
                <li>To get started, enter a task you would like to time and click start. The app will automaticaly begin timing your progress.</li>
                <li>Upon clicking done, your task will be added to your task history. You also have the option to remove a task.</li>
                <li>All tasks are stored on your local machine for as long as you want. However, storage is limited.</li>
                <li><strong>Don't refresh the page while you are in the middle of a task</strong> (even if it is paused) or else you will lose your time!</li>
              </ul>
            </div>
            </p>
          </div>
          <div onClick={context.handleToggleTheme} className="toggle-mode">
            <span className={`material-icons material-icons-${context.theme}-theme theme-toggle-btn`}>
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

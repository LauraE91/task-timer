import React, { useState, useEffect } from 'react';
import './globalStyles.css';
import './themeStyles.css';
import './stopwatch.css';
import TaskHistoryList from './TaskHistoryList';
import {ThemeContextConsumer} from './ThemeContext';


function Stopwatch(props) {
  const [ theInterval, setTheInterval ] = useState();
  const [ times, setTimes ] = useState({
    sec: 0,
    min: 0,
    hr: 0
  });
const [ status, setStatus ] = useState("started");
const [ recordedTime, setRecordedTime ] = useState();
const [ taskHistoryList, setTaskHistoryList ] = useState([]);
const [ displayTaskHistory, setDisplayTaskHistory ] = useState(true);

useEffect(() => {

  if(!localStorage.taskList) {
    return;
  } else {
    const taskList = JSON.parse(localStorage.getItem("taskList"));
    setTaskHistoryList(taskList);
  }
}, [])



let updatedSec = times.sec;
let updatedMin = times.min;
let updatedHr = times.hr;


  const start = () => {
    run();
    setTheInterval(setInterval(run, 1000));
    setStatus("started");
  }

  useEffect(() => {
    start();
  }, [])


  const run = () => {

    if(updatedMin === 60) {
      updatedHr++;
      updatedMin = 0;
    }

    if(updatedSec === 60) {
      updatedMin++;
      updatedSec = 0;
    }


    updatedSec++;
    return setTimes({sec: updatedSec, min: updatedMin, hr: updatedHr})
  }


  const done = () => {
    clearInterval(theInterval);
    let newTask = {
      task: props.taskInput,
      date: new Date().toDateString(),
      sec: updatedSec,
      min: updatedMin,
      hr: updatedHr,
      id: Date.now()
    }
    setTaskHistoryList([newTask, ...taskHistoryList]);
    setStatus("done");
    localStorage.setItem("taskList", JSON.stringify([newTask, ...taskHistoryList]));

  }

  const pause = () => {
    clearInterval(theInterval);
    setStatus("paused");
  }

  const resume = () => {
    run();
    setTheInterval(setInterval(run, 1000));
    setStatus("started");
  }

  const reset = () => {
    clearInterval(theInterval)
    setTimes({
      sec: 0,
      min: 0,
      hr: 0
    })
    setStatus("reset");
  }

  let taskHistoryStyles = "task-history-container";
  if(displayTaskHistory === false) {
      taskHistoryStyles = "task-history-container hide";
  }

  const toggleHistory = () => {
    setDisplayTaskHistory(!displayTaskHistory);
  }

  const removeTask = id => {
    // filter by id of task and set setTaskHistoryList to filteredList
    const filteredList = taskHistoryList.filter(task => id !== task.id);
    setTaskHistoryList(filteredList);
    localStorage.setItem("taskList", filteredList)
  }

  const displayBtns = () => {
    switch(status) {
      case "paused":
        return (
          <ThemeContextConsumer>
          {context => (
            <>
              <button className={`btn btn-${context.theme}-theme`} onClick={resume}>Resume</button>
              <button className={`btn primary-btn-${context.theme}-theme`} onClick={reset}>Reset</button>
            </>
          )}
          </ThemeContextConsumer>
        )
        break;

        case "reset":
          return (
            <ThemeContextConsumer>
            {context => (
              <>
                <button className={`btn btn-${context.theme}-theme`} onClick={start}>Start</button>
              </>
            )}
            </ThemeContextConsumer>
          )
        break;

        case "done":
          return (
            <ThemeContextConsumer>
            {context => (
              <>
                <h3 className={`success success-${context.theme}-theme`}>Congrats, you finished a thing!</h3>
                <button onClick={props.handleBackClick} className={`start-again-btn btn btn-${context.theme}-theme`}> Start something else?</button>
              </>
            )}
            </ThemeContextConsumer>
          )
        break;

      default:
      return (
        <ThemeContextConsumer>
        {context => (
          <>
            <button className={`btn btn-${context.theme}-theme`} onClick={pause}><span class="material-icons">
            pause
            </span> Pause</button>
            <button className={`btn btn-${context.theme}-theme`} onClick={done}><span class="material-icons">
            done
            </span> Done</button>
            <button className={`btn primary-btn-${context.theme}-theme`} onClick={reset}>Reset</button>
          </>
        )}
        </ThemeContextConsumer>
      )
    }
  }


  return (
    <ThemeContextConsumer>
      {context => (
        <div className="outer-container">
          <div className="top-btn-group">
            <button onClick={props.handleBackClick} className={`btn btn-${context.theme}-theme`}><span class="material-icons">
            keyboard_arrow_left
            </span> Back</button>
            <button onClick={toggleHistory} className={`btn btn-${context.theme}-theme`}><span class="material-icons">
            history_toggle_off
            </span> Toggle History</button>
          </div>
          <div className={`task-heading task-heading-${context.theme}-theme`}>
            <h1>{props.taskInput}</h1>
          </div>
          <div className="stopwatch-container">
            <div className={`timer timer-${context.theme}-theme`}>
              <h1>{times.hr < 10 ?
                <span>0{times.hr}</span> :
                <span>{times.hr}</span>
              }:{times.min < 10 ?
                <span>0{times.min}</span> :
                <span>{times.min}</span>
              }<span className="seconds">{times.sec < 10 ?
                <span>0{times.sec}</span> :
              <span>{times.sec}</span>}</span></h1>
            </div>
          </div>
          <div className="btn-group">
            {displayBtns()}
          </div>

          <section className={taskHistoryStyles}>
            <h2 className={`task-history-heading-${context.theme}-theme`}>Completed Tasks</h2>
            {
              taskHistoryList.length < 1 ?
              <p className={`task-history-message-${context.theme}-theme`}>You have no completed tasks.</p> :
            <TaskHistoryList taskHistoryList={taskHistoryList}
            removeTask={removeTask}
            />
            }
          </section>
        </div>
      )}
    </ThemeContextConsumer>
  )
}

export default Stopwatch;

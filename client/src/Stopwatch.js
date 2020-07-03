import React, { useState, useEffect } from 'react';
import './App.css';
import './stopwatch.css';
import BackBtn from "./BackBtn";


// Done button will change views and display the total time plus the task name in a task history... maybe? It may also give the option to write a brief note.



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
      hr: updatedHr
    }
    setTaskHistoryList([newTask, ...taskHistoryList]);
    setStatus("done");

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
    //setDisplayTaskHistory(!displayTaskHistory);
  }

  const displayBtns = () => {
    switch(status) {
      case "paused":
        return (
          <>
            <button className="btn resume-btn" onClick={resume}>Resume</button>
            <button className="btn primary-btn" onClick={reset}>Reset</button>
          </>
        )
        break;

        case "reset":
          return (
            <>
              <button className="btn resume-btn" onClick={start}>Start</button>
            </>
          )
        break;

        case "done":
          return (
            <>
              <h3 className="success">Congrats, you finished a thing!</h3>
              <button onClick={props.handleBackClick} className="btn"> Start something else?</button>
            </>
          )
        break;

          //case "doneClicked":
          //  return (
          //    <TaskHistory taskInput={taskInput} date={date}/>
          //  )
          //  break;


      default:
      return (
        <>
          <button className="btn pause-btn" onClick={pause}>Pause</button>
          <button className="btn done-btn" onClick={done}>Done</button>
          <button className="btn primary-btn" onClick={reset}>Reset</button>
        </>
      )
    }
  }


  return (
    <div className="outer-container">
      <div className="top-btn-group">
        <BackBtn handleBackClick={props.handleBackClick}/>
        <button onClick={toggleHistory} className="btn">Toggle History</button>
      </div>
      <div className="task-heading">
        <h1>{props.taskInput}</h1>
      </div>
      <div className="stopwatch-container">
        <div className="timer">
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
        <h2>Completed Tasks</h2>
        <ul className="task-history-list">
          {taskHistoryList.map(task => (
            <li className="task">
              <span>{task.date}</span>
              <span className="bold">{task.task}</span>
              <span>{`${task.hr}h ${task.min}m ${task.sec}s`}</span>
              <div ><i className="remove-btn far fa-trash-alt"></i></div>
            </li>
          )

          )}
        </ul>
      </section>

    </div>
  )
}

export default Stopwatch;

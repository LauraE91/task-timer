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
    setStatus("done");
    // Also add task + time stamp + date to history
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


  const displayBtns = () => {
    switch(status) {
      case "paused":
        return (
          <>
            <button className="btn resume-btn" onClick={resume}>Resume</button>
            <button className="btn reset-btn" onClick={reset}>Reset</button>
          </>
        )
        break;

        case "done":
          return (
            <>
              <button className="btn resume-btn" onClick={start}>Start</button>
              <button className="btn reset-btn" onClick={reset}>Reset</button>
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


      default:
      return (
        <>
          <button className="btn pause-btn" onClick={pause}>Pause</button>
          <button className="btn stop-btn" onClick={done}>Done</button>
          <button className="btn reset-btn" onClick={reset}>Reset</button>
        </>
      )
    }
  }


  return (
    <div className="outer-container">
      <BackBtn handleBackClick={props.handleBackClick}/>
      <div className="heading">
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
    </div>
  )
}

export default Stopwatch;

import React, { useState, useEffect } from 'react';
import './App.css';

// Things I want to do:
// Change the display of the time so it's more like a clock
// Center the clock
// Make the buttons conditionally render
// Make a Start, pause, resume, reset, and record buttons
// The record button will stop the clock and reset it but also record the time onto a history

/*
Add a tasks to the time. So it's kind of like labeling it.
Add notes. Also Edit both the task and the notes.
Also remove notes. But there HAS to be a label for the time.

When I hit stop, start, pause, or resume, it will record the time.
It will give the total time spent on a task.
It will record it in a history.

That's it.
*/

function App() {
  const [ theInterval, setTheInterval ] = useState();
  const [ times, setTimes ] = useState({
    sec: 0,
    min: 0,
    hr: 0
  });

let updatedSec = times.sec;
let updatedMin = times.min;
let updatedHr = times.hr;

  const start = () => {
    run();
    setTheInterval(setInterval(run, 1000));
  }

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

  const stop = () => {
    clearInterval(theInterval)
  }

  const reset = () => {
    clearInterval(theInterval)
    setTimes({
      sec: 0,
      min: 0,
      hr: 0
    })
  }



  return (
    <div className="outer-container">
      <div className="stopwatch-container">
        <div className="time-box">
        {times.hr < 10 ?
          <h1>0{times.hr}</h1> :
          <h1>{times.hr}</h1>
        }
          <p>hour</p>
        </div>
        <div className="time-box">
          {times.min < 10 ?
            <h1>0{times.min}</h1> :
            <h1>{times.min}</h1>
          }
          <p>min</p>
        </div>
        <div className="time-box">
          {times.sec < 10 ?
            <h1>0{times.sec}</h1> :
          <h1>{times.sec}</h1>}
          <p>sec</p>
        </div>
      </div>

      <div className="btn-group">
        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  )
}

export default App;

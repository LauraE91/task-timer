import React, { useState, useEffect } from 'react';
import './App.css';



function StartView(props) {


  return (
    <>
      <input onChange={props.handleChange} value={props.taskInput} placeholder="What are you working on?" className="task-input"/>
      <button onClick={props.handleStartTask} className="start-btn">Start</button>
    </>
  )
}

export default StartView;

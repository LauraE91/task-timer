import React, { useState, useEffect } from 'react';
import './App.css';
import GlobalStateContext from './GlobalStateContext';



function StartView(props) {
  const startClicked = () => {
    props.handleStartTask(props.taskInput)
  }

  return (
    <>
      <input onChange={props.handleChange} value={props.taskInput} placeholder="What are you working on?" className="task-input"/>
    <button onClick={startClicked} className="start-btn">Start</button>
    </>
  )
}

export default StartView;

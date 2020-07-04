import React, { useState, useEffect } from 'react';
import './App.css';




function StartView(props) {
  const startClicked = () => {
    props.handleStartTask(props.taskInput)
  }

  return (
    <>
      <div className="start-view">
        <input onChange={props.handleChange} value={props.taskInput} placeholder="What are you working on?" className="task-input"/>
        <button onClick={startClicked} className="btn start-btn">Start</button>
      </div>
      <footer className="footer"><p>&copy; Laura Ross 2020</p></footer>
    </>
  )
}

export default StartView;

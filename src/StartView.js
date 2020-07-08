import React, { useState, useEffect } from 'react';
import './globalStyles.css';
import {ThemeContextConsumer} from './ThemeContext';




function StartView(props) {
  const startClicked = () => {
    props.handleStartTask(props.taskInput)
  }

  return (

      <ThemeContextConsumer>
        {context => (
          <>
            <div className="start-view">
              <input onChange={props.handleChange} value={props.taskInput} placeholder="What are you working on?" className={`task-input task-input-${context.theme}-theme`}/>
              <button onClick={startClicked} className={`btn start-btn start-btn-${context.theme}-theme`}>Start</button>
            </div>
            <footer className={`footer footer-${context.theme}-theme`}><p>&copy; Laura Ross 2020</p></footer>
          </>
        )}

      </ThemeContextConsumer>

  )
}

export default StartView;

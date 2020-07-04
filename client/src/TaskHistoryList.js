import React, { useState, useEffect } from 'react';
import './stopwatch.css';
import './themeStyles.css';
import {ThemeContextConsumer} from './ThemeContext';


function TaskHistoryList(props) {
  return (
    <ThemeContextConsumer>
    {context => (
      <ul className={`task-history-list task-history-list-${context.theme}-theme`}>
      {props.taskHistoryList.map(task => (
          <li key={task.id} className={`task task-${context.theme}-theme`}>
            <span>{task.date}</span>
            <span className="bold">{task.task}</span>
            <span>{`${task.hr}h ${task.min}m ${task.sec}s`}</span>
            <div onClick={() => props.removeTask(task.id)} className="remove-btn"><i className="far fa-trash-alt"></i></div>
          </li>
          )
        )
      }
      </ul>
    )}
    </ThemeContextConsumer>
  )
}

export default TaskHistoryList;

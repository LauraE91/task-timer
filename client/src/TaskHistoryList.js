import React, { useState, useEffect } from 'react';
import './stopwatch.css';


function TaskHistoryList(props) {
  return (
    <ul className="task-history-list">
    {props.taskHistoryList.map(task => (
        <li key={task.id} className="task">
          <span>{task.date}</span>
          <span className="bold">{task.task}</span>
          <span>{`${task.hr}h ${task.min}m ${task.sec}s`}</span>
          <div onClick={() => props.removeTask(task.id)} className="remove-btn"><i className="far fa-trash-alt"></i></div>
        </li>
        )
      )
    }
    </ul>
  )
}

export default TaskHistoryList;

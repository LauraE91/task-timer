import React from 'react';


function BackBtn(props) {
  return (
    <div>
      <button onClick={props.handleBackClick} className="btn">Back</button>
    </div>
  )
}
export default BackBtn;

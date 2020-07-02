import React from 'react';


function BackBtn(props) {

  const backBtnStyle = {
    position: "absolute",
    top: "5rem",
    left: "20rem",
    padding: "1.5rem",
    background: "none",
    fontSize: "1rem",
    borderRadius: "50%",
    cursor: "pointer",
    border: "1px solid gray",
    outline: "none",
  }

  return (
    <div>
      <button onClick={props.handleBackClick} className="btn">Back</button>
    </div>
  )
}
export default BackBtn;

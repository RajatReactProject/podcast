import React from 'react';
import "./style.css";

function Buttons({text, onClick, disabled , width}) {
  return (
    <div className="custom-btn" onClick={onClick} disabled = {disabled} style={{width:width}}>{text}</div>
  )
}

export default Buttons;
import React from 'react';
import "./style.css";

function Buttons({text, onClick, disabled}) {
  return (
    <div className="custom-btn" onClick={onClick} disabled = {disabled}>{text}</div>
  )
}

export default Buttons;
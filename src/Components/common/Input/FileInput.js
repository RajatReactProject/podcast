import React, { useState } from 'react';
import "./styles.css";

function FileInput({accept,id, fileHandleFnc, text}) {
  
  const [fileSelected, setFileSelected] = useState(false);
  const [fileName, setFileName] = useState("");

  const onChange = (e) => {
    console.log(e.target.files);
    setFileSelected(true);
    setFileName(e.target.files[0].name);
    fileHandleFnc(e.target.files[0]);
  }
  return (
    <>
    <label htmlFor={id} className={`custom-input ${fileSelected ? "label-input" : "active"}`}>{fileSelected ? fileName : text}</label>
    <input type='file' accept={accept} id={id} style={{display:'none'}} onChange={onChange} />
    </>
    
  )
}

export default FileInput
import React, { useState } from 'react';
import './Click.css';

function Click(props) {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const clickStyle = {
    backgroundColor: isClicked ? 'white' : '#3A448C',
    color: 'white',
    padding: '7px 10px',
    border: 'none',
    borderRadius: '100px',
    cursor: 'pointer',
    margin: '4px',
  };

  return (
    <button className="click-button" style={clickStyle} onClick={handleClick}>
        {props.label}
    </button>
  );
}

export default Click;
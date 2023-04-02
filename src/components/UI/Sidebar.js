import React, { useState, useRef } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const listLoadRef = useRef(null);
  const listItemsRef = useRef(null);
  const sideMenuRef = useRef(null);

  const toggleMenu = () => {
    if (!isOpen) {
      sideMenuRef.current.style.left = "0px";
      const count = listItemsRef.current.children.length;
      listLoadRef.current.style.display = "block";
      for (let i = 0; i < count; i++) {
        const thisLI = listItemsRef.current.children[i];
        setTimeout(() => {
          thisLI.style.opacity = "1";
          thisLI.style.marginLeft = "0";
        }, 100 * i);
      }
    } else {
      sideMenuRef.current.style.left = "-250px";
      const count = listItemsRef.current.children.length;
      for (let i = 0; i < count; i++) {
        const thisLI = listItemsRef.current.children[i];
        thisLI.style.opacity = "0";
        thisLI.style.marginLeft = "-20px";
      }
      listLoadRef.current.style.display = "none";
    }

    setIsOpen(!isOpen);
  };

  return (
    <div className={`side-menu ${isOpen ? "open" : ""}`} ref={sideMenuRef}>
      <div className="side-menu-toggle" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className="side-menu-items" ref={listItemsRef}>
        <ul>
          <a href="#">Home</a>
        </ul>
        <ul>
          <a href="#">About</a>
        </ul>
        <ul>
          <a href="#">Services</a>
        </ul>
        <ul>
          <a href="#">Contact</a>
        </ul>
      </ul>
      <div className="list_load" ref={listLoadRef}></div>
    </div>
  );
};

export default Sidebar;

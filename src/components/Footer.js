import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const Footer = (props) => {
  return (
    <footer>
      <Button
        color={"rgb(111, 0, 255)"}
        text={"Show Reminder"}
        onClick={() => props.onFilter("reminder")}
      />
      <Button
        color={"rgb(111, 0, 255)"}
        text={"Show Completed"}
        onClick={() => props.onFilter("complete")}
      />
      <Button
        color={"rgb(56, 1, 146)"}
        text={"Show All"}
        onClick={() => props.onFilter("all")}
      />
      <p>Creation date: 22/05/2021</p>
      <Link to="/about">About</Link>
    </footer>
  );
};

export default Footer;

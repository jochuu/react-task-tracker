import React from "react";
import { FaTimes } from "react-icons/fa";

const Task = (props) => {
  return (
    <div
      className={`task ${props.task.reminder ? "reminder" : ""}`}
      onSelectStart={"return false;"}
      onDoubleClick={() => props.onToggle(props.task.id)}
    >
      <h3
        style={{
          textDecoration: props.task.complete ? "line-through" : "",
        }}
        onClick={() => props.onComplete(props.task.id)}
      >
        {props.task.text}
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => props.onDelete(props.task.id)}
        />
      </h3>
      <p>{props.task.day}</p>
    </div>
  );
};

export default Task;

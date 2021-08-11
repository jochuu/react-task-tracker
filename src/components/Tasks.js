import React from "react";
import Task from "./Task";
const Tasks = (props) => {
  return (
    <>
      {props.tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDelete={props.onDelete}
          onToggle={props.onToggle}
          onComplete={props.onComplete}
        />
      ))}
    </>
  );
};

export default Tasks;

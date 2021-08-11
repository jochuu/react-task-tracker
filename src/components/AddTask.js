import React, { useState } from "react";

const AddTask = (props) => {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);
  const [complete, setComplete] = useState(false);

  const [errors, setError] = useState([
    {
      taskError: "",
      dayError: "",
    },
  ]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      props.onAdd({ text, day, reminder, complete });
      setText("");
      setDay("");
      setComplete("");
      setReminder(false);
    }
  };

  const validate = () => {
    let taskError = "";
    let dayError = "";
    if (!text) {
      taskError = "Task cannot be empty";
    }
    if (!day) {
      dayError = "Date cannot be empty";
    }
    if (taskError || dayError) {
      setError({ taskError, dayError });
      return false;
    }
    setError({ taskError: "", dayError: "" });
    return true;
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          placeholder="Add Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></input>
        <p style={{ color: "red" }}>{errors.taskError}</p>
      </div>
      <div className="form-control">
        <label>Date and Time</label>
        <input
          type="date"
          placeholder="Add Date & Time"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        ></input>
        <p style={{ color: "red" }}>{errors.dayError}</p>
      </div>
      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input
          type="checkbox"
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        ></input>
      </div>
      <input className="btn btn-block" type="submit" value="Save Task"></input>
    </form>
  );
};

export default AddTask;

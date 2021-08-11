import React from "react";

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      style={{ backgroundColor: props.color }}
      className="btn"
    >
      {props.text}
    </button>
  );
};

Button.defaultProps = {
  color: "steelblue",
  text: "Add Text",
};

export default Button;

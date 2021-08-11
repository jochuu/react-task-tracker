import React from "react";
import Button from "./Button";
import { useLocation } from "react-router-dom";
const Header = (props) => {
  const location = useLocation();
  return (
    <header className="header">
      {location.pathname === "/" && (
        <Button
          color={!props.showAdd ? "rgb(111, 0, 255)" : "rgb(56, 1, 146)"}
          text={!props.showAdd ? "Add" : "Close"}
          onClick={props.onAdd}
        />
      )}
      <h1>{props.title}</h1>
    </header>
  );
};

// Header.defaultProps = {
//   title: "Task Tracker",
// };

// Header.propTypes = {
//   title: PropTypes.string.isRequired,
// };

export default Header;

import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <h4>React app utilising:</h4>
      <p>react-router-dom</p>
      <p>json-server</p>
      <div>
        <br />
        <Link to="/">Back to App</Link>
      </div>
    </div>
  );
};

export default About;

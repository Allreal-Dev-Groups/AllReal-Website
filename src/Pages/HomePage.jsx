import React from "react";
import { Link } from "react-router";

const HomePage = () => {
  return (
    <div>
      <h1>HomePage</h1>
      <Link to={"Test"}>Test</Link>
      <br/>
      <Link to={"/"}>Home</Link>
    </div>
  );
};

export default HomePage;

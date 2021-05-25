import React from "react";
import Alert from "../UI_Components/Alert/Alert";
import "./style.css";
const Landing = (props) => {
  return (
    <>
      <Alert alert={props.alert} setAlert={props.setAlert} />
      <div className="mainLandingSection"></div>
    </>
  );
};
export default Landing;

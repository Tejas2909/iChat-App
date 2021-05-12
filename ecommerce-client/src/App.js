import React, { useState } from "react";
import Navbar from "./components/UI_Components/Navbar/Navbar";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
const App = () => {
  const [isAuthenticated, setIsiAuthenticated] = useState("");
  return (
    <>
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsiAuthenticated={setIsiAuthenticated}
      />
      <Switch>
        <Route exact path="/register" component={() => <Register />} />
        <Route
          exact
          path="/login"
          component={() => <Login setIsiAuthenticated={setIsiAuthenticated} />}
        />
      </Switch>
    </>
  );
};
export default App;

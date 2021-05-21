import React, { useState } from "react";
import Navbar from "./components/UI_Components/Navbar/Navbar";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import "./App.css";
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState("");
  const [alert, setAlert] = useState("none");
  return (
    <>
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <Switch>
        <Route
          exact
          path="/register"
          component={() => <Register alert={alert} setAlert={setAlert} />}
        />
        <Route
          exact
          path="/login"
          component={() => (
            <Login
              alert={alert}
              setAlert={setAlert}
              setIsAuthenticated={setIsAuthenticated}
            />
          )}
        />
      </Switch>
    </>
  );
};
export default App;

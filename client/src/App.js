import React, { useState } from "react";
import Navbar from "./components/UI_Components/Navbar/Navbar";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Landing from "./components/Landing/Landing";
import ChatScreen from "./components/ChatScreen/ChatScreen";
import "./App.css";
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState("");
  const [alert, setAlert] = useState("");
  return (
    <>
      <Navbar
        alert={alert}
        setAlert={setAlert}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />

      <Switch>
        <Route
          exact
          path="/"
          component={() => <Landing alert={alert} setAlert={setAlert} />}
        />
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
        <Route
          exact
          path="/chat_screen"
          component={() => <ChatScreen alert={alert} setAlert={setAlert} />}
        />
      </Switch>
    </>
  );
};
export default App;

import React, { useEffect, useState } from "react";
import Navbar from "./components/UI_Components/Navbar/Navbar";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Landing from "./components/Landing/Landing";
import ChatScreen from "./components/ChatScreen/ChatScreen";
import Alert from "./components/UI_Components/Alert/Alert";
import Loading from "./components/UI_Components/Loading/Loading";
import axios from "axios";
import "./App.css";
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [alert, setAlert] = useState("");
  const checkAuthentication = async () => {
    try {
      const res = await axios.post("/api/", {
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
      });
      if (res.data.status === 200) {
        setIsAuthenticated(true);
        setToken(res.data.token);
        setUsername(res.data.username);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setAlert("something went wrong");
    }
  };
  useEffect(() => {
    checkAuthentication();
  }, []);
  return isLoading ? (
    <Loading alert={alert} />
  ) : (
    <>
      <Alert alert={alert} setAlert={setAlert} />
      <Navbar
        alert={alert}
        setAlert={setAlert}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        username={username}
        setUsername={setUsername}
        token={token}
        setToken={setToken}
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
          component={() => (
            <Register alert={alert} setAlert={setAlert} token={token} />
          )}
        />
        <Route
          exact
          path="/login"
          component={() => (
            <Login
              alert={alert}
              setAlert={setAlert}
              setIsAuthenticated={setIsAuthenticated}
              username={username}
              setUsername={setUsername}
              token={token}
              setToken={setToken}
            />
          )}
        />
        <Route
          exact
          path="/chat_screen"
          component={() => (
            <ChatScreen
              alert={alert}
              setAlert={setAlert}
              username={username}
              setUsername={setUsername}
              token={token}
              setToken={setToken}
            />
          )}
        />
      </Switch>
    </>
  );
};
export default App;

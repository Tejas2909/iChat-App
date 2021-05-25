import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory, NavLink } from "react-router-dom";
import Alert from "../UI_Components/Alert/Alert";
import Loading from "../UI_Components/Loading/Loading";
import axios from "axios";
import "./Login.css";
const Login = (props) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(1);
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [filledUsername, setFillUsername] = useState(-1);
  const [filledPassword, setFillPassword] = useState(-1);
  useEffect(() => {
    setIsLoading(0);
  }, []);
  const InputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "username") {
      setUsername(value);
    } else {
      setPass(value);
    }
  };
  const submitForm = async (event) => {
    event.preventDefault();

    if (username) {
      setFillUsername(1);
    }
    if (pass) {
      setFillPassword(1);
    }
    if (!username || !pass) {
      if (!username) {
        setFillUsername(0);
      }
      if (!pass) {
        setFillPassword(0);
      }
      return;
    }
    const data = {
      username: username,
      password: pass,
    };
    setIsLoading(1);
    try {
      const res = await axios.post("/api/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.data.status === 200) {
        props.setIsAuthenticated(true);
        history.push("/");
        props.setAlert("Login Successful");
        props.setUsername(res.data.msg.username);
        props.setToken(res.data.token);
      } else if (res.data.status === 400) {
        props.setAlert("Invalid Credentials");
      } else {
        props.setAlert("something went wrong");
      }
    } catch (err) {
      props.setAlert("something went wrong");
    }

    setIsLoading(0);
  };
  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Alert setAlert={props.setAlert} alert={props.alert} />
      <form onSubmit={submitForm} className="loginForm">
        <h1 style={{ textAlign: "center", margin: "1rem 0", color: "cyan" }}>
          Login to Chat
        </h1>
        <div className="textField">
          <TextField
            name="username"
            value={username}
            onChange={InputChange}
            type="text"
            style={{ margin: "1rem 0" }}
            id="outlined-basic"
            label="Username"
            variant="outlined"
          />
          {!filledUsername ? (
            <>
              <small
                style={{
                  position: "absolute",
                  bottom: "-0.2rem",
                  color: "red",
                }}
              >
                Username field is required
              </small>
            </>
          ) : null}
        </div>
        <div className="textField">
          <TextField
            name="pass"
            value={pass}
            onChange={InputChange}
            type="password"
            style={{ margin: "1rem 0" }}
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />
          {!filledPassword ? (
            <>
              <small
                style={{
                  position: "absolute",
                  bottom: "-0.2rem",
                  color: "red",
                }}
              >
                Password field is required
              </small>
            </>
          ) : null}
        </div>
        <Button
          style={{ margin: "1rem 0", padding: "1rem 0" }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Login
        </Button>
        <h4
          style={{ textAlign: "center", margin: "1rem 0", fontSize: "1.3rem" }}
        >
          If not registered then please do&nbsp;
          <NavLink to="/register">register</NavLink>
        </h4>
      </form>
    </>
  );
};
export default Login;

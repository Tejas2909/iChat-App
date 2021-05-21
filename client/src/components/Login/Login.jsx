import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import Auth from "../Auth";
const Login = (props) => {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const history = useHistory();
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
    const data = {
      username: username,
      password: pass,
    };

    const res = await axios.post("/api/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.data.status === 200) {
      localStorage.setItem("user", JSON.stringify(res.data));
      props.setIsAuthenticated(Auth());
      setUsername("");
      setPass("");

      props.setAlert("Login Successful");
    } else if (res.data.status === 400) {
      props.setAlert("Invalid Credentials");
    } else {
      props.setAlert("something went wrong");
    }
  };
  return (
    <>
      <form onSubmit={submitForm} className="loginForm">
        <h1 style={{ textAlign: "center", margin: "1rem 0", color: "cyan" }}>
          Login to Chat
        </h1>
        <TextField
          name="username"
          value={username}
          onChange={InputChange}
          type="text"
          style={{ margin: "20px 0" }}
          id="outlined-basic"
          label="Username"
          variant="outlined"
        />
        <TextField
          name="pass"
          value={pass}
          onChange={InputChange}
          type="password"
          style={{ margin: "20px 0" }}
          id="outlined-basic"
          label="Password"
          variant="outlined"
        />
        <Button
          style={{ margin: "20px 0", padding: "10px 0" }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Login
        </Button>
      </form>
    </>
  );
};
export default Login;

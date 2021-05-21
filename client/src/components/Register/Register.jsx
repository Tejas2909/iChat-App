import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import "./Register.css";
const Register = (props) => {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setcPass] = useState("");
  const InputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "username") {
      setUsername(value);
    } else if (name === "pass") {
      setPass(value);
    } else {
      setcPass(value);
    }
  };
  const submitForm = async (event) => {
    event.preventDefault();
    const data = {
      username: username,
      password: pass,
    };
    if (pass !== cpass) {
      props.setAlert("passwords dont match");
    } else {
      const res = await axios.post("/api/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data.status);
      if (res.data.status === 200) {
        props.setAlert("registered successfully");
        setUsername("");
        setPass("");
        setcPass("");
      } else if (res.data.status === 400) {
        props.setAlert("user exists");
      } else {
        props.setAlert("something went wrong");
      }
    }
  };
  return (
    <>
      <form onSubmit={submitForm} className="registerForm">
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
          label="Email Address"
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
        <TextField
          name="cpass"
          value={cpass}
          onChange={InputChange}
          type="password"
          style={{ margin: "20px 0" }}
          id="outlined-basic"
          label="Confirm Password"
          variant="outlined"
        />
        <Button
          style={{ margin: "20px 0", padding: "10px 0" }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Register
        </Button>
      </form>
    </>
  );
};
export default Register;

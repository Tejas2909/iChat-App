import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import Auth from "../Auth";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const history = useHistory();
  const InputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "email") {
      setEmail(value);
    } else {
      setPass(value);
    }
  };
  const submitForm = async (event) => {
    event.preventDefault();
    const data = {
      email: email,
      password: pass,
    };

    const res = await axios.post("/api/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      localStorage.setItem("ecommerce-user", JSON.stringify(res.data));
      props.setIsiAuthenticated(Auth());
      setEmail("");
      setPass("");

      console.log("logged in successfully");
    } else {
      console.log("some error occured");
    }
  };
  return (
    <>
      <form onSubmit={submitForm} className="loginForm">
        <TextField
          name="email"
          value={email}
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

import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import "./Register.css";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setcPass] = useState("");
  const InputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "pass") {
      setPass(value);
    } else {
      setcPass(value);
    }
  };
  const submitForm = async (event) => {
    event.preventDefault();
    const data = {
      name: name,
      email: email,
      password: pass,
    };
    if (pass !== cpass) {
      alert("passwords dont match");
    } else {
      const res = await axios.post("/api/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        console.log("registered successfully");
        setName("");
        setEmail("");
        setPass("");
        setcPass("");
      } else {
        console.log("some error occured");
      }
    }
  };
  return (
    <>
      <form onSubmit={submitForm} className="registerForm">
        <TextField
          name="name"
          value={name}
          onChange={InputChange}
          type="text"
          style={{ margin: "20px 0" }}
          id="outlined-basic"
          label="Full Name"
          variant="outlined"
        />
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

import React, { useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
const DismissibleAlert = (props) => {
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
    props.setAlert("");
  };
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  useEffect(() => {
    setState({ open: true, ...{ vertical: "top", horizontal: "center" } });
  }, []);
  if (props.alert === "") {
    return null;
  } else if (props.alert === "not logged in") {
    return (
      <div>
        <Snackbar
          autoHideDuration={6000}
          severity="error"
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          message="I love snacks"
          key={vertical + horizontal}
        >
          <Alert onClose={handleClose} severity="info">
            Please Login to enter chat room
          </Alert>
        </Snackbar>
      </div>
    );
  } else if (props.alert === "logout failed") {
    return (
      <div>
        <Snackbar
          autoHideDuration={6000}
          severity="error"
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          message="I love snacks"
          key={vertical + horizontal}
        >
          <Alert onClose={handleClose} severity="error">
            Logout Failed
          </Alert>
        </Snackbar>
      </div>
    );
  } else if (props.alert === "user exists") {
    return (
      <div>
        <Snackbar
          autoHideDuration={6000}
          severity="error"
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          message="I love snacks"
          key={vertical + horizontal}
        >
          <Alert onClose={handleClose} severity="info">
            Alerady registered with this name!!
          </Alert>
        </Snackbar>
      </div>
    );
  } else if (props.alert === "registered successfully") {
    return (
      <div>
        <Snackbar
          autoHideDuration={6000}
          severity="error"
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          message="I love snacks"
          key={vertical + horizontal}
        >
          <Alert onClose={handleClose} severity="success">
            Registered successfully!!
          </Alert>
        </Snackbar>
      </div>
    );
  } else if (props.alert === "logout successful") {
    return (
      <div>
        <Snackbar
          autoHideDuration={6000}
          severity="error"
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          message="I love snacks"
          key={vertical + horizontal}
        >
          <Alert onClose={handleClose} severity="success">
            Logout Successful!!
          </Alert>
        </Snackbar>
      </div>
    );
  } else if (props.alert === "Login Successful") {
    return (
      <div>
        <Snackbar
          autoHideDuration={6000}
          severity="error"
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          message="I love snacks"
          key={vertical + horizontal}
        >
          <Alert onClose={handleClose} severity="success">
            Login Successful!!
          </Alert>
        </Snackbar>
      </div>
    );
  } else if (props.alert === "Invalid Credentials") {
    return (
      <div>
        <Snackbar
          autoHideDuration={6000}
          severity="error"
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          message="I love snacks"
          key={vertical + horizontal}
        >
          <Alert onClose={handleClose} severity="error">
            Invalid Credentials!!
          </Alert>
        </Snackbar>
      </div>
    );
  } else if ("passwords dont match") {
    return (
      <div>
        <Snackbar
          autoHideDuration={6000}
          severity="error"
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          message="I love snacks"
          key={vertical + horizontal}
        >
          <Alert onClose={handleClose} severity="error">
            Passwords dont match!!
          </Alert>
        </Snackbar>
      </div>
    );
  } else if (props.alert === "something went wrong") {
    return (
      <div>
        <Snackbar
          autoHideDuration={6000}
          severity="error"
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          message="I love snacks"
          key={vertical + horizontal}
        >
          <Alert onClose={handleClose} severity="error">
            Something went Wrong!! Try Again
          </Alert>
        </Snackbar>
      </div>
    );
  } else {
    return null;
  }
};
export default DismissibleAlert;

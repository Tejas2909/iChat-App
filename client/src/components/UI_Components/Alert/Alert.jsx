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

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  useEffect(() => {
    setState({ open: true, ...{ vertical: "top", horizontal: "center" } });
  }, []);
  if (props.alert === "user exists") {
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
  } else if (props.alert == "Login Successful") {
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
  } else if (props.alert == "Invalid Credentials") {
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
            Something went Wrong!!
          </Alert>
        </Snackbar>
      </div>
    );
  } else {
    return null;
  }
};
export default DismissibleAlert;

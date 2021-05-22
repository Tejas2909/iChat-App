const Auth = () => {
  if (localStorage.getItem("user")) {
    return true;
  } else {
    return false;
  }
};
export default Auth;

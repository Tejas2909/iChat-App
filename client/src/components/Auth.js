const Auth = () => {
  if (localStorage.getItem("ecommerce-user")) {
    return JSON.parse(localStorage.getItem("ecommerce-user"));
  } else {
    return false;
  }
};
export default Auth;

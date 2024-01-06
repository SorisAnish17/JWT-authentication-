import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
const Protected = () => {
  const Auth = () => {
    let token = localStorage.getItem("auth");
    let user = { login: token };
    return user && user.login;
  };

  let auth = Auth();
  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default Protected;

import { useEffect } from "react";

import AuthForm from "../Components/AuthForm";

const Login = () => {
  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <div>
      <AuthForm mode="login"/>
    </div>
  );
};

export default Login;

import { useEffect } from "react";

import AuthForm from "../Components/AuthForm";

const Login = () => {
  useEffect(() => {
    document.title = "Create Account";
  }, []);

  return (
    <div>
      <AuthForm mode="signup"/>
    </div>
  );
};

export default Login;

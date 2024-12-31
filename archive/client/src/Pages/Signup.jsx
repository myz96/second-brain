import { useEffect } from "react";
import { Box, Image } from "@chakra-ui/react";

import AuthForm from "../Components/AuthForm";
import "./Signup.css";

const Login = () => {
  useEffect(() => {
    document.title = "Create Account";
  }, []);

  return (
    <Box className="signin-container" >
      <Image
        src="/dyno-logo.png"
        alt="dyno logo"
        h="50px"
        className="auth-logo"
      />
      <AuthForm mode="signup" />
    </Box>
  );
};

export default Login;

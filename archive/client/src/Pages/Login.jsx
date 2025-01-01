import { useEffect } from "react";

import AuthForm from "../Components/AuthForm";
import "./Login.css";
import { Box, Image } from "@chakra-ui/react";

const Login = () => {
  useEffect(() => {
    document.title = "Sign in";
  }, []);

  return (
    <Box className="signin-container" >
      <Image
        src="/dyno-logo.png"
        alt="dyno logo"
        h="50px"
        className="auth-logo"
      />
      <AuthForm mode="login" />
    </Box>
  );
};

export default Login;

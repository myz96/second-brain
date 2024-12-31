import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Text, Input, Button, Stack, Box } from "@chakra-ui/react";

import { useAuth } from "../Contexts/AuthProvider";
import "./AuthForm.css";

const AuthForm = ({ mode }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();
  const isSignupMode = mode === "signup";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = Object.fromEntries(new FormData(e.target));
    try {
      if (isSignupMode) {
        if (fields.password.length < 8) {
          setError("Password must be more than 8 characters long");
          return;
        } else if (fields.password !== fields.confirmPassword) {
          setError("Passwords do not match");
          return;
        } else if (fields.password === fields.confirmPassword) {
          delete fields.confirmPassword;
        }
      }

      await auth[mode](fields);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box display='flex' flexDirection='column' justifyContent='center' w="500px" margin="auto" mt="100px" >
      <Text fontSize='4xl' mb={4} as='b' >{isSignupMode ? "Sign up" : "Sign in"}</Text>
      <Text fontSize='md' mb={4} >{isSignupMode ? "Enter your details:" : "Use your email to sign in:"}</Text>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <Input placeholder="Email Address" name="username" type="text" />
          <Input placeholder="Password" name="password" type="password" />
          {isSignupMode && (
            <Input
              placeholder="Confirm Password"
              name="confirmPassword"
              type="password"
            />
          )}
          <Button colorScheme="blue" type="submit">
            {isSignupMode ? "Sign Up" : "Login"}
          </Button>
        </Stack>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      {!isSignupMode && (
        <Box className="alt-auth-button">
          <Button
            colorScheme="blue"
            variant="outline"
            onClick={() => navigate("/signup")}
            width={100}
            mr={10}
          >
            Sign up
          </Button>
        </Box>
      )}
      {isSignupMode && (
        <Box className="alt-auth-button">
          <Button
            colorScheme="blue"
            variant="outline"
            onClick={() => navigate("/login")}
            width={100}
            mr={10}
          >
            Sign in
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AuthForm;

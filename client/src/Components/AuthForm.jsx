import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button, Stack } from "@chakra-ui/react";

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
    <div className="auth-container">
      <h1>{isSignupMode ? "Sign Up" : "Login"}</h1>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Input placeholder="username" name="username" type="text" />
          <Input placeholder="password" name="password" type="password" />
          {isSignupMode && (
            <Input
              placeholder="confirm password"
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
        <p>
          First time here? <Link to="/signup">Sign up here</Link>
        </p>
      )}
      {isSignupMode && (
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      )}
    </div>
  );
};

export default AuthForm;

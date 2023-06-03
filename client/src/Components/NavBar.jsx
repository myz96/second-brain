import { NavLink, useNavigate } from "react-router-dom";
import { Box, Flex, Spacer, Button } from "@chakra-ui/react";

import { useAuth } from "../Contexts/AuthProvider";

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    logout();
    navigate("/login");
  };

  return (
    <Flex bg="gray.100" p={4} align="center">
      <Box ml={8}>
        <h1>Second Brain</h1>
      </Box>
      <Spacer />
      <Box>
        <NavLink to="/">
          <Button >
            Home
          </Button>
        </NavLink>
        {user ? (
          <Button mr={4} onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <NavLink to="/login">
            <Button >
              Login
            </Button>
          </NavLink>
        )}
      </Box>
    </Flex>
  );
};

export default NavBar;

import { NavLink, useNavigate } from "react-router-dom";
import {
  Box,
  Center,
  Flex,
  Spacer,
  Button,
  Image,
  Text,
} from "@chakra-ui/react";

import { useAuth } from "../Contexts/AuthProvider";

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    logout();
    navigate("/login");
  };

  return (
    <Flex m={5} align="center" position="relative" top="0" zIndex="9999">
      <Flex boxShadow="md" pl={4} pr={4} pt={2} pb={2} borderRadius={10} bg="white" >
        <Center>
          <Image src="/logo192.png" h="35px" />
          <Image src="/dyno-logo.png" h="40px" />
          <Text ml={2} mr={2} fontSize="2xl" color="#f2f2f2">
            |
          </Text>
          <Text ml={2} mr={2} fontSize="xl">
            {user.username.split("@")[0]}'s dyno
          </Text>
        </Center>
      </Flex>

      <Spacer />

      <Flex boxShadow="md" pl={4} pr={4} pt={2} pb={2} borderRadius={10} bg="white">
        <Center>
          <Image src="https://placedog.net/500" borderRadius="full" boxSize="40px" objectFit="cover" border="1px" borderColor="blue" />
          <Button
            onClick={handleLogout}
            w={100}
            ml={2}
            mr={2}
            colorScheme="blue"
          >
            Logout
          </Button>
        </Center>
      </Flex>
    </Flex>
  );
};

export default NavBar;

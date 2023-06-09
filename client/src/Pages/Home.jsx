import { useEffect } from "react";

import NavBar from "../Components/Navbar";
import AddNodeForm from "../Components/AddNodeForm";
import Graph from "../Components/Graph";
import { useAuth } from "../Contexts/AuthProvider";
import { Box } from "@chakra-ui/react";

const Home = () => {
  const { user } = useAuth();
  useEffect(() => {
    document.title = "Home";
  }, []);

  useEffect(() => {
    document.title = `${user.username.split('@')[0]}'s Dyno`;
  }, [user]);

  return (
    <Box className="main-container" p={0} m={0} height="90%" >
      <NavBar />
      <Graph />
      <AddNodeForm />
    </Box>
  );
};

export default Home;

import { useEffect } from "react";

import NavBar from "../Components/Navbar";
import AddNodeForm from "../Components/AddNodeForm";
import Graph from "../Components/Graph";

const Home = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);
  return (
    <>
      <NavBar />
      <AddNodeForm />
      <Graph />
      </>
  );
};

export default Home;

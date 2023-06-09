import Graph from "react-graph-vis";
import { useEffect } from "react";
import { Box } from "@chakra-ui/react";

import { useNode } from "../Contexts/NodeProvider";
import "./Graph.css";

const options = {
  nodes: {
    shape: "dot",
    scaling: {
      min: 10,
      max: 30,
    },
    font: {
      size: 12,
      face: "Tahoma",
    },
  },
  physics: true,
  configure: function (option, path) {
    if (path.indexOf("smooth") !== -1 || option === "smooth") {
      return true;
    }
    return false;
  },
  edges: {
    smooth: {
      type: "continuous",
    },
  },
};

const NodeGraph = () => {
  const { graph, loadGraph, clearGraph } = useNode();

  useEffect(() => {
    clearGraph();
    loadGraph();
  }, []);

  return (
    <Box position="fixed" mt={-100}>
      <Graph graph={graph} options={options} style={{ height: "100vh" }} />
    </Box>
  );
};

export default NodeGraph;

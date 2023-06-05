import Graph from "react-graph-vis";

import { useNode } from "../Contexts/NodeProvider";

const options = {
  layout: {
    hierarchical: false,
  },
  edges: {
    color: "#000000",
  },
};

const NodeGraph = () => {
  const { graph } = useNode();
  // console.log(graph)
  return (
    <>
      <Graph graph={graph} options={options} />
    </>
  );
};

export default NodeGraph;

// Add nodes with no edges and display them in a graph
// Add input to add edges to graph
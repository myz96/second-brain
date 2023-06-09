import Graph from "react-graph-vis";
import { useEffect } from "react";

import { useNode } from "../Contexts/NodeProvider";
import './Graph.css'

const options = {
  layout: {
    hierarchical: false,
  },
  edges: {
    color: "#000000",
  },
};

const NodeGraph = () => {
  const { graph, loadGraph } = useNode();

  useEffect(() => {
    loadGraph()
  }, [])

  return (
    <div className="graphContainer">
      <Graph graph={graph} options={options}  style={{ height: "640px" }} />
    </div>
  );
};

export default NodeGraph;

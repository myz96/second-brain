import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";

const NodeContext = createContext({});

export const useNode = () => {
  return useContext(NodeContext);
};

export const NodeProvider = ({ children }) => {
  const [graph, setGraph] = useState({ nodes: [], edges: [] });
  const [isLoadingNode, setIsLoadingNode] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    console.log(`Graph: ${JSON.stringify(graph, null, 2)}`);
  }, [graph]);

  const addNode = async (fields) => {
    setIsLoadingNode(true);
    const body = {
      user_id: user._id,
      label: fields,
      title: fields, // Replace w. ChatGPT summary
      edges: null, // Compute edges w. ChatGPT
    };
    const res = await axios.post("/api/nodes", body);
    if (res.status !== 200) {
      throw {
        status: res.status,
        message: res.message,
      };
    }
    const node = res.data.node;

    let current_graph = {...graphState, 
      nodes: [...graphState.nodes],
      edges: [...graphState.edges]
    };

    setGraph(current_graph);

    // for (let edge of node.edges) {
    //     setGraph((prevGraph) => {
    //         return {
    //             nodes: [...prevGraph.nodes],
    //             edges: [
    //                 ...prevGraph.edges,
    //                 { from: edge.from, to: edge.to }
    //             ]
    //         }
    //     })
    // }
    setIsLoadingNode(false);
  };

  return (
    <NodeContext.Provider value={{ graph, isLoadingNode, addNode }}>
      {children}
    </NodeContext.Provider>
  );
};

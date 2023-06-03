import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthProvider";

const NodeContext = createContext({});

export const useNode = () => {
  return useContext(NodeContext);
};

export const NodeProvider = ({ children }) => {
  const [graph, setGraph] = useState({ nodes: [], edges: [] });
  const [isLoadingNode, setIsLoadingNode] = useState(false);
  const { user } = useAuth();

  const addNode = async (fields) => {
    setIsLoadingNode(true);
    const body = {
      user_id: user._id,
      label: fields,
      title: fields, // Replace w. ChatGPT summary
      edges: null, // Input edges w. ChatGPT
    };
    const res = await axios.post("/api/nodes", body);
    const node = res.data;
    if (res.status !== 200) {
      throw {
        status: res.status,
        message: res.message,
      };
    }
    setGraph((prevGraph) => {
      return {
        nodes: [...prevGraph.nodes, { id: node.id, label: node.label }],
        edges: [...prevGraph.edges],
      };
    });

    // Uncommented and corrected this block of code
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

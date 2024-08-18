import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";

const NodeContext = createContext({});

export const useNode = () => {
  return useContext(NodeContext);
};

export const NodeProvider = ({ children }) => {
  const [graph, setGraph] = useState({ nodes: [], edges: [] });
  const [isLoadingGraph, setIsLoadingGraph] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // console.log(`Graph: ${JSON.stringify(graph, null, 2)}`);
  }, [graph]);

  const clearGraph = () => {
    setGraph({
      nodes: [],
      edges: []
    })
  };

  const loadGraph = async () => {
    setIsLoadingGraph(true)
    const graphCopy = JSON.parse(JSON.stringify(graph));

    const userId = user._id 
    console.log(userId)

    const nodeRes = await axios.get(`${apiUrl}/api/nodes/user/${userId}`)
    const { nodes } = nodeRes.data 
    // console.log(nodes)


    for (let node of nodes) {
      let { label, title, group, value  } = node
      const nodeExists = graphCopy.nodes.find(
        (node) => node.id === label
      );
      if (nodeExists === undefined) {
        graphCopy.nodes.push({ id: label, label: label, title: title, group: group, value: value });
      }
    }

    const edgeRes = await axios.get(`${apiUrl}/api/edges/user/${userId}`)
    // console.log(edgeRes)

    const { edges } = edgeRes.data 
    // console.log(edges)

    for (let edge of edges) {
      let { from, to, color } = edge
      const edgeExists = graphCopy.edges.find(
        (edge) => edge.from === from && edge.to === to
      );
      if (edgeExists === undefined) {
        graphCopy.edges.push({ from: from, to: to, color: color });
      }
    }
    console.log(graphCopy)
    setGraph(graphCopy);
    setIsLoadingGraph(false)
  }

  const updateGraph = (rawUpdates) => {
    setIsLoadingGraph(true);
    const update = JSON.parse(rawUpdates);
    const graphCopy = JSON.parse(JSON.stringify(graph));
    // console.log(update);
    // console.log(graphCopy)

    const userId = user._id 
    // console.log(userId)

    if (update.length === 0) return;

    const { label, title, tags } = update;

    const nodeExists = graphCopy.nodes.find((node) => node.id === label);
    // console.log(nodeExists)

    const node = { id: label, label: label, title: title, group: label, value: 2 };
    // console.log(node)
    if (nodeExists === undefined) {
      // console.log("Node doesn't exist")
      graphCopy.nodes.push(node);
      const res = axios.post(`${apiUrl}/api/nodes`, {
        user_id: userId,
        ...node,
      });
      // console.log(res);
    }

    for (let tag of tags) {
      const tagExists = graphCopy.nodes.find((node) => node.id === tag);
      // console.log(label)
      const tagNode = {
        id: tag,
        label: tag,
        group: label, 
        value: 1
      };
      // console.log(tagNode.group)
      if (tagExists === undefined) {
        graphCopy.nodes.push(tagNode);
        const res = axios.post(`${apiUrl}/api/nodes`, {
          user_id: userId,
          ...tagNode,
        });
        // console.log(res);
      }
      const edgeExists = graphCopy.edges.find(
        (edge) => edge.from === node.id && edge.to === tagNode.id
      );
      if (edgeExists === undefined) {
        graphCopy.edges.push({ from: label, to: tag, color: { inherit: "from" } });
        const res = axios.post(`${apiUrl}/api/edges`, {
          user_id: userId,
          from: label,
          to: tag,
          color: { inherit: "from" }
        });
      }
    }

    setGraph(graphCopy);
    setIsLoadingGraph(false);
  };

  return (
    <NodeContext.Provider value={{ graph, isLoadingGraph, updateGraph, loadGraph, clearGraph }}>
      {children}
    </NodeContext.Provider>
  );
};

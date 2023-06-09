import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Stack, Textarea } from "@chakra-ui/react";

import "./AddNodeForm.css";
import { useNode } from "../Contexts/NodeProvider.jsx" 
import { useGPT } from "../Contexts/GptProvider.jsx";

const AddNodeForm = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { updateGraph } = useNode()
  const { queryPrompt, GPTResponse } = useGPT()

  useEffect(() => {
    if (GPTResponse !== null) { 
      updateGraph(GPTResponse);
      navigate("/");
    }
  }, [GPTResponse, updateGraph, navigate]); 
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInput = Object.fromEntries(new FormData(e.target)).nodeInput;
    try {
      if (!userInput) {
        setError("Input cannot be empty.");
        return;
      }
      queryPrompt(userInput) 
      // const gptResponse = `{"label": "The Rise of Digital Video Platforms: Amazon Unbox vs. Apple iTunes", "title": "Amazon Working Backwards Prime Video chapter says that Amazon Unbox was one of the first digital video platforms, likely born out of their kindle success, but they still failed behind Apple that had greater success with movies and iTunes on their iPod.", "tags":["Digital Video Platforms", "Amazon Unbox", "Apple iTunes", "Movies", "iPod", "Kindle", "Competitive Advantage", "Streaming Media", "Content Delivery", "Digital Distribution", "Entertainment Industry", "Technology Innovation", "Consumer Electronics", "Online Video Platforms", "Market Disruption"]}`// Mock Response
      // updateGraph(gptResponse)
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add-node-container">
      <h1>Add Node</h1>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Textarea placeholder="Insert idea" name="nodeInput" type="text" />
          <Button colorScheme="blue" type="submit">
            Add Node
          </Button>
        </Stack>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default AddNodeForm;

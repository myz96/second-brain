import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Stack,
  Textarea,
} from "@chakra-ui/react";

import { useNode } from "../Contexts/NodeProvider.jsx";
import { useGPT } from "../Contexts/GptProvider.jsx";

const AddNodeForm = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { updateGraph } = useNode();
  const { queryPrompt, GPTResponse } = useGPT();

  // useEffect(() => {
  //   if (GPTResponse !== null) {
  //     updateGraph(GPTResponse);
  //   }
  // }, [GPTResponse, updateGraph]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInput = Object.fromEntries(new FormData(e.target)).nodeInput;
    try {
      if (!userInput) {
        setError("Input cannot be empty.");
        return;
      }
      const gptResponse = await queryPrompt(userInput);
      // const gptResponse = `{"label": "Test3", "title": "Amazon Working Backwards Prime Video chapter says that Amazon Unbox was one of the first digital video platforms, likely born out of their kindle success, but they still failed behind Apple that had greater success with movies and iTunes on their iPod.", "tags":["Digital Video Platforms", "Amazon Unbox", "Apple iTunes", "Movies", "iPod", "Kindle", "Competitive Advantage", "Streaming Media", "Content Delivery", "Digital Distribution", "Entertainment Industry", "Technology Innovation", "Consumer Electronics", "Online Video Platforms", "Market Disruption"]}`// Mock Response
      // console.log(gptResponse)
      updateGraph(gptResponse)
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      className="add-node-container"
      w="50%"
      margin="auto"
      direction="column"
      p={30}
      boxShadow="md"
      zIndex="9999"
      bg="white"
      mt="75vh"
    >
      <form onSubmit={handleSubmit}> 
        <FormControl isInvalid={!!error}>
          <Stack spacing={3}>
            <Textarea placeholder="Insert idea" name="nodeInput" type="text" bg="white" />
            <Button colorScheme="blue" type="submit">
              Add Idea
            </Button>
          </Stack>
          <FormErrorMessage color="red">{error}</FormErrorMessage>
        </FormControl>
      </form> 
    </Box>
  );  
};

export default AddNodeForm;

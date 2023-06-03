import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Stack, Textarea } from "@chakra-ui/react";

import "./AddNodeForm.css";
import { useNode } from "../Contexts/NodeProvider.jsx" 

const AddNodeForm = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { addNode } = useNode()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInput = Object.fromEntries(new FormData(e.target)).nodeInput;
    try {
      if (!userInput) {
        setError("Input cannot be empty.");
        return;
      }
      await addNode(userInput)
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

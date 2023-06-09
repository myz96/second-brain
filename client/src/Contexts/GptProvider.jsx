import axios from "axios";

import { createContext, useContext, useState } from "react";

const GPTContext = createContext({});

const DEFAULT_PARAMS = {
  model: "text-davinci-003",
  temperature: 0.3,
  max_tokens: 800,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
};

export const useGPT = () => {
  return useContext(GPTContext);
};

export const GPTProvider = ({ children }) => {
  const [GPTResponse, setGPTResponse] = useState(null);
  const [isLoadingGPT, setIsLoadingGPT] = useState(false);

  const queryPrompt = async (prompt) => {
    setIsLoadingGPT(true);
    try {
      const response = await axios.get("assets/chatgpt.prompt");
      const query = response.data.replace("$prompt", prompt);
      console.log(query);

      const params = { ...DEFAULT_PARAMS, prompt: query, stop: "\n" };

      const apiKey = import.meta.env.VITE_OPENAI_KEY;

      const gptResponse = await axios.post(
        "https://api.openai.com/v1/completions",
        params,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(apiKey),
          },
        }
      );

      const { choices } = gptResponse.data;

      const text = choices[0].text;
      console.log(text);

      setGPTResponse(text);
      setIsLoadingGPT(false);
      // return text
    } catch (error) {
      console.log(error);
      setIsLoadingGPT(false);
    }
  };

  return (
    <GPTContext.Provider value={{ GPTResponse, isLoadingGPT, queryPrompt }}>
      {children}
    </GPTContext.Provider>
  );
};

// Prepopulate graph with all nodes from user in useEffect

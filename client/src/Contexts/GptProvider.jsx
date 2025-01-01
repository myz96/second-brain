import OpenAI from "openai";

import { createContext, useContext, useState } from "react";

const GPTContext = createContext({});

export const useGPT = () => {
  return useContext(GPTContext);
};

export const GPTProvider = ({ children }) => {
  const [GPTResponse, setGPTResponse] = useState(null);
  const [isLoadingGPT, setIsLoadingGPT] = useState(false);

  const queryPrompt = async (prompt) => {
    setIsLoadingGPT(true);
    try {
      // console.log(prompt)
      
      const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_KEY, dangerouslyAllowBrowser: true});
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
            Given a prompt, summarise the prompt as a label and extrapolate as many concepts as possible from it as a list of tags.

            Example:
            prompt: Is Jokic and Murray's final performance in the NBA finals less impressive because the Heat are only the 8th 
            updates:
            {"label": "Analysis of Jokic and Murray's Performance in NBA Finals against the 8th Ranked Heat", "title": "Is Jokic and Murray's final performance in the NBA finals less impressive because the Heat are only the 8th", "tags": ["NBA Finals", "Performance Analysis", "Jokic and Murray", "Miami Heat", "Basketball Analytics", "Sports Ranking", "Sports Performance Evaluation", "Competitive Balance in Basketball", "Denver Nuggets", "Player Performance Metrics", "Comparative Sports Analysis", "Game Strategy and Tactics", "Basketball Positions-Center and Point Guard"]}

            prompt: $prompt
            updates:`,
          },
          {
            role: "user",
            content: `prompt: ${prompt}`,
          },
        ]
      });

      const text = completion.choices[0].message.content;

      setGPTResponse(text);
      setIsLoadingGPT(false);
      return text;
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

import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App.jsx";
import { AuthProvider } from "./Contexts/AuthProvider.jsx";
import { NodeProvider } from "./Contexts/NodeProvider.jsx";
import { GPTProvider } from "./Contexts/GptProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChakraProvider>
      <AuthProvider>
        <NodeProvider>
          <GPTProvider>
            <App />
          </GPTProvider>
        </NodeProvider>
      </AuthProvider>
    </ChakraProvider>
  </BrowserRouter>
);

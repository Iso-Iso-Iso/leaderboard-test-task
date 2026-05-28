import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/main.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

// !WARN: I've turned off StrictMode for dev for preventing double query call in demonstration purpose
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);
